package br.edu.utfpr.trabalhoFinalWeb.service.impl;

import br.edu.utfpr.trabalhoFinalWeb.model.Pedido;
import br.edu.utfpr.trabalhoFinalWeb.repository.PedidoRepository;
import br.edu.utfpr.trabalhoFinalWeb.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
@Service
public class PedidoServiceImpl extends CrudServiceImpl<Pedido, Long> implements PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;
    @Override
    protected JpaRepository<Pedido, Long> getRepository() {
        return pedidoRepository;
    }

    @Override
    public Pedido save(Pedido entity) {
        return super.save(entity);
    }

}
