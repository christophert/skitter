package skitter;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class SkitterUnauthorizedException extends RuntimeException {
    public SkitterUnauthorizedException(String message) {
        super(message);
    }
}
