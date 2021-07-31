package br.edu.utfpr.trabalhoFinalWeb.controller;

import br.edu.utfpr.trabalhoFinalWeb.repository.ItemRepository;
import br.edu.utfpr.trabalhoFinalWeb.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

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
//	@GetMapping("/relogios")
//	public String index(Model model) {
////		model.addAttribute("itens", itemRepository.findBy());
//		return "index";
//	}

	@GetMapping(value = {"teste", "teste2"})
	public String teste() {
		return "login";
	}
	
}
