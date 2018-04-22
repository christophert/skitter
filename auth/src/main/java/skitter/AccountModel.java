package skitter;

public interface AccountModel {
    /**
     * Get's information from the SSO Authentication suite included with Spring to verify
     * they are a Valid LDAP user on RIT's network, then queries our database to see if
     * we have an account that matches the target user's parameters
     * @return Account of the individual on success
     * @throws SkitterException Thrown if There is an error with LDAP authentication or user is not registered.
     */
    Account isAuthenticated() throws SkitterUnauthorizedException;

    /**
     * Makes a new account after requesting LDAP Access, stores in locally bound SQL DB
     * @param account Account parameters
     * @return Skitter account on successful creation
     * @throws SkitterException Thrown if account already exists or not authenticated
     */
    Account create(String username, String password, Account account) throws SkitterException;

    /**
     * Get a Specific Account
     * @param uid specific account user id (jfb3657)
     * @return Account on success
     * @throws SkitterException if id does not exist
     */
    Account get(String uid) throws SkitterException, SkitterUnauthorizedException;

    /**
     * Publically exposed function does not require a login
     * @return Accounts on success
     */
    Iterable<Account> getAll();

    /**
     * Deletes an account, can only be used by account owner.
     * @param uid user id
     * @return user
     * @throws SkitterException if id doesn't matched login user or user not authenticated
     */
    void delete(String uid) throws SkitterException, SkitterUnauthorizedException;

    /**
     * Change account information, can only be down by account owner
     * @param account new account information
     * @return Updated account as found in database
     * @throws SkitterException thrown if now authenticated or does not match login
     */
    Account update(Account account) throws SkitterException, SkitterUnauthorizedException;
}
