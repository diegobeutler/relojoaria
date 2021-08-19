package br.edu.utfpr.trabalhoFinalWeb.controller;

import br.edu.utfpr.trabalhoFinalWeb.model.Usuario;
import br.edu.utfpr.trabalhoFinalWeb.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.validation.Valid;

@Controller
@RequestMapping("usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("cadastro")
    private String cadastro(){
        return "usuario/cadastro";
    }


    @PostMapping("cadastro")
    private String save(@Valid Usuario usuario, BindingResult result,
                        Model model,
                        RedirectAttributes attributes) {
        if (result.hasErrors()) {
            model.addAttribute("usuario", usuario);
            return "usuario/cadastro";
        }

        usuarioService.save(usuario);
        attributes.addFlashAttribute("sucesso",
                "Registro salvo com sucesso!");
        return "redirect:/login";
    }

    @GetMapping("perfil")
    private String perfil(){
        return "usuario/perfil";
    }
}
