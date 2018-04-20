package skitter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.ldap.userdetails.LdapUserDetailsImpl;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountModelImpl implements AccountModel {

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    AccountRepository accountRepository;

    /**
     * Get's information from the SSO Authentication suite included with Spring to verify
     * they are a Valid LDAP user on RIT's network
     * @return UID of the account
     * @throws SkitterException Thrown if There is an error with LDAP authentication
     */
    public String verifyRitLdapInformation() throws SkitterUnauthorizedException {
        if (SecurityContextHolder.getContext() == null ||
                SecurityContextHolder.getContext().getAuthentication() == null ||
                !(SecurityContextHolder.getContext().getAuthentication() instanceof UsernamePasswordAuthenticationToken)) {
            throw new SkitterUnauthorizedException("No valid authentication was present for client on LDAP Server");
        }
        UsernamePasswordAuthenticationToken authentication =
                (UsernamePasswordAuthenticationToken)SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() == null) {
            throw new SkitterUnauthorizedException("Unable to load principal for authentication");
        }
        LdapUserDetailsImpl principal = (LdapUserDetailsImpl)authentication.getPrincipal();

        String uid = principal.getUsername();
        if (uid == null) {
            throw new SkitterUnauthorizedException("Was unable to find a username in RIT's LDAP");
        }
        return uid;
    }

    /**
     * Get's information from the SSO Authentication suite included with Spring to verify
     * they are a Valid LDAP user on RIT's network, then queries our database to see if
     * we have an account that matches the target user's parameters
     * @return Account of the individual on success
     * @throws SkitterException Thrown if There is an error with LDAP authentication or user is not registered.
     */
    @Override
    public Account isAuthenticated() throws SkitterUnauthorizedException {
        String uid = verifyRitLdapInformation();
        Optional<Account> acct = accountRepository.findById(uid);

        if (!acct.isPresent()) {
            throw new SkitterUnauthorizedException("This is a valid LDAP Account but does not have a registered Skitter acct");
        }
        return acct.get();
    }

    /**
     * Makes a new account after requesting LDAP Access, stores in locally bound SQL DB
     * @param account Account parameters
     * @return Skitter account on successful creation
     * @throws SkitterException Thrown if account already exists or not authenticated
     */
    @Override
    public Account create(Account account) throws SkitterException, SkitterUnauthorizedException {
        String uid = verifyRitLdapInformation();
        Optional<Account> acct = accountRepository.findById(uid);
        if (acct.isPresent()) {
            throw new SkitterUnauthorizedException("Account already exists in database");
        }

        accountRepository.save(new Account().withUid(uid)
                .withEmail(account.getEmail())
                .withFirstName(account.getFirstName())
                .withLastName(account.getLastName()));

        acct = accountRepository.findById(uid);

        if (!acct.isPresent()) {
            throw new SkitterUnauthorizedException("This is a valid LDAP Account but does not have a registered Skitter acct");
        }
        return acct.get();
    }

    /**
     * Publically exposed function does not require a login
     * @param uid specific account user id (jfb3657)
     * @return Account on success
     * @throws SkitterException if id does not exist
     */
    public Account get(String uid) throws SkitterException, SkitterUnauthorizedException {
        Optional<Account> acct = accountRepository.findById(uid);
        return acct.get();
    }

    @Override
    public Iterable<Account> getAll() {
        return accountRepository.findAll();
    }

    /**
     * Deletes an account, can only be used by account owner.
     * @param uid user id
     * @return user user id (jfb3657)
     * @throws SkitterException if id doesn't matched login user or user not authenticated
     */
    @Override
    public void delete(String uid) throws SkitterException, SkitterUnauthorizedException {
        Optional<Account> acct = accountRepository.findById(uid);
        if (!acct.isPresent()) {
            throw new SkitterException("Account does not exist in database");
        }
        if (!uid.equals(acct.get().getUid())) {
            throw new SkitterException("Logged in UID does not equal this accounts id");
        }
        accountRepository.delete(acct.get());
    }

    /**
     * Change account information, can only be down by account owner
     * @param account new account information
     * @return Updated account as found in database
     * @throws SkitterException thrown if now authenticated or does not match login
     */
    @Override
    public Account update(Account account) throws SkitterException, SkitterUnauthorizedException {
        String uid = verifyRitLdapInformation();
        account.setUid(uid);

        Optional<Account> acct = accountRepository.findById(account.getUid());
        if (!acct.isPresent()) {
            throw new SkitterException("Account does not exist in database");
        }
        accountRepository.save(account);
        return get(uid);
    }
}
