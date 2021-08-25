package br.edu.utfpr.trabalhoFinalWeb.model;

import br.edu.utfpr.trabalhoFinalWeb.enumeration.TipoPagamento;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "PEDIDO")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "idPedido")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_PEDIDO")
    private Long idPedido;

    @Column(name= "DATA_PEDIDO")
    private LocalDate dataPedido;

    @ManyToOne(optional = false)
    @JoinColumn(name = "ID_USUARIO")
    private Usuario usuario;

    @Enumerated(EnumType.STRING)
    @Column(name = "TIPO_PAGAMENTO", length = 15)
    private TipoPagamento tipoPagamento;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<PedidoItem> pedidoItens;

}
