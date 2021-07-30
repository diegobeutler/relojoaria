package br.edu.utfpr.trabalhoFinalWeb.service.impl;

import br.edu.utfpr.trabalhoFinalWeb.model.Item;
import br.edu.utfpr.trabalhoFinalWeb.repository.ItemRepository;
import br.edu.utfpr.trabalhoFinalWeb.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class ItemServiceImp extends CrudServiceImpl<Item, Long> implements ItemService {

    @Autowired
    private ItemRepository itemRepository;
    @Override
    protected JpaRepository<Item, Long> getRepository() {
        return itemRepository;
    }
}
