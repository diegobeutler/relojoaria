package br.edu.utfpr.trabalhoFinalWeb.controller;

import br.edu.utfpr.trabalhoFinalWeb.model.Pedido;
import br.edu.utfpr.trabalhoFinalWeb.repository.UsuarioRepository;
import br.edu.utfpr.trabalhoFinalWeb.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;
import java.security.Security;
import java.time.LocalDate;

@Controller
@RequestMapping("pedido")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;
    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping("")
    private String pedido(){
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

            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            String nome;

            if (principal instanceof UserDetails) {
                nome = ((UserDetails)principal).getUsername();
            } else {
                nome = principal.toString();
            }

            pedido.setUsuario(usuarioRepository.findByUsername(nome));
            pedido.setDataPedido(LocalDate.now());
//            pedido.setFornecedor(fornecedorService.findOne(pedido.getFornecedor().getId()));
            pedido.getPedidoItens().forEach(pi -> pi.setPedido(pedido));

            pedidoService.save(pedido);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

        }
    }


}
