package br.edu.utfpr.trabalhoFinalWeb.model;

import br.edu.utfpr.trabalhoFinalWeb.enumeration.FormaEnvio;
import br.edu.utfpr.trabalhoFinalWeb.enumeration.TipoPagamento;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

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

    @Enumerated(EnumType.STRING)
    @Column(name = "FORMA_ENVIO", length = 15)
    private FormaEnvio formaEnvio;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<PedidoItem> pedidoItens;

    private Integer numeroParcelas;

    @Transient
    private Double valorTotal;

    public Double getValorTotal() {
        Double valorTotal =  pedidoItens.stream()
                .map(pedidoItem -> pedidoItem.getValorUnitario() * pedidoItem.getQuantidade())
                .collect(Collectors.summingDouble(Double::doubleValue));
        return tipoPagamento == TipoPagamento.BOLETO ? valorTotal * .85 : valorTotal;
    }

    public String getDataPedido() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        return dataPedido.format(formatter);
    }
}
