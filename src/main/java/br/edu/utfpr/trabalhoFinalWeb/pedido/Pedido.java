package br.edu.utfpr.trabalhoFinalWeb.pedido;

import br.edu.utfpr.trabalhoFinalWeb.pedido.enumeration.TipoPagamento;
import br.edu.utfpr.trabalhoFinalWeb.usuario.Usuario;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "PEDIDO")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
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

}
