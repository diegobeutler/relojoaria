package br.edu.utfpr.trabalhoFinalWeb.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="USUARIO")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "idUsuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_USUARIO")
    private Long idUsuario;

    @Column(name = "NOME")
    private String nome;

    @Column(name = "email")
    private String email;

    @Column(name = "senha")
    private String senha;
}
