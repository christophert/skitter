package skitter;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@EnableWebSecurity
@Configuration
@EnableGlobalMethodSecurity(securedEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    protected class TimeoutHandler extends SimpleUrlAuthenticationSuccessHandler {
        //1hr long session
        final Integer SESSION_TIMEOUT_IN_SECONDS = 3600 * 30;

        @Override
        public void onAuthenticationSuccess(HttpServletRequest request,
                                            HttpServletResponse response,
                                            Authentication authentication) throws ServletException, IOException {
            request.getSession().setMaxInactiveInterval(SESSION_TIMEOUT_IN_SECONDS);
        }
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().authorizeRequests()
                .antMatchers("/register").fullyAuthenticated()
                .antMatchers("/account").fullyAuthenticated()
            .and()
            .httpBasic();
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.ldapAuthentication()
                .userDnPatterns("uid={0},ou=people")
                .contextSource()
                .url("ldaps://ldap.rit.edu:636/dc=rit,dc=edu");
    }

//    @Bean
//    public DefaultSpringSecurityContextSource contextSource() {
//        return  new DefaultSpringSecurityContextSource(
//                Collections.singletonList("ldaps://ldap.rit.edu:636"), "dc=memorynotfound,dc=com");
//    }
}
