package br.edu.utfpr.trabalhoFinalWeb.model;

import br.edu.utfpr.trabalhoFinalWeb.enumeration.CategoriaItemEnum;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "ITEM")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(of = "idItem")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_ITEM")
    private long idItem;

    @NotEmpty(message="O campo nome deve ser preenchido")
    @NotNull(message = "O campo nome não deve ser null")
    @Column(name = "NOME", length = 80, nullable = false)
    private String nome;

    @NotEmpty(message="O campo descrição deve ser preenchido")
    @NotNull(message = "O campo descrição não deve ser null")
    @Column(name = "DESCRICAO", length = 400, nullable = false)
    private String descricao;

    @Column(name="VALOR_ANTERIOR", nullable = false)
    private Double valorAnterior;

    @Column(name="VALOR", nullable = false)
    private Double valor;

    @Enumerated(EnumType.STRING)
    @Column(name = "CATEGORIA_ITEM", length = 15)
    private CategoriaItemEnum categoriaItem;
}
