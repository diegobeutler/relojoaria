package br.edu.utfpr.trabalhoFinalWeb.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "PEDIDO_ITEM")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(of = "idPedidoItem")
public class PedidoItem {

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

    @Column(name = "QUANTIDADE", nullable = false)
    private Integer quantidade;

    @Column(name = "VALOR_UNITARIO", nullable = false)
    private Double valorUnitario;


}
