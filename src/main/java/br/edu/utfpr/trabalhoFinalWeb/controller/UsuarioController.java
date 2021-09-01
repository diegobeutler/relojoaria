package br.edu.utfpr.trabalhoFinalWeb.controller;

import br.edu.utfpr.trabalhoFinalWeb.model.Usuario;
import br.edu.utfpr.trabalhoFinalWeb.resetPassword.GenericResponse;
import br.edu.utfpr.trabalhoFinalWeb.resetPassword.dto.PasswordDto;
import br.edu.utfpr.trabalhoFinalWeb.service.SecurityUserService;
import br.edu.utfpr.trabalhoFinalWeb.service.UsuarioService;
import br.edu.utfpr.trabalhoFinalWeb.service.impl.UsuarioServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Locale;
import java.util.UUID;

@Controller
@RequestMapping("usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private UsuarioServiceImpl usuarioServiceImpl;
    @Autowired
    private SecurityUserService securityUserService;
    @Autowired
    private JavaMailSender mailSender;

    @GetMapping("cadastro")
    private String cadastro() {
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
    private String perfil(Model model) {
        model.addAttribute(usuarioService.getUsuarioLogado());
        return "usuario/perfil";

    }

    @PostMapping("reset")
    public GenericResponse resetPassword(HttpServletRequest request,
                                         @RequestParam("email") String email) {

        Usuario usuario = (Usuario) usuarioServiceImpl.loadUserByUsername(email);
        if (usuario == null) {
            throw new UsernameNotFoundException(null);
        }
        String token = UUID.randomUUID().toString();
        usuarioService.createPasswordResetTokenForUser(usuario, token);
        mailSender.send(securityUserService.constructResetTokenEmail("http://localhost:8080/usuario", token, usuario));
        return new GenericResponse("reset password");
    }

    @PostMapping("savePassword")
    public String savePassword(final Locale locale, PasswordDto passwordDto, Model model) {

        String result = securityUserService.validatePasswordResetToken(passwordDto.getToken());

        if (result != null) {
            return "redirect:usuario/reset";
        }
        Usuario usuario = securityUserService.getUserByPasswordResetToken(passwordDto.getToken());
        if (usuario != null) {
            usuarioService.changeUserPassword(usuario, passwordDto.getNewPassword());
            model.addAttribute("mensagem", "Senha atualizada com sucesso");
            return "login";
        } else {
            return "redirect:/usuario/reset";
        }
    }

    @GetMapping("reset")
    private String reset() {
        return "usuario/reset";
    }

    @GetMapping("changePassword")
    public String showChangePasswordPage(Locale locale, Model model,
                                         @RequestParam("token") String token) {
        String result = securityUserService.validatePasswordResetToken(token);
        if (result != null) {
            return "redirect:/login";
        } else {
            model.addAttribute("token", token);
            return "usuario/updatePassword";
        }
    }

    @GetMapping("updatePassword")
    public String updatePassword() {
        return "usuario/updatePassword";
    }
}
