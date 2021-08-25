let compraProdutos = [];

function adicionarProduto() {
	let compraProduto = new Object();
	compraProduto.id = new Object();
	compraProduto.id.produto = new Object();

	compraProduto.id.produto.id = $('#produto').val();
	compraProduto.id.produto.nome = $('#produto').find(':selected').text().split('|')[0];
	compraProduto.valor = $('#produto').find(':selected').data('valor') // $('#produto').attr('data-valor');
	compraProduto.quantidade = $('#quantidade').val();
	compraProdutos.push(compraProduto);

	adicionarLinhaCarrinho( criarLinha(compraProduto) );
}

function removerProduto() {
	// TO-DO
}

function criarLinha(compraProduto) {
	return $('<tr />')
		.attr('id', "${compraProduto.id.produto.id}")
		.append($('<td />').html("<span>" + compraProduto.id.produto.nome + "</span>"))
		.append($('<td />').html("<span>" + compraProduto.quantidade + "</span>"))
		.append($('<td />').html("<span>" + new Intl.NumberFormat('pt-BR',{ style: 'currency', currency: 'BRL'}).format(compraProduto.valor) + "</span>"))
		.append($('<td />').html("<span>" + new Intl.NumberFormat('pt-BR',{ style: 'currency', currency: 'BRL'}).format(compraProduto.valor * compraProduto.quantidade) + "</span>"))
		.append($('<td />').html("<a href='#'><i className='fa fa-trash ml-2' title='Remover produto' data-toggle='tooltip'></i></a>"));
}

function adicionarLinhaCarrinho(linha) {
	if ($('#tbCompraProdutos tbody') == 0)
		$('#tbCompraProdutos').append('<tbody> </tbody>');

	$('#tbCompraProdutos tbody').append(linha);
}

function finalizarCompra(urlDestino) {
	const itensCarrinho = getArrayStorage("itensCarrinho");

	let pedido = new Object();
	pedido.pedidoItens = new Array();
	// let produto = {
	// 	idItem: $('#idItem').text(),
	// 	titulo: $('#titulo').text(),
	// 	descricao:$('#descricao').text(),
	// 	preco: parseFloat($('#preco').text()).toFixed(2),
	// 	srcImagem: srcImagem.getAttribute('src'),
	// 	quantidade:$('#quantidade').val()
	// }

	itensCarrinho.forEach((itemCarrinho,i) => {
		pedido.pedidoItens[i] = new Object();
		pedido.pedidoItens[i].item = new Object();
		pedido.pedidoItens[i].item.idItem = itemCarrinho.idItem;
		pedido.pedidoItens[i].valorUnitario = parseFloat(itemCarrinho.preco);
		pedido.pedidoItens[i].quantidade = itemCarrinho.quantidade;
	})

	pedido.tipoPagamento = 'CARTAO';

	$.ajax({
		type: $('#formPedido').attr('method'),
		url: $('#formPedido').attr('action'),
		contentType : 'application/json',
		data : JSON.stringify(pedido),
		success: function() {
			Swal.fire({
				title: 'Salvo!',
				text: 'Registro salvo com sucesso!',
				type: 'success'
				}).then((result) => {
					window.location = urlDestino;
				}
			);//FIM swal()
		},
		error: function(data) {
			console.log(data);
			Swal.fire('Errou!', 'Falha ao salvar registro!', 'error');
		}
	}); //FIM ajax()
	return false;
}

// Salvar as pedidos
$('#frm').submit(function (e) {

});


