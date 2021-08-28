package br.edu.utfpr.trabalhoFinalWeb.service;

import br.edu.utfpr.trabalhoFinalWeb.model.Pedido;

import java.util.List;

public interface PedidoService extends CrudService<Pedido, Long>{
    List<Pedido> findAllByUsuarioId(Long id);
}
