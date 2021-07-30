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

	@GetMapping
	public String list(Model model) {
		model.addAttribute("itns", itemService.findAll());
		return "item/list";
	}



	@GetMapping("new")
	public String form(Model model) {
		model.addAttribute("item", new Item());
//		carregarCombos(model);
		return "item/form";
	}


//	private void carregarCombos(Model model) {
//		model.addAttribute("categorias", categoriaService.findAll());
//		model.addAttribute("marcas", marcaService.findAll());
//	}

	@PostMapping
	private String save(@Valid Item item,
						BindingResult result,
						Model model,
						RedirectAttributes attributes) {
		if (result.hasErrors()) {
//			carregarCombos(model);
			return "item/form";
		}
		itemService.save(item);
		attributes.addFlashAttribute("sucesso", "Registro salvo com sucesso!");
		return "redirect:/item";
	}

	@GetMapping("{id}")
	private String form(@PathVariable("id") Long id, Model model) {
		model.addAttribute("item", itemService.findOne(id));
		System.out.println(itemService.findOne(id));
//		carregarCombos(model);
		return "item/form";
	}

	@DeleteMapping("{id}")
	private String delete(@PathVariable("id") Long id, RedirectAttributes attributes) {
		try {
			itemService.delete(id);
			attributes.addFlashAttribute("sucesso", "Registro removido com sucesso!");
		} catch (Exception ex) {
			attributes.addFlashAttribute("erro", "Falha ao remover o registro!");
		}

		return "redirect:/item";
	}

	@GetMapping("view/{id}")
	private String view(@PathVariable("id") Long id, Model model) {
		model.addAttribute("item", itemService.findOne(id));
		return "item/view";
	}
}






