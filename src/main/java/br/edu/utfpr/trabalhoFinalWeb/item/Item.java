package br.edu.utfpr.trabalhoFinalWeb.item;

import br.edu.utfpr.trabalhoFinalWeb.item.enumeration.CategoriaItemEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "ITEM")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_ITEM")
    private long idItem;

    @Column(name = "NOME", length = 80, nullable = false)
    private String nome;

    @Column(name = "DESCRICAO", length = 180, nullable = false)
    private String descricao;

    @Column(name="VALOR_AJUSTE", nullable = false, precision = 15, scale = 2)
    private BigDecimal valor;

    @Enumerated(EnumType.STRING)
    @Column(name = "CATEGORIA_ITEM", length = 15)
    private CategoriaItemEnum categoriaItem;
}
