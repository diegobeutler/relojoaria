const btnEntrar = document.querySelector('#entrar');
var usuarioLogado;

btnEntrar.addEventListener('click', (e) => {
    e.preventDefault();
    logar();
});

function logar() {
    $('#formLogin').submit();
    setStorage('isLogin', true);
}

$(() => {
    $('#cpf').mask("999.999.999-99", {placeholder: " "});
    $("#telefone").mask("(99) 99999-9999", {autoclear: false});
    $("#cep").mask("99999-999", {autoclear: false});
})

