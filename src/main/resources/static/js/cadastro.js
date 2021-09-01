const btnCadastrar = document.querySelector('#cadastrar');

btnCadastrar.addEventListener('click', (e) => {
    e.preventDefault();
    setUsuario();
});

function setUsuario() {
    let usuario = getUsuarioForm('#formCadastroUsuario');
    let erros = validarUsuario(usuario);
    if (erros != "") {
        addMensagem({messageType:'alert-danger',message:'Usuário não salvo, pois possui os erros: ' +erros,time: 6000});
    } else {
        $('#formCadastroUsuario').submit();
        setStorage('isLogin', true);
        window.location.href = window.location.href.replace('/usuario/cadastro', '/login');
    }
}

// function addUsuario(usuario) {
//     let usuarios = getArrayStorage('usuarios');
//     usuarios.push(usuario);
//     setArrayStorage('usuarios', usuarios);
// }
$(() => {
    $('#cep').mask("99999-999", {placeholder: " "});
})

