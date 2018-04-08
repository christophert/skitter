package skitter;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import skitter.Account;

@Repository
public interface AccountRepository extends CrudRepository<Account, String> {

}