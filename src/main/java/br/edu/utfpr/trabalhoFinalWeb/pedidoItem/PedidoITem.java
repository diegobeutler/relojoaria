package br.edu.utfpr.trabalhoFinalWeb.pedidoItem;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "PEDIDO_ITEM")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PedidoITem {
}
