// const btAdicionar = document.querySelector("#btAdicionar");
let itensCarrinho = [];
let pedidoStorage;
let precoFrete;
let liProduto;
let lista = document.querySelector('#lista');
let subtotal = 0;
var totalLabel;


window.onload = initPage;
function initPage() {

	pedidoStorage = getArrayStorage('pedido');
	itensCarrinho = pedidoStorage.itensCarrinho;
	itensCarrinho.forEach((itemCarrinho) => {
		novoLi(itemCarrinho);
	});
	precoFrete = parseFloat(pedidoStorage.formaEnvio == 'SEDEX' ? 20.00 : 5.00).toFixed(2);
	$('#formaEnvio').text(pedidoStorage.formaEnvio);
	$('#precoFrete').text(precoFrete);
	$('#formaPagamento').text(pedidoStorage.tipoPagamento);
	$('#numeroParcelas').text(pedidoStorage.numeroParcelas);

}

// $(document).ready(() => {
//
// });

function novoLi(itemCarrinho) {
	liProduto = document.createElement('li');
	let imgProduto = document.createElement('img');
	let lbProduto = document.createElement('label');
	let lbQuantidade = document.createElement('label');
	let spProduto = document.createElement('span');

	lbQuantidade.innerHTML = '<label>1</label>';
	lbQuantidade.textContent = itemCarrinho.quantidade;


	lbQuantidade.classList.add('quantidadeProd');
	lbQuantidade.classList.add('font-weight-bold');
	imgProduto.classList.add('col-2')
	spProduto.classList.add('preco-carrinho');
	lbProduto.classList.add('mb-0');
	liProduto.classList.add('list-group-item');
	liProduto.classList.add('list-item-carrinho');

	liProduto.appendChild(imgProduto);
	liProduto.appendChild(lbProduto);
	liProduto.appendChild(spProduto);
	liProduto.appendChild(lbQuantidade);

	document.querySelector('#lista').appendChild(liProduto);

	lbProduto.textContent = itemCarrinho.titulo;
	spProduto.textContent = itemCarrinho.preco;
	imgProduto.setAttribute('src', itemCarrinho.srcImagem);

	totalLabel = document.querySelector("#totalListaProdutos");

	let preco = Number(itemCarrinho.preco) * itemCarrinho.quantidade;
	subtotal += preco;
	setTotalPedido(subtotal);
}

function setTotalPedido(valor) {
	$('#totalListaProdutos').text(valor.toFixed(2));
	calculaValorTotalPedido();
}

function calculaValorTotalPedido() {
	let total = itensCarrinho.reduce(getTotal, 0);
	total = pedidoStorage.tipoPagamento ==='BOLETO' ? total *.85: total;
	total = pedidoStorage.formaEnvio ==='SEDEX' ? total + 20: total + 5;
	$('#total').text(parseFloat(total).toFixed(2));
}

function getTotal(total, item) {
	return total + (item.quantidade * item.preco);
}

function finalizarCompra() {
	let pedido = new Object();
	pedido.pedidoItens = new Array();

	itensCarrinho.forEach((itemCarrinho,i) => {
		pedido.pedidoItens[i] = new Object();
		pedido.pedidoItens[i].item = new Object();
		pedido.pedidoItens[i].item.idItem = itemCarrinho.idItem;
		pedido.pedidoItens[i].valorUnitario = parseFloat(itemCarrinho.preco);
		pedido.pedidoItens[i].quantidade = itemCarrinho.quantidade;
	})

	pedido.tipoPagamento = pedidoStorage.tipoPagamento;
	pedido.formaEnvio = pedidoStorage.formaEnvio;
	pedido.numeroParcelas = pedidoStorage.numeroParcelas;

	$.ajax({
		type: 'post',
		url: 'http://localhost:8080/pedido',
		contentType : 'application/json',
		data : JSON.stringify(pedido),
		success: function() {
			Swal.fire({
				title: 'Salvo!',
				text: 'Registro salvo com sucesso!',
				type: 'success'
			}).then((result) => {
				setArrayStorage('itensCarrinho',  new Array());
				setNumeroProdutos(0);
				window.location = '/pedido/list';
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


