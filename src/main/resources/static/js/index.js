$(document).ready(() => {
    const alertNaoAutenticado = document.getElementById('alertNaoAutenticado');
    if (!hasAuthentication()) {
        alertNaoAutenticado.hidden = false;
    } else {
        alertNaoAutenticado.hidden = true;
    }
    if(getStorage('isLogin')){
        addMensagem({
            messageType: 'alert-success',
            message: 'Usuário logado com sucesso !',
            time: 8000,
            callback: setStorage('isLogin', false)
        });
    }

    if(getStorage('isEdit')){
        addMensagem({
            messageType: 'alert-success',
            message: 'Usuário atualizado com sucesso !',
            time: 8000,
            callback: setStorage('isEdit', false)
        });
    }
    setImagens();
    setBotoesAdicionar();
});

function setImagens() {
    // Relógios
    setImage({
        numImg: 1,
        over: 'https://cdn.shopify.com/s/files/1/0507/7427/8332/products/H16949902cb77405897fbe629195675398_600x.jpg?v=1618863938',
        out: 'https://cdn.shopify.com/s/files/1/0267/4425/8739/products/Ha87afbe4728e420f8930a320d81c7d7bh_7d41c96a-d684-498e-8695-bfdf4e0f2518_500x.jpg?v=1608518135'
    });
    setImage({
        numImg: 2,
        over: 'https://img.bestdealplus.com/ae01/kf/H3d1fa98d64d347ec86cbe06df364f7b3Q/NIBOSI-Wheel-Rim-Hub-Watch-Custom-Design-Sport-Car-Rim-Watches-Waterproof-Creative-Relogio-Masculino-2020.jpg',
        out: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8fmOvZ2TsVAwC7wvWq5uPe2jHHLZogotjvMopKRPbAMeXAfaJrbQ4zvUB-Q&usqp=CAc'
    });
    setImage({
        numImg: 3,
        over: 'https://ae01.alicdn.com/kf/Hdc5b1ec3fc9c4ea4a09ce3ac3b428088e/Sanda-topo-rel-gios-de-luxo-dos-homens-do-ex-rcito-militar-rel-gio-masculino-prova.jpg_Q90.jpg_.webp',
        out: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRNXZvXv8jTcjSzx1bGO9tQs72xCqyLh9LJF3JJ8w_C-HIcLUvfC-yKlccahlqzIdvw1t9aqXxm488ItBzTjf19GllIDs0y_s-wQQQef52s&usqp=CAE'
    });
    setImage({
        numImg: 4,
        over: 'https://images-submarino.b2w.io/produtos/01/00/img/1577917/9/1577917948_1SZ.jpg',
        out: 'https://images-submarino.b2w.io/produtos/01/00/img/1577917/9/1577917948_6SZ.jpg'
    });
    // Anéis
    setImage({
        numImg: 5,
        over: 'img/anel1.png',
        out: 'https://images.vivara.com.br/Stores/Produtos/AN00050651-2.jpg'
    });
    setImage({
        numImg: 6,
        over: 'img/anel2.jpg',
        out: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT-4uqSV2hkpJ7n_PsDjb0vDg3IUEJrEPvg6kd4X2pUJtPKmoB6OsPQJNzRI-lUNIF5fJEbKS4uxPPSZz9CmoLMFwmjkGa5HmfShU7wLR1R_ijJfuthhMYFRQ&usqp=CAE'
    });
    setImage({
        numImg: 7,
        over: 'https://cdn.spiritshop.com.br/lincolnjoias/image/cache/data/up_system/product-2287/SOL1695b-600x600.jpg',
        out: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQNfEfYWwPrFrmCeSWig0qRmm832bANNHSMuAAMNTuJFVOVHPNd8-Ptr52FiK5UosEUoVZZlLhCaUr9t6GMgN9v-04kj4kd2Q&usqp=CAY'
    });
    setImage({
        numImg: 8,
        over: 'https://a-static.mlcdn.com.br/618x463/anel-formatura-administracao-e-marketing-ouro-18k-zirconias-cod-11047-retran-joias/retranjoias2/11047-18/135963e80abcf79bdeaa40cec9259e11.jpg',
        out: 'https://img.irroba.com.br/filters:fill(fff):quality(95)/rdjjoias/catalog/loja/1600264897.jpg'
    });
}

function setImage({numImg, over, out}) {
    const img = document.getElementById('img' + numImg);
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
