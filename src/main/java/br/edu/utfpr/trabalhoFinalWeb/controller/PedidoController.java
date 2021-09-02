package br.edu.utfpr.trabalhoFinalWeb.controller;

import br.edu.utfpr.trabalhoFinalWeb.model.Pedido;
import br.edu.utfpr.trabalhoFinalWeb.model.Usuario;
import br.edu.utfpr.trabalhoFinalWeb.repository.UsuarioRepository;
import br.edu.utfpr.trabalhoFinalWeb.service.PedidoService;
import br.edu.utfpr.trabalhoFinalWeb.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Security;
import java.time.LocalDate;

@Controller
@RequestMapping("pedido")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;
    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("")
    private String pedido(Model model) {
        model.addAttribute("usuario", usuarioService.getUsuarioLogado());
        return "pedido";
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody @Valid Pedido pedido,
                                  BindingResult result,
                                  Model model) {
        try {
            if (result.hasErrors()) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            Usuario usuario = usuarioService.getUsuarioLogado();
            pedido.setUsuario(usuario);
            pedido.setDataPedido(LocalDate.now());
            pedido.getPedidoItens().forEach(pi -> pi.setPedido(pedido));
            pedidoService.save(pedido);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("list")
    private String list(Model model) {
        Usuario usuario = usuarioService.getUsuarioLogado();
        model.addAttribute("pedidos", pedidoService.findAllByUsuarioId(usuario.getId()));
        model.addAttribute("usuario", usuario);
        return "pedido-list";
    }

    @GetMapping("{id}")
    private String form(@PathVariable("id") Long id, Model model) {
        model.addAttribute("pedido", pedidoService.findOne(id));
        model.addAttribute("usuario", usuarioService.getUsuarioLogado());
        return "pedido-form";
    }

}
