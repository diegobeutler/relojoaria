package br.edu.utfpr.trabalhoFinalWeb.repository;

import br.edu.utfpr.trabalhoFinalWeb.model.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordTokenRepository extends JpaRepository<PasswordResetToken,Long> {
    PasswordResetToken findByToken(String token);
}
