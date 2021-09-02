const btnCadastrar = document.querySelector('#cadastrar');

btnCadastrar.addEventListener('click', (e) => {
    e.preventDefault();
    setUsuario();
});

function setUsuario() {
    let usuario = getUsuarioForm('#formCadastroUsuario');
    let erros = validarUsuario(usuario);
    if (erros != "") {
        addMensagem({
            messageType: 'alert-danger',
            message: 'Usuário não salvo, pois possui os erros: ' + erros,
            time: 6000
        });
    } else {
        $('#formCadastroUsuario').submit();
        setStorage('isLogin', true);
    }
}

