package br.edu.utfpr.trabalhoFinalWeb.controller;

import br.edu.utfpr.trabalhoFinalWeb.enumeration.CategoriaItemEnum;
import br.edu.utfpr.trabalhoFinalWeb.repository.ItemRepository;
import br.edu.utfpr.trabalhoFinalWeb.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class IndexController {

	@Autowired
	private ItemService itemService;
	@Autowired
	private ItemRepository itemRepository;
	@GetMapping("")
	public String index(Model model) {
		model.addAttribute("itens", itemService.findAll());
		return "index";
	}

	@GetMapping("/relogios")
	public String relogios(Model model) {
		model.addAttribute("itens", itemRepository.findByCategoriaItem(CategoriaItemEnum.RELOGIOS));
		return "index";
	}

	@GetMapping("/aneis")
	public String aneis(Model model) {
		model.addAttribute("itens", itemRepository.findByCategoriaItem(CategoriaItemEnum.ANEIS));
		return "index";
	}

	@PostMapping("/buscar")
	public String buscar(String query, Model model) {
		model.addAttribute("itens", itemRepository.findByNomeContainingIgnoreCase(query));
		return "index";
	}
	
}
