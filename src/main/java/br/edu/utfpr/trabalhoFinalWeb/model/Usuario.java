package br.edu.utfpr.trabalhoFinalWeb.model;

import java.io.Serializable;
import java.math.BigInteger;
import java.time.LocalDate;
import java.util.*;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.NumberFormat;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = {"id"})
public class Usuario implements Serializable,
		UserDetails{
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(length = 255, nullable = false)
	private String nome;

	@Column(length = 255)
	private String apelido;

	@Column( nullable = false, length = 14)
	private String cpf;

	@Column( nullable = false)
	private String genero;

	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy")
	private LocalDate dataNasc;

	//@Column( nullable = false)
	private String telefone;

	@Column( nullable = false, length = 14)
	private String cep;

	//@Column( nullable = false)
	private String rua;

	private String bairro;

	private String cidade;

	private String estado;

	private String numero;

	@Column(length = 100, nullable = false)
	private String username;

	@Column(length = 1024, nullable = false)
	private String password;

	@ManyToMany(cascade = CascadeType.ALL,
			fetch = FetchType.EAGER)
	private Set<Permissao> permissoes;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<GrantedAuthority> list = new ArrayList<>();
		list.addAll(permissoes);
		return list;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	public void setDataNasc(String dataNasc) {
		this.dataNasc = LocalDate.now();
	}

	public LocalDate getDataNasc() {
		return dataNasc;
	}
}




