package skitter;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Some more Elegant exception handling
 */
@ResponseStatus(value = HttpStatus.I_AM_A_TEAPOT)
public class SkitterException extends RuntimeException {
    public SkitterException(String message) {
        super(message);
    }
}
