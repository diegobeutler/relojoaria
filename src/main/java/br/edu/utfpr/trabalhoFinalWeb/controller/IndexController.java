package br.edu.utfpr.trabalhoFinalWeb.controller;

import br.edu.utfpr.trabalhoFinalWeb.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

	@Autowired
	private ItemService itemService;
	@GetMapping("")
	public String index(Model model) {
		model.addAttribute("itens", itemService.findAll());
		return "index";

	}

	@GetMapping(value = {"teste", "teste2"})
	public String teste() {
		return "login";
	}
	
}
