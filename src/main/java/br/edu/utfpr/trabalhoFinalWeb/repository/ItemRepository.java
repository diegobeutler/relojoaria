package br.edu.utfpr.trabalhoFinalWeb.repository;


import br.edu.utfpr.trabalhoFinalWeb.enumeration.CategoriaItemEnum;
import br.edu.utfpr.trabalhoFinalWeb.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {

    List<Item> findByCategoriaItem(CategoriaItemEnum categoriaItemEnum);
}
