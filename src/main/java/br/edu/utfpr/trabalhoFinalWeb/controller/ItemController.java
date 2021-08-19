package br.edu.utfpr.trabalhoFinalWeb.controller;

import br.edu.utfpr.trabalhoFinalWeb.model.Item;
import br.edu.utfpr.trabalhoFinalWeb.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;



import javax.validation.Valid;

@Controller
@RequestMapping("item")
public class ItemController {
	
	@Autowired
	private ItemService itemService;
//	@Autowired
//	private CategoriaService categoriaService;
//	@Autowired
//	private MarcaService marcaService;

	@GetMapping("{id}")
	private String form(@PathVariable("id") Long id, Model model) {
		model.addAttribute("item", itemService.findOne(id));
		return "item/paginaInterna";
	}
}






