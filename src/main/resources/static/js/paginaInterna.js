window.onload = initPage;
function initPage() {
    const valor = calcularValorBoleto();
    document.getElementById('precoBoleto').innerHTML = valor;
    const isSedex = document.getElementById('sedex').checked;
    const valorEnvio = isSedex ? 20 : 5;
    document.getElementById('total').innerHTML = (parseFloat(valor) + parseFloat(valorEnvio)).toFixed(2);
    document.getElementById('precoFrete').innerHTML = valorEnvio.toFixed(2);
}
// $(document).ready(() => {
//     if (!hasAuthentication()) {
//         showMessageAuthentication();
//     }
// });

function alternaImagem(id) {
    const elementImagemPrincipal = document.getElementById('imagemPrincipal');
    const elementImagem = document.getElementById(id);
    elementImagemPrincipal.setAttribute('src', elementImagem.getAttribute('src'));
    document.getElementById(id).focus();

}





function valorParcela() {
    const valorTotal = document.getElementById('total').innerHTML;
    const numeroParcelas = document.getElementById('qtdParcela').value;
    document.getElementById('valorParcela').innerHTML = numeroParcelas + ' de ' + (valorTotal / numeroParcelas).toFixed(2);
}

function finalizarCompra() {
    const isBoleto = document.getElementById('boleto').checked;
    const isCartao = document.getElementById('cartao').checked;
    const numeroParcelas = document.getElementById('qtdParcela').value;
    const isSedex = document.getElementById('sedex').checked;
    let valorTotal = isBoleto ? document.getElementById('total').innerHTML / 100 * 85 : parseFloat(document.getElementById('total').innerHTML);
    let txtValorTotal = numeroParcelas + ' de ' + (valorTotal / numeroParcelas).toFixed(2) + ' sem juros.'

    $('#numProdutosPedido').text(getArrayStorage('produtos').length);
    $('#formaPagamentoPedido').text(isBoleto ? 'Boleto' : isCartao ? 'Cartão' : 'Pix');
    $('#valorTotalPedido').text(txtValorTotal);
    $('#tipoFretePedido').text(isSedex ? 'SEDEX' : 'PAC');
}

function salvarCompra() {
    const isBoleto = document.getElementById('boleto').checked;
    const isCartao = document.getElementById('cartao').checked;
    const numeroParcelas = document.getElementById('qtdParcela').value;
    const isSedex = document.getElementById('sedex').checked;
    let produto={
        titulo: $('#titulo').text(),
        descricao:$('#descricao').text(),
        imagem:$('#imagemPrincipal').text(),
        preco:$('#preco').text(),
    }
    let compra = {
        codigo: $('#codPedido').text(),
        usuario: getUsuarioLogadoStorage(),
        produto: produto,
        qtdProdutos: getArrayStorage('produtos').length,
        formaPagamento: isBoleto ? 'Boleto' : isCartao ? 'Cartão' : 'Pix',
        numeroParcelas: numeroParcelas,
        valorTotal: isBoleto ? document.getElementById('total').innerHTML / 100 * 85 : parseFloat(document.getElementById('total').innerHTML),
        Frete: isSedex ? 'SEDEX' : 'PAC',
        valorFrete: isSedex ? 20 : 5
    }
    setArrayStorage('compraPaginaInterna',compra);
    $('#modalFinalizaCompra').modal('hide');
    addMensagem({
        messageType: 'alert-success',
        message: 'Compra salva com sucesso !',
        time: 5000,
    });
}

function cancelarCompra() {
    addMensagem({
        messageType: 'alert-info',
        message: 'Atenção sua compra não foi salva !',
        time: 5000,
    });
}

function calcularValorBoleto(){
    return (document.getElementById('preco').innerHTML / 100 * 85).toFixed(2);
}

function calculaTotal() {
    const quantidade = document.getElementById('quantidade').value;
    const isBoleto = document.getElementById('boleto').checked;
    const isSedex = document.getElementById('sedex').checked;
    const valorEnvio = isSedex ? 20 : 5
    const valorUnit = isBoleto ? calcularValorBoleto() : document.getElementById('preco').innerHTML;
    alert(valorUnit)
    let valorTotal = (valorUnit * quantidade)+ valorEnvio;
    alert(valorTotal)
    document.getElementById('total').innerHTML = valorTotal.toFixed(2);
}

$(() => {
    $("#cep").mask("99999-999", {autoclear: false});
})