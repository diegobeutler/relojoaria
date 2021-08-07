const btnCadastrar = document.querySelector('#cadastrar');

btnCadastrar.addEventListener('click', (e) => {
    e.preventDefault();
    setUsuario();
});

function setUsuario() {
    let usuario = getUsuarioForm('#formCadastroUsuario');
    let erros = validarUsuario(usuario);
    if (erros.length > 0) {
        addMensagem({messageType:'alert-danger',message:'Usuário não salvo, possui erros no preenchimento dos campos',time: 6000});
        exibirMsgErro(erros);
    } else {
        let ul = document.querySelector('#listaErros');
        ul.innerHTML = '';
        addUsuario(usuario);
        setUsuarioLogadoStorage(usuario);
        setStorage('isLogin', true);
        window.location.href = window.location.href.replace('cadastroUsuario', 'index');
    }
}

function addUsuario(usuario) {
    let usuarios = getArrayStorage('usuarios');
    usuarios.push(usuario);
    setArrayStorage('usuarios', usuarios);
}
$(() => {
    $('#cep').mask("99999-999", {placeholder: " "});
})

