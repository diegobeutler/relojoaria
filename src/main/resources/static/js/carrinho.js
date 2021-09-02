let arrayCarrinho = [];
let liProduto;
let subtotal = 0;
let produtoExcluir;
let elementExcluir;
var totalLabel;

window.onload = initPage;

function initPage() {
    adicionaListaItens();
}

function adicionaListaItens() {
    arrayCarrinho = getArrayStorage('itensCarrinho');
    arrayCarrinho.forEach((itemCarrinho) => {
        novoLi(itemCarrinho);
    });
}

function novoLi(itemCarrinho) {
    liProduto = document.createElement('li');
    let imgProduto = document.createElement('img');
    let lbProduto = document.createElement('label');
    let lbQuantidade = document.createElement('label');
    let spProduto = document.createElement('span');
    let divBotoes = document.createElement('div');

    let btSomar = novoBotao('a', ['somar']);
    let btSubtrair = novoBotao('a', ['subtrair']);
    let btExcluir = novoBotao('a', ['excluir']);
    btSomar.innerHTML = '<i class="fa fa-plus"></i>';
    lbQuantidade.innerHTML = '<label>1</label>';
    lbQuantidade.textContent = itemCarrinho.quantidade;
    btSubtrair.innerHTML = '<i class="fa fa-minus"></i>';
    btExcluir.innerHTML = '<i class="fa fa-trash"></i>';

    lbQuantidade.classList.add('quantidadeProd');
    lbQuantidade.classList.add('font-weight-bold');
    imgProduto.classList.add('col-2')
    spProduto.classList.add('preco-carrinho');
    lbProduto.classList.add('mb-0');
    liProduto.classList.add('list-group-item');
    liProduto.classList.add('list-item-carrinho');


    divBotoes.appendChild(btSomar);
    divBotoes.appendChild(lbQuantidade)
    divBotoes.appendChild(btSubtrair);
    divBotoes.appendChild(btExcluir);

    liProduto.appendChild(imgProduto);
    liProduto.appendChild(lbProduto);
    liProduto.appendChild(spProduto);
    liProduto.appendChild(divBotoes);

    document.querySelector('#lista').appendChild(liProduto);

    lbProduto.textContent = itemCarrinho.titulo;
    spProduto.textContent = itemCarrinho.preco;
    imgProduto.setAttribute('src', itemCarrinho.srcImagem);

    totalLabel = document.querySelector("#totalListaProdutos");

    liProduto.querySelector('.somar').addEventListener('click', (e) => {
        e.preventDefault()
        arrayCarrinho = getArrayStorage('itensCarrinho');
        const index = arrayCarrinho.findIndex(item => item.idItem == itemCarrinho.idItem);
        arrayCarrinho[index].quantidade++;
        setArrayStorage('itensCarrinho', arrayCarrinho);
        lbQuantidade.textContent = parseInt(lbQuantidade.textContent) + 1;
        setTotal(somar(itemCarrinho.preco, totalLabel.textContent));

    })

    liProduto.querySelector('.subtrair').addEventListener('click', (e) => {
        e.preventDefault()
        arrayCarrinho = getArrayStorage('itensCarrinho');
        const index = arrayCarrinho.findIndex(prod => prod.idItem == itemCarrinho.idItem);
        if (arrayCarrinho[index].quantidade > 1) {
            arrayCarrinho[index].quantidade--;
            setArrayStorage('itensCarrinho', arrayCarrinho);
            lbQuantidade.textContent = parseInt(lbQuantidade.textContent) - 1;
            setTotal(subtrair(totalLabel.textContent, itemCarrinho.preco));
        } else {
            produtoExcluir = itemCarrinho;
            elementExcluir = e;
            $("#excluir").modal();
        }
    })
    liProduto.querySelector('.excluir').addEventListener('click', (e) => {
        e.preventDefault()
        produtoExcluir = itemCarrinho;
        elementExcluir = e;
        $("#excluir").modal();

    })
    let preco = Number(itemCarrinho.preco) * itemCarrinho.quantidade;
    subtotal += preco;
    setTotal(subtotal);
}

function novoBotao(elemento, classe) {
    let componente = document.createElement(elemento);
    componente.setAttribute('href', '#');
    classe.map(function (item) {
        componente.classList.add(item);
    })
    componente.style.paddingLeft = '5px';
    return componente;
}

function confirmaExclusao() {
    totalLabel = document.querySelector("#totalListaProdutos");
    arrayCarrinho = getArrayStorage('itensCarrinho');
    let index = arrayCarrinho.findIndex(produto => produto.idItem == produtoExcluir.idItem);
    setTotal((subtrair(totalLabel.textContent, multiplicar(produtoExcluir.preco, arrayCarrinho[index].quantidade))));
    arrayCarrinho.splice(index, 1);
    setArrayStorage('itensCarrinho', arrayCarrinho);
    elementExcluir.preventDefault();

    elementExcluir.target.parentNode.parentNode.parentNode.remove();
    setNumeroProdutos(arrayCarrinho.length);
    addMensagem({messageType: 'alert-success', message: 'Produto excluído com sucesso !', time: 5000});
}

function cancelaExclusao() {
    addMensagem({
        messageType: 'alert-info',
        message: 'Produto mantido em seu carrinho !',
        time: 3000,
    });
}

function setTotal(valor) {
    $('#totalResumo').text(valor.toFixed(2));
    $('#totalListaProdutos').text(valor.toFixed(2));
    $('#totalDescontoBoleto').text((valor / 100 * 85).toFixed(2));
    $('#total').text(Number(calculaValorTotalPedido()).toFixed(2));
}

function changeValorTotal() {
    $('#total').text(Number(calculaValorTotalPedido()).toFixed(2));
}

function valorParcela() {
    const numeroParcelas = document.getElementById('qtdParcela').value;
    document.getElementById('valorParcela').innerHTML = numeroParcelas + ' de ' + (calculaValorTotalPedido() / numeroParcelas).toFixed(2);
}

function finalizarCarrinho() {
    if (arrayCarrinho.length) {
        salvarPedido();
        window.location = "/pedido"
    } else {
        addMensagem({
            messageType: 'alert-info',
            message: 'Não há itens no carrinho',
            time: 5000,
        });
    }
}

function salvarPedido() {
    const isBoleto = document.getElementById('boleto').checked;
    const isCartao = document.getElementById('cartao').checked;
    const numeroParcelas = document.getElementById('qtdParcela').value;
    const isSedex = document.getElementById('sedex').checked;
    let pedido = {
        itensCarrinho: getArrayStorage('itensCarrinho'),
        tipoPagamento: isBoleto ? 'BOLETO' : isCartao ? 'CARTAO' : 'PIX',
        numeroParcelas: numeroParcelas,
        formaEnvio: isSedex ? 'SEDEX' : 'PAC',
    }
    setArrayStorage('pedido', pedido);
}

function cancelarPedido() {
    addMensagem({
        messageType: 'alert-info',
        message: 'Atenção seu pedido não foi salvo !',
        time: 5000,
    });
}

function calcularFretePedido() {
    const isSedex = document.getElementById('sedex').checked;
    document.getElementById('precoFrete').innerHTML = isSedex ? '20.00' : '5.00';
    document.getElementById('valorFreteModal').innerHTML = isSedex ? 'Valor de envio: R$ 20.00' : 'Valor de envio: R$ 5.00';
    changeValorTotal();
}

function limpaCarrinho() {
    arrayCarrinho = new Array();
    setArrayStorage('itensCarrinho', arrayCarrinho);
    setNumeroProdutos(0);
    $("#lista").empty();
    setTotal(0);
}

function calculaValorTotalPedido() {
    const isBoleto = document.getElementById('boleto').checked;
    const isSedex = document.getElementById('sedex').checked;
    let valorTotal = isBoleto ? document.getElementById('totalDescontoBoleto').innerHTML : parseFloat(document.getElementById('totalResumo').innerHTML);
    valorTotal = somar(isSedex ? 20 : 5, valorTotal);
    return valorTotal;
}