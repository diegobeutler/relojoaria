package br.edu.utfpr.trabalhoFinalWeb.service;

import br.edu.utfpr.trabalhoFinalWeb.model.PasswordResetToken;
import br.edu.utfpr.trabalhoFinalWeb.model.Usuario;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import static java.time.LocalDate.now;

public interface SecurityUserService extends CrudService<PasswordResetToken, Long> {
    Usuario getUserByPasswordResetToken(String token);

    String validatePasswordResetToken(String token);

    boolean isTokenFound(PasswordResetToken passToken);

    boolean isTokenExpired(PasswordResetToken passToken);

    SimpleMailMessage constructResetTokenEmail(
            String contextPath, String token, Usuario usuario);

    SimpleMailMessage constructEmail(String subject, String body,
                                     Usuario usuario);
}
