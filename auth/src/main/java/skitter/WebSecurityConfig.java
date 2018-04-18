package skitter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.util.matcher.RegexRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.AuthProvider;
import java.util.Arrays;
import java.util.regex.Pattern;

@EnableWebSecurity
@Configuration
@EnableGlobalMethodSecurity(securedEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    AccountModel accountModel;

    @Bean
    public AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf()//.disable()
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
//                .requireCsrfProtectionMatcher(new RequestMatcher() {
//                    private Pattern allowedMethods = Pattern.compile("^(GET|HEAD|TRACE|OPTIONS)$");
//                    private RegexRequestMatcher apiMatcher = new RegexRequestMatcher("/v[0-9]*/.*", null);
//
//                    @Override
//                    public boolean matches(HttpServletRequest request) {
//                        // No CSRF due to allowedMethod
//                        if(allowedMethods.matcher(request.getMethod()).matches())
//                            return false;
//
//                        // No CSRF due to api call
//                        if(apiMatcher.matches(request))
//                            return false;
//
//                        // CSRF for everything else that is not an API call or an allowedMethod
//                        return true;
//                    }
//                })
                .and()
                .authorizeRequests()
                .antMatchers("/auth/account").fullyAuthenticated()
            .and()
            .formLogin()
                .loginPage("/auth/login")
                .successHandler(new AuthenticationSuccessHandler() {
            @Override
            public void onAuthenticationSuccess(HttpServletRequest request,
                                                HttpServletResponse response,
                                                Authentication authentication) throws IOException,
                                                                                      ServletException,
                                                                                      SkitterException {
                try {
                    accountModel.isAuthenticated();
                } catch (SkitterException ex) {
                    response.sendError(418, ex.getMessage());
                }
            }
        });
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.ldapAuthentication()
                .userDnPatterns("uid={0},ou=people")
                .contextSource()
                .url("ldaps://ldap.rit.edu:636/dc=rit,dc=edu");
    }

}
