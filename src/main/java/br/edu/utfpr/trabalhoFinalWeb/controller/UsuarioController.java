package br.edu.utfpr.trabalhoFinalWeb.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("usuario")
public class UsuarioController {

    @GetMapping("cadastro")
    private String cadastro(){
        return "usuario/cadastro";
    }
}
