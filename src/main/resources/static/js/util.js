var arrayProdutosCarrinho = [];
var cont = 0;
var categoria;
$(document).ready(() => {
    setNumeroProdutos(getArrayStorage('itensCarrinho').length);

});

function validarCampoObrigatorio(campo) {
    if (campo != '') {
        return true;
    }
    return false;
}

function validarUsuario(usuario) {
    let erro = "";
    if (!validarCampoObrigatorio(usuario.nome)) {
        erro = erro + 'Campo nome inválido !\n';
    }
    if (!validarCampoObrigatorio(usuario.cpf)) {
        erro = erro + 'Campo cpf inválido !\n';
    }
    if (!validarCampoObrigatorio(usuario.dataNasc)) {
        erro = erro + 'Campo data nascimento inválido !\n';
    }
    if (!validarCampoObrigatorio(usuario.telefone)) {
        erro = erro + 'Campo telefone inválido !\n';
    }
    if (!validarCampoObrigatorio(usuario.cep)) {
        erro = erro + 'Campo CEP inválido !\n';
    }
    if (!validarCampoObrigatorio(usuario.cidade)) {
        erro = erro + 'Campo cidade inválido !';
    }
    if (!validarCampoObrigatorio(usuario.bairro)) {
        erro = erro + 'Campo bairro inválido !';
    }
    if (!validarCampoObrigatorio(usuario.rua)) {
        erro = erro + 'Campo rua inválido !';
    }
    if (!validarCampoObrigatorio(usuario.numero)) {
        erro = erro + 'Campo numero da casa inválido !';
    }
    if (!validarCampoObrigatorio(usuario.senha)) {
        erro = erro + 'Campo senha inválido !';
    }
    if (!validarCampoObrigatorio(usuario.confirmarSenha)) {
        erro = erro + 'Campo confirmação de senha inválido!';
    }
    if (!validarCampoObrigatorio(usuario.email)) {
        erro = erro + 'Campo email inválido !';
    }
    if (usuario.senha !== usuario.confirmarSenha) {
        erro = erro + 'Senhas não conferem !';
    }
    return erro;
}

function getArrayStorage(chave) {
    return JSON.parse(localStorage.getItem(chave)) || [];
}

function setUsuarioLogadoStorage(usuario = usuarioLogado) {
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
}

function setStorage(chave, value) {
    localStorage.setItem(chave, value);
}

function getStorage(chave) {
    return JSON.parse(localStorage.getItem(chave));
}

function getUsuarioForm(formParam) {
    let form = document.querySelector(formParam);
    let usuario = {
        nome: form.nome.value,
        apelido: form.apelido.value,
        genero: form.genero.value,
        cpf: form.cpf.value,
        dataNasc: form.dataNasc.value,
        telefone: form.telefone.value,
        cep: form.cep.value,
        cidade: form.cidade.value,
        estado: form.estado.value,
        bairro: form.bairro.value,
        rua: form.rua.value,
        numero: form.numero.value,
        email: form.username.value,
        senha: form.password.value,
        confirmarSenha: form.confirmarSenha.value
    }
    return usuario;
}

function hasAuthentication() {
    return getUsuarioLogadoStorage() !== null;
}

function showMessageAuthentication() {
    $("#alert").modal();
}

function voltaTelaInicial(paginaAtual) {
    window.location.href = window.location.href.replace(paginaAtual, '');
}

function navegaTelaLogin(paginaAtual) {
    window.location.href = window.location.href.replace(paginaAtual, 'login');
}

function setArrayStorage(chave, valor) {
    localStorage.setItem(chave, JSON.stringify(valor));
}

function numeroProdutos(flg) {
    cont = parseInt(document.getElementById("cont").innerHTML);
    cont = flg ? cont + 1 : cont > 0 ? cont - 1 : 0;
    document.getElementById("cont").innerHTML = cont;
}

function setNumeroProdutos(numeroProdutos) {
    document.getElementById("cont").innerHTML = numeroProdutos;
}

function addItemCarrinho() {
    const itemCarrinho = novoItemCarrinho();
    arrayProdutosCarrinho = getArrayStorage('itensCarrinho');
    addMensagem({
        messageType: 'alert-success',
        message: hasItemCarrinho ? 'Item atualizado com sucesso !' : 'Item adicionado com sucesso !',
        time: 5000,
    });
    if (hasItemCarrinho) {
        arrayProdutosCarrinho[indexItem] = itemCarrinho;
    } else {
        arrayProdutosCarrinho.push(itemCarrinho);
        hasItemCarrinho = true;
        setNumeroProdutos(arrayProdutosCarrinho.length);
    }
    setArrayStorage('itensCarrinho', arrayProdutosCarrinho);
}

function novoItemCarrinho() {
    const srcImagem = document.getElementById('imagemPrincipal');
    let produto = {
        idItem: $('#idItem').text(),
        titulo: $('#titulo').text(),
        descricao: $('#descricao').text(),
        preco: parseFloat($('#preco').text()).toFixed(2),
        srcImagem: srcImagem.getAttribute('src'),
        quantidade: $('#quantidade').val()
    }

    return produto;
}

function calcularFrete() {
    const isSedex = document.getElementById('sedex').checked;
    document.getElementById('valorFrete').innerHTML = isSedex ? 'Valor de envio: R$ 20.00' : 'Valor de envio: R$ 5.00';
    document.getElementById('precoFrete').innerHTML = isSedex ? '20.00' : '5.00';
    calculaTotal();
}

function calculaTotal() {
    const quantidade = document.getElementById('quantidade').value;
    const isBoleto = document.getElementById('boleto').checked;
    const isSedex = document.getElementById('sedex').checked;
    const valorEnvio = isSedex ? 20 : 5
    const valorUnit = isBoleto ? calcularValorBoleto() : document.getElementById('preco').innerHTML;

    let valorTotal = (valorUnit * quantidade) + valorEnvio;

    document.getElementById('total').innerHTML = valorTotal.toFixed(2);
}


function somar(num1, num2) {
    const val1 = num1 || 0;
    const val2 = num2 || 0;
    return Number(val1) + Number(val2);
}

function subtrair(num1, num2) {
    const val1 = num1 || 0;
    const val2 = num2 || 0;
    return Number(val1) - Number(val2);
}

function multiplicar(num1, num2) {
    const val1 = num1 || 0;
    const val2 = num2 || 0;
    return Number(val1) * Number(val2);
}

function buscar() {
    var query = $("#query").val().toString();
    const url = $('#buscarNav').attr('action') + "/" + query + "?";

    $.ajax({
        type: 'post',
        url: $('#buscarNav').attr('action'),
        contentType: 'application/json',
        data: query.toString(),
        success: function () {
            addMensagem({messageType: 'alert-success', message: 'Busca realizada com sucesso !', time: 3000})
        },
        error: function (data) {
            addMensagem({messageType: 'alert-danger', message: 'Erro na busca !', time: 3000})
        }
    }); //FIM ajax()
    return false;
}

function addMensagem({messageType, message, time, callback = null, classe = null}) {
    var callback = callback || function () {
    };
    const alert = document.getElementById('msg');
    if (alert.hidden) {
        alert.classList.add(messageType);
        alert.classList.add('font-weight-bold');
        if (classe) alert.classList.add(classe);
        alert.innerHTML = message + alert.innerHTML;
        alert.hidden = false;
        setTimeout(() => {
            alert.classList.remove(messageType);
            if (classe) alert.classList.remove(classe);
            alert.hidden = true;
            alert.innerHTML = alert.innerHTML.replace(message, '');
            callback();
        }, time);
    }
}






