package br.edu.utfpr.trabalhoFinalWeb.service.impl;

import br.edu.utfpr.trabalhoFinalWeb.model.Item;
import br.edu.utfpr.trabalhoFinalWeb.service.ItemService;
import org.springframework.data.jpa.repository.JpaRepository;

public class ItemServiceImp extends CrudServiceImpl<Item, Long> implements ItemService {
    @Override
    protected JpaRepository<Item, Long> getRepository() {
        return null;
    }
}
