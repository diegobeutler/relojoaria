package br.edu.utfpr.trabalhoFinalWeb.model;

import lombok.*;

import javax.persistence.*;
import java.math.BigInteger;

@Entity
@Table(name = "PEDIDO_ITEM")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(of = "idPedidoItem")
public class PedidoITem {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    @Column(name = "ID_PEDIDO_ITEM")
    private Long idPedidoItem;

    @ManyToOne(optional = false)
    @JoinColumn(name = "ID_PEDIDO")
    private Pedido pedido;

    @ManyToOne(optional = false)
    @JoinColumn(name = "ID_ITEM")
    private Item item;

    @Column(name = "QUANTIDADE")
    private Integer quantidade;

    @Column(name = "VALOR_UNITARIO")
    private BigInteger ValorUnitario;

}
