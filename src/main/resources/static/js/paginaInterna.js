window.onload = initPage;
var hasItemCarrinho;
var indexItem;

function initPage() {
    const idItem = document.getElementById('idItem').innerHTML;
    const arrayCarrinho = getArrayStorage('itensCarrinho');
    indexItem = arrayCarrinho.findIndex(item => item.idItem == idItem);

    if (indexItem != -1) {
        $('#quantidade').val(arrayCarrinho[indexItem].quantidade);
        $('#btAdicionar').text("Atualizar");
        hasItemCarrinho = true;
    } else {
        $('#btAdicionar').text("Adicionar");
        hasItemCarrinho = false;
        $('#quantidade').val(1);
    }


    const valor = calcularValorBoleto();
    document.getElementById('precoBoleto').innerHTML = valor;
    const isSedex = document.getElementById('sedex').checked;
    const valorEnvio = isSedex ? 20 : 5;
    document.getElementById('total').innerHTML = (parseFloat(valor) + parseFloat(valorEnvio)).toFixed(2);
    document.getElementById('precoFrete').innerHTML = valorEnvio.toFixed(2);
    calculaTotal();
}

function valorParcela() {
    const valorTotal = document.getElementById('total').innerHTML;
    const numeroParcelas = document.getElementById('qtdParcela').value;
    document.getElementById('valorParcela').innerHTML = numeroParcelas + ' de ' + (valorTotal / numeroParcelas).toFixed(2);
}

function setarDadosModal() {
    if (hasItemCarrinho) {
        $('#btAdicionarModal').text("Atualizar");
        $('#tituloModal').text("Atualizar Item");
    } else {
        $('#btAdicionarModal').text("Adicionar");
        $('#tituloModal').text("Adicionar ao Carrinho");
    }
    $('#quantidadeModal').text($('#quantidade').val());

}

function cancelarAddItemCarrinho() {
    addMensagem({
        messageType: 'alert-info',
        message: hasItemCarrinho ? 'Atenção item não Atualizado !' : 'Atenção item não adicionado !',
        time: 5000,
    });
}

function calcularValorBoleto() {
    return (document.getElementById('preco').innerHTML / 100 * 85).toFixed(2);
}

