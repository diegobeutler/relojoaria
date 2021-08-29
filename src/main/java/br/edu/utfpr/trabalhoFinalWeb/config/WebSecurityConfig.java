package br.edu.utfpr.trabalhoFinalWeb.config;

import br.edu.utfpr.trabalhoFinalWeb.service.impl.UsuarioServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter{

	@Autowired
	private UsuarioServiceImpl usuarioServiceImpl;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable()
			.exceptionHandling().accessDeniedPage("/403")
			.and().formLogin().loginPage("/login")
			.defaultSuccessUrl("/", true)
			.failureUrl("/login?error=bad_credentials").permitAll()
			.and().logout()
			.logoutSuccessUrl("/login")
			.and().authorizeRequests()
				.antMatchers("/pedidos/**").hasAnyRole("USER", "ADMIN")
				.antMatchers("/usuario/cadastro/**").permitAll()
				.antMatchers("/usuario/reset/**").permitAll()
				.antMatchers("/usuario/changePassword/**").permitAll()
				.antMatchers("/usuario/updatePassword/**").permitAll()
				.antMatchers("/usuario/savePassword/**").permitAll()
				.antMatchers(HttpMethod.GET,"/").permitAll()
				.antMatchers(HttpMethod.GET,"/index").permitAll()
				.antMatchers(HttpMethod.GET,"/aneis").permitAll()
				.antMatchers(HttpMethod.GET,"/item/**").permitAll()
				.antMatchers(HttpMethod.GET,"/relogios").permitAll()
				.antMatchers(HttpMethod.GET,"/carrinho").permitAll()
				.antMatchers("/**").authenticated();
	}
	
	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring()
				.antMatchers("/css/**")
				.antMatchers("/js/**")
				.antMatchers("/images/**")
				.antMatchers("/assets/**")
				.antMatchers("/vendors/**")
				.antMatchers("/webjars/**");
	}
	
	@Bean
	@Override
	protected UserDetailsService userDetailsService() {
		return usuarioServiceImpl;
	}
	
	@Bean
	protected PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) 
				throws Exception {
		auth.userDetailsService( userDetailsService() )
			.passwordEncoder( passwordEncoder() );
	}
}

