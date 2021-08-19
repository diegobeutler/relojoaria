package br.edu.utfpr.trabalhoFinalWeb.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("carrinho")
public class CarrinhoController {

    @GetMapping("")
    private String cadastro(){
        return "carrinho";
    }

}
