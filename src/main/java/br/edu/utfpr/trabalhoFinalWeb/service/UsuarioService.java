package br.edu.utfpr.trabalhoFinalWeb.service;


import br.edu.utfpr.trabalhoFinalWeb.model.Usuario;

public interface UsuarioService extends CrudService<Usuario, Long>{
    void createPasswordResetTokenForUser(Usuario usuario, String token);

    void changeUserPassword(Usuario usuario, String newPassword);

    Usuario getUsuarioLogado();

}
