package skitter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
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
    AccountModel accountModel;

    /**
     * Get's information from the SSO Authentication suite included with Spring to verify
     * they are a Valid LDAP user on RIT's network, then queries our database to see if
     * we have an account that matches the target user's parameters
     * @return Account of the individual on success
     * @throws SkitterException Thrown if There is an error with LDAP authentication or user is not registered.
     */
    @RequestMapping(value = "/isAuthenticated", produces = "application/json")
    public Account isAuthenticated() throws SkitterException {
        return accountModel.isAuthenticated();
    }

    /**
     * Create Account for an RIT LDAP user
     * @param email email address
     * @param firstName first name
     * @param lastName last name
     * @return account on successful registration
     */
    @RequestMapping(value = "/register", method = RequestMethod.POST, produces = "application/json")
    public Account register(@RequestParam("email") String email,
                            @RequestParam("firstName") String firstName,
                            @RequestParam("lastName") String lastName) throws SkitterException {
        return accountModel.create(new Account()
                .withEmail(email)
                .withFirstName(firstName)
                .withLastName(lastName));
    }

    /**
     * Update Account information for an already existing account
     * @param email email address
     * @param firstName first name
     * @param lastName last name
     * @return updated account
     */
    @RequestMapping(value = "/account", method = RequestMethod.GET, produces = "application/json")
    public Account update(@RequestParam("email") String email,
                          @RequestParam("firstName") String firstName,
                          @RequestParam("lastName") String lastName) throws SkitterException {
        return accountModel.update(new Account()
                .withEmail(email)
                .withFirstName(firstName)
                .withLastName(lastName));
    }

    /**
     * Update Account information for an already existing account
     * @param uid user id (jfb3657)
     */
    @RequestMapping(value = "/account", method = RequestMethod.DELETE)
    public void delete(@RequestParam("uid") String uid) {
        accountModel.delete(uid);
    }

    /**
     * Get account information from ID
     * @param uid user id (jfb3657)
     */
    @RequestMapping(value = "/account", method = RequestMethod.GET)
    public Account get(@RequestParam("uid") String uid) {
        return accountModel.get(uid);
    }

    /**
     * Get all registered accounts
     */
    @RequestMapping(value = "/accounts", method = RequestMethod.GET)
    public Iterable<Account> get() {
        return accountModel.getAll();
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