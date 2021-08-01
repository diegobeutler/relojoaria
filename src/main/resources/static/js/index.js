window.onload = initPage;
function initPage(){
    const href= window.location.href;
    if(href.indexOf("aneis") > -1) document.getElementById('categoria').value = 'aneis';
    else if(href.indexOf("relogios") > -1) document.getElementById('categoria').value = 'relogios';
    else document.getElementById('categoria').value = 'todos';
}

$(document).ready(() => {

    // const alertNaoAutenticado = document.getElementById('alertNaoAutenticado');
    // if (!hasAuthentication()) {
    //     alertNaoAutenticado.hidden = false;
    // } else {
    //     alertNaoAutenticado.hidden = true;
    // }
    // if(getStorage('isLogin')){
    //     addMensagem({
    //         messageType: 'alert-success',
    //         message: 'Usuário logado com sucesso !',
    //         time: 8000,
    //         callback: setStorage('isLogin', false)
    //     });
    // }
    //
    // if(getStorage('isEdit')){
    //     addMensagem({
    //         messageType: 'alert-success',
    //         message: 'Usuário atualizado com sucesso !',
    //         time: 8000,
    //         callback: setStorage('isEdit', false)
    //     });
    // }
    setImagens();
    setBotoesAdicionar();
});

function setImagens() {
    // Relógios
    setImage({
        numImg: 1,
        cat: 'relogios',
        over: 'images/relogios/over/1.jpg',
        out: 'images/relogios/out/1.jpg'
    });
    setImage({
        numImg: 2,
        cat:'relogios',
        over: 'images/relogios/over/2.jpg',
        out: 'images/relogios/out/2.jpg'
    });
    setImage({
        numImg: 3,
        cat:'relogios',
        over: 'images/relogios/over/3.jpg',
        out: 'images/relogios/out/3.jpg'
    });
    setImage({
        numImg: 4,
        cat:'relogios',
        over: 'images/relogios/over/4.jpg',
        out: 'images/relogios/out/4.jpg'
    });
    // Anéis
    setImage({
        numImg: 1,
        cat:'aneis',
        over: 'images/aneis/over/1.jpg',
        out: 'images/aneis/out/1.jpg'
    });
    setImage({
        numImg: 2,
        cat:'aneis',
        over: 'images/aneis/over/2.jpg',
        out: 'images/aneis/out/2.jpg'
    });
    setImage({
        numImg: 3,
        cat:'aneis',
        over: 'images/aneis/over/3.jpg',
        out: 'images/aneis/out/3.jpg'
    });
    setImage({
        numImg: 4,
        cat:'aneis',
        over: 'images/aneis/over/4.jpg',
        out: 'images/aneis/out/4.jpg'
    });
}

function setImage({numImg, cat, over, out}) {
    const img = document.getElementById('img' + cat+numImg);

    img.addEventListener('mouseover', () => {
        img.src = over;
    });
    img.addEventListener('mouseout', () => {
        img.src = out;
    });
}

function setBotoesAdicionar() {
    var produtos = getArrayStorage('produtos');
    for (let i = 0; i < 8; i++) {
        const element = document.getElementById('titulo' + (i + 1));
        const index = produtos.findIndex(prod => prod.titulo == element.innerHTML);
        const btnAdicionar = document.getElementById('adicionar' + (i + 1));
        if (index != -1) {
            btnAdicionar.innerHTML = btnAdicionar.innerHTML.replace('Adicionar', 'Remover');
        }
    }
}

function filtrar() {
     categoria = document.getElementById('categoria').value;
    window.location.href = '/'+categoria;
}