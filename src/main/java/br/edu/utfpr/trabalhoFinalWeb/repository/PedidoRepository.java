package br.edu.utfpr.trabalhoFinalWeb.repository;


import br.edu.utfpr.trabalhoFinalWeb.model.Item;
import br.edu.utfpr.trabalhoFinalWeb.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

}
