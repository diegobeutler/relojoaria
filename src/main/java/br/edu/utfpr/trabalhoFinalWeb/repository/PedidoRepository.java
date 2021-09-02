package br.edu.utfpr.trabalhoFinalWeb.repository;


import br.edu.utfpr.trabalhoFinalWeb.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    List<Pedido> findAllByUsuarioId(Long id);

}
