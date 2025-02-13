document.addEventListener("DOMContentLoaded", () => {
    const cardapioContainer = document.getElementById("Cardapio_doces");
    const carrinhoContainer = document.getElementById("carrinho");
    const listaCarrinho = document.getElementById("listaCarrinho");
    const contadorCarrinho = document.getElementById("contadorCarrinho");
    const abrirCarrinho = document.getElementById("abrirCarrinho");
    const fecharCarrinho = document.getElementById("fecharCarrinho");
    const totalCarrinho = document.getElementById("totalCarrinho");

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const cardapio = [
        { nome: "Pizza de Catupiry (G)", preco: 34.99, imagem: "../recursos/img/Section_Carrossel/Recomendacoes/Pizza.png", descricao: "Deliciosa pizza de frango com catupiry, feita com ingredientes frescos e selecionados." },
        { nome: "Cachorro-Quente", preco: 8.99, imagem: "../recursos/img/Section_Carrossel/Recomendacoes/Cachorro-quente.png", descricao: "Cachorro-quente com salsicha, molho de tomate, milho, ervilha, batata palha e maionese." },
        { nome: "Hamburguer Gourmet", preco: 29.99, imagem: "../recursos/img/Section_Carrossel/Recomendacoes/Hamburguer.png", descricao: "Delicioso hamburguer gourmet com carne de primeira, queijo cheddar, alface..." },
        { nome: "Porção de Churrasco", preco: 27.99, imagem: "../recursos/img/Section_Carrossel/Recomendacoes/Porcao_churrasco.png", descricao: "Delicioso hamburguer gourmet com carne de primeira, queijo cheddar, alface..." },
        { nome: "Prato Feito de Churrasco", preco: 19.99, imagem: "../recursos/img/Section_Carrossel/Recomendacoes/Prato_feito.png", descricao: "Delicioso prato feito de churrasco com carne de primeira, arroz, feijão, farofa e salada." }
    ];

    function carregarCardapio() {
        cardapio.forEach((item, index) => {
            const card = document.createElement("div");
            card.classList.add("item");

            card.innerHTML = `
                <img src="${item.imagem}" alt="${item.nome}">
                <h3>${item.nome}</h3>
                <p>${item.descricao}</p>
                <span class="preco">R$ ${item.preco.toFixed(2)}</span>
                <button onclick="adicionarAoCarrinho(${index})">Comprar</button>
            `;

            cardapioContainer.appendChild(card);
        });
    }

    window.adicionarAoCarrinho = function (index) {
        const item = cardapio[index];
        carrinho.push(item);
        atualizarCarrinho();
    };

    function removerDoCarrinho(index) {
        carrinho.splice(index, 1);
        atualizarCarrinho();
    }

    function atualizarCarrinho() {
        listaCarrinho.innerHTML = "";
        let total = 0;

        carrinho.forEach((item, index) => {
            const li = document.createElement("li");
            li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
            total += item.preco;

            const btnRemover = document.createElement("button");
            btnRemover.textContent = "Remover";
            btnRemover.style.marginLeft = "10px";
            btnRemover.onclick = () => removerDoCarrinho(index);

            li.appendChild(btnRemover);
            listaCarrinho.appendChild(li);
        });

        totalCarrinho.textContent = `Total: R$ ${total.toFixed(2)}`;
        contadorCarrinho.textContent = carrinho.length;

        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }

    abrirCarrinho.addEventListener("click", () => {
        carrinhoContainer.classList.add("ativo");
    });

    fecharCarrinho.addEventListener("click", () => {
        carrinhoContainer.classList.remove("ativo");
    });

    carregarCardapio();
    atualizarCarrinho();
});
