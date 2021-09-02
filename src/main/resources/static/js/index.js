window.onload = initPage;

function initPage() {
    const href = window.location.href;
    if (href.indexOf("aneis") > -1) document.getElementById('categoria').value = 'aneis';
    else if (href.indexOf("relogios") > -1) document.getElementById('categoria').value = 'relogios';
    else document.getElementById('categoria').value = '';
    setImagens();
    verificarSeEhLogin();
}

function verificarSeEhLogin() {
    if (getStorage('isLogin')) {
        addMensagem({
            messageType: 'alert-success',
            message: 'Usuário logado com sucesso !',
            time: 8000,
            callback: setStorage('isLogin', false)
        });
    }

    if (getStorage('isEdit')) {// seria para quando editado o perfil do usuario, mas acbaei não terminando
        addMensagem({
            messageType: 'alert-success',
            message: 'Usuário atualizado com sucesso !',
            time: 8000,
            callback: setStorage('isEdit', false)
        });
    }
}

function setImagens() {
    for (i = 0; i <4; i++) {
        setImage({
            numImg: i + 1,
            cat: 'relogios'
        });
        setImage({
            numImg: i + 1,
            cat: 'aneis'
        });
    }
}

function setImage({numImg, cat}) {
    const over = 'images/' + cat + '/over/' + numImg + '.jpg';
    const out = 'images/' + cat + '/out/' + numImg + '.jpg';
    if ($("#img" + cat + numImg).length) {
        const img = document.getElementById('img' + cat + numImg);

        img.addEventListener('mouseover', () => {
            img.src = over;
        });
        img.addEventListener('mouseout', () => {
            img.src = out;
        });
    }
}

function filtrar() {
    categoria = document.getElementById('categoria').value;
    window.location.href = '/' + categoria;
}