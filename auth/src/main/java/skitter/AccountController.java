package skitter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.ldap.userdetails.LdapUserDetailsImpl;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@SpringBootApplication
//@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class,HibernateJpaAutoConfiguration.class})
@EnableJpaRepositories
@RestController
public class AccountController {
    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    AccountRepository accountRepository;

    /**
     * Get's information from the SSO Authentication suite included with Spring to verify
     * they are a Valid LDAP user on RIT's network
     * @return UID of the account
     * @throws SkitterException Thrown if There is an error with LDAP authentication
     */
    public String verifyRitLdapInformation() throws SkitterException {
        if (SecurityContextHolder.getContext() == null ||
                SecurityContextHolder.getContext().getAuthentication() == null ||
                !(SecurityContextHolder.getContext().getAuthentication() instanceof UsernamePasswordAuthenticationToken)) {
            throw new SkitterException("No valid authentication was present for client on LDAP Server");
        }
        UsernamePasswordAuthenticationToken authentication =
                (UsernamePasswordAuthenticationToken)SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() == null) {
            throw new SkitterException("Unable to load principal for authentication");
        }
        LdapUserDetailsImpl principal = (LdapUserDetailsImpl)authentication.getPrincipal();

        String uid = principal.getUsername();
        if (uid == null) {
            throw new SkitterException("Was unable to find a username in RIT's LDAP");
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
    @RequestMapping(value = "/isAuthenticated", produces = "application/json")
    public Account isAuthenticated() throws SkitterException {
        String uid = verifyRitLdapInformation();
        Optional<Account> acct = accountRepository.findById(uid);

        if (!acct.isPresent()) {
            throw new SkitterException("This is a valid LDAP Account but does not have a registered Skitter acct");
        }
        return acct.get();
    }

    /**
     * Create Account for an RIT LDAP user
     * @param email email address
     * @param firstName first name
     * @param lastName last name
     * @return account on successful registration
     */
    @RequestMapping(value = "/register", method = RequestMethod.POST, produces = "application/json")
    public Account register(@RequestParam String email,
                            @RequestParam String firstName,
                            @RequestParam String lastName) throws SkitterException {
        String uid = verifyRitLdapInformation();

        accountRepository.save(new Account().withUid(uid)
                .withEmail(email)
                .withFirstName(firstName)
                .withLastName(lastName));

        Optional<Account> acct = accountRepository.findById(uid);

        if (!acct.isPresent()) {
            throw new SkitterException("This is a valid LDAP Account but does not have a registered Skitter acct");
        }
        return acct.get();
    }

    /**
     * Just prints a little welcome message
     * @return string
     */
    @RequestMapping("/")
    public String home() {
        return "You made it!";
    }

    public static void main(String[] args) {
        SpringApplication.run(AccountController.class, args);
    }
}