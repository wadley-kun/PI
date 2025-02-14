document.addEventListener("DOMContentLoaded", () => {
    const carrinhoContainer = document.getElementById("carrinho");
    const carrinhoContent = document.getElementById("carrinhoContent");
    const carrinhoImagem = document.getElementById("carrinhoImagem");
    const tituloCarrinho = document.getElementById("tituloCarrinho");
    const descricaoCarrinho = document.getElementById("descricaoCarrinho");
    const totalCarrinho = document.getElementById("totalCarrinho");

    const listaCarrinho = document.getElementById("listaCarrinho");
    const contadorCarrinho = document.getElementById("contadorCarrinho");
    const abrirCarrinho = document.getElementById("abrirCarrinho");
    const fecharCarrinho = document.getElementById("fecharCarrinho");
   
    
    

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const cardapio = [
        { nome: "Pizza de Catupiry (G)", preco: 34.99, imagem: "../recursos/img/Section_Carrossel/Recomendacoes/Pizza.png", descricao: "Deliciosa pizza de frango com catupiry, feita com ingredientes frescos e selecionados." },
        { nome: "Cachorro-Quente", preco: 8.99, imagem: "../recursos/img/Section_Carrossel/Recomendacoes/Cachorro-quente.png", descricao: "Cachorro-quente com salsicha, molho de tomate, milho, ervilha, batata palha e maionese." },
        { nome: "Hamburguer Gourmet", preco: 29.99, imagem: "../recursos/img/Section_Carrossel/Recomendacoes/Hamburguer.png", descricao: "Delicioso hamburguer gourmet com carne de primeira, queijo cheddar, alface..." },
        { nome: "Porção de Churrasco", preco: 27.99, imagem: "../recursos/img/Section_Carrossel/Recomendacoes/Porcao_Churrasco.png", descricao: "Deliciosa porção de churrasco com carne de primeira, linguiça, frango e pão de alho." },
        { nome: "Prato Feito de Churrasco", preco: 19.99, imagem: "../recursos/img/Section_Carrossel/Recomendacoes/Prato_Churrasco.png", descricao: "Delicioso prato feito de churrasco com carne de primeira, arroz, feijão, farofa e salada." }
    ];

    

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
            const titulo = document.createElement("h3");
            const descricao = document.createElement("p");
            const imagem = document.createElement("img");
            const preco = document.createElement("p");
            titulo.textContent = item.nome;
            descricao.textContent = item.descricao;
            imagem.src = item.imagem;
            imagem.style.width = "100px";
            preco.textContent = `R$ ${item.preco.toFixed(2)}`;
            total += item.preco;

            const btnRemover = document.createElement("button");
            btnRemover.textContent = "Remover";
            btnRemover.style.marginLeft = "10px";
            btnRemover.onclick = () => removerDoCarrinho(index);

            titulo.appendChild(btnRemover);
            listaCarrinho.appendChild(carrinhoImagem);
            listaCarrinho.appendChild(titulo);
            listaCarrinho.appendChild(descricao);
            listaCarrinho.appendChild(preco);
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
