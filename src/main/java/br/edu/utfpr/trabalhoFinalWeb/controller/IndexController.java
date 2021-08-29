package br.edu.utfpr.trabalhoFinalWeb.controller;

import br.edu.utfpr.trabalhoFinalWeb.enumeration.CategoriaItemEnum;
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
//		model.addAttribute("categorias")// fazer ficar as categorias relogios, aneis ...
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

	@GetMapping("/buscar")
	public String buscar(Model model) {
		model.addAttribute("itens", itemRepository.findByCategoriaItem(CategoriaItemEnum.ANEIS));
		return "index";
	}

	
}
