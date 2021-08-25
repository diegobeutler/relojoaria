package br.edu.utfpr.trabalhoFinalWeb.service.impl;

import br.edu.utfpr.trabalhoFinalWeb.model.PasswordResetToken;
import br.edu.utfpr.trabalhoFinalWeb.model.Usuario;
import br.edu.utfpr.trabalhoFinalWeb.repository.PasswordTokenRepository;
import br.edu.utfpr.trabalhoFinalWeb.service.SecurityUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import static java.time.LocalDate.now;
@Service
public class SecurityUserServiceImpl extends CrudServiceImpl<PasswordResetToken, Long> implements SecurityUserService {

    @Autowired
    private PasswordTokenRepository passwordTokenRepository;

    @Override
    public Usuario getUserByPasswordResetToken(String token) {
        var passwordToken = passwordTokenRepository.findByToken(token);
        return passwordToken != null ? passwordToken.getUsuario() : null;
    }

    @Override
    protected JpaRepository<PasswordResetToken, Long> getRepository() {
        return passwordTokenRepository;
    }


    @Override
    public String validatePasswordResetToken(String token) {
        final PasswordResetToken passToken = passwordTokenRepository.findByToken(token);

        return !isTokenFound(passToken) ? "invalidToken"
                : isTokenExpired(passToken) ? "expired"
                : null;
    }

    @Override
    public boolean isTokenFound(PasswordResetToken passToken) {
        return passToken != null;
    }

    @Override
    public boolean isTokenExpired(PasswordResetToken passToken) {
        return passToken.getExpiryDate().isBefore(now());
    }

    @Override
    public SimpleMailMessage constructResetTokenEmail(
            String contextPath, String token, Usuario usuario) {
        String url = contextPath + "/changePassword?token=" + token;
        String message = "reset password";
        return constructEmail("Reset Password", message + " \r\n" + url, usuario);
    }

    @Override
    public SimpleMailMessage constructEmail(String subject, String body,
                                             Usuario usuario) {
        SimpleMailMessage email = new SimpleMailMessage();
        email.setSubject(subject);
        email.setText(body);
        email.setTo(usuario.getUsername());
        email.setFrom("programacaodesktop2021@gmail.com");
        return email;
    }

}
