package br.edu.utfpr.trabalhoFinalWeb.service.impl;


import br.edu.utfpr.trabalhoFinalWeb.model.PasswordResetToken;
import br.edu.utfpr.trabalhoFinalWeb.model.Usuario;
import br.edu.utfpr.trabalhoFinalWeb.repository.PasswordTokenRepository;
import br.edu.utfpr.trabalhoFinalWeb.repository.PermissaoRepository;
import br.edu.utfpr.trabalhoFinalWeb.repository.UsuarioRepository;
import br.edu.utfpr.trabalhoFinalWeb.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UsuarioServiceImpl extends CrudServiceImpl<Usuario, Long>
		implements UsuarioService, UserDetailsService {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Autowired
	private PasswordEncoder encoder;

	@Autowired
	private PermissaoRepository permissaoRepository;

	@Autowired
	private PasswordTokenRepository passwordTokenRepository;
	
	@Override
	protected JpaRepository<Usuario, Long> getRepository() {
		return usuarioRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Usuario usuario = this.usuarioRepository.findByUsername(username);
		if (usuario == null) {
			throw new UsernameNotFoundException("Usuário não encontrado");
		}
		return usuario;
	}

	@Override
	public Usuario save(Usuario entity) {
		entity.setPassword(encoder.encode(entity.getPassword()));
		entity.setPermissoes(Set.of(permissaoRepository.findByNome("ROLE_USER")));
		return super.save(entity);
	}

	@Override
	public Usuario getUsuarioLogado() {
		return (Usuario) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	}

	@Override
	public void createPasswordResetTokenForUser(Usuario usuario, String token) {
		PasswordResetToken myToken = new PasswordResetToken(token, usuario);
		passwordTokenRepository.save(myToken);
	}

	@Override
	public void changeUserPassword(Usuario usuario, String newPassword){
		usuario.setPassword(encoder.encode(newPassword));
		super.save(usuario);
	}

}
