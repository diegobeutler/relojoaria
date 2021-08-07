const btnAtualizar = document.querySelector('#atualizar');

btnAtualizar.addEventListener('click', (e) => {
    e.preventDefault();
    setUsuarioLogadoStorage(getUsuarioForm('#formPerfilUsuario', getUsuarioLogadoStorage().id));
    setStorage('isEdit', true);
    window.location.href = window.location.href.replace('perfil', 'index');
});

$(document).ready(() => {
    if (hasAuthentication()) {
        init();

        function init() {
            usuarioLogado = getUsuarioLogadoStorage();
            $('#nome').val(usuarioLogado.nome);
            $('#apelido').val(usuarioLogado.apelido);
            $('#genero').val(usuarioLogado.genero);
            $('#cpf').val(usuarioLogado.cpf);
            $('#dataNasc').val(usuarioLogado.dataNasc);
            $('#telefone').val(usuarioLogado.telefone);
            $('#cep').val(usuarioLogado.cep);
            $('#cidade').val(usuarioLogado.cidade);
            $('#estado').val(usuarioLogado.estado);
            $('#bairro').val(usuarioLogado.bairro);
            $('#rua').val(usuarioLogado.rua);
            $('#numero').val(usuarioLogado.numero);
            $('#email').val(usuarioLogado.email);
            $('#senha').val(usuarioLogado.senha);
            $('#confirmarSenha').val(usuarioLogado.confirmarSenha);
        }
    } else {
        showMessageAuthentication();
    }
});

$(() => {
    $('#cpf').mask("999.999.999-99", {placeholder: " "});
    $("#telefone").mask("(99)99999-9999", {autoclear: false});
    $("#cep").mask("99999-999", {autoclear: false});
})