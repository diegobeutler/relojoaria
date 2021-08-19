package br.edu.utfpr.trabalhoFinalWeb.repository;

import br.edu.utfpr.trabalhoFinalWeb.model.Permissao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissaoRepository extends JpaRepository<Permissao, Long> {

    Permissao findByNome(String nome);
}
