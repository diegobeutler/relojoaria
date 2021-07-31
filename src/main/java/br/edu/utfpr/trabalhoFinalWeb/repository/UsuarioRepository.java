package br.edu.utfpr.trabalhoFinalWeb.repository;

import br.edu.utfpr.trabalhoFinalWeb.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
	
	Usuario findByUsername(String username);
	
}
