document.addEventListener("DOMContentLoaded", async () => {
    const listaCarrinho = document.getElementById("listaCarrinho");
    const totalCarrinho = document.getElementById("totalCarrinho");
    const contadorCarrinho = document.getElementById("contadorCarrinho");

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let cardapio = [];

    async function carregarCardapio() {
        try {
            const response = await fetch("api.php");
            cardapio = await response.json();
        } catch (error) {
            console.error("Erro ao buscar cardápio:", error);
        }
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
            const itemContainer = document.createElement("div");
            itemContainer.classList.add("carrinho-item");

            itemContainer.innerHTML = `
                <div class="d-flex align-items-center mb-2">
                    <img src="${item.imagem}" alt="${item.nome}" class="me-2" width="100" height="100" style="border-radius: 5px;">
                    <div class="flex-grow-1">
                        <h6 name="${index}" class="mb-0">${item.nome}</h6>
                        <p class="mb-0 text-muted">${item.descricao}</p>
                        <p class="mb-0 text-muted">R$ ${Number(item.preco).toFixed(2)}</p>
                        <button class="btn btn-sm btn-danger btn-remover" data-index="${index}">Remover</button>
                    </div>
                </div>
            `;

            listaCarrinho.appendChild(itemContainer);
            total += Number(item.preco);
        });

        totalCarrinho.innerHTML = `<span style="font-weight: 700;">Total:</span> R$ ${total.toFixed(2)}`;
        contadorCarrinho.textContent = carrinho.length;
        localStorage.setItem("carrinho", JSON.stringify(carrinho));

        // Adiciona evento para os botões de remover
        document.querySelectorAll(".btn-remover").forEach(button => {
            button.addEventListener("click", (event) => {
                const index = event.target.getAttribute("data-index");
                removerDoCarrinho(index);
            });
        });
    }

    async function finalizarPedido() {
        if (carrinho.length === 0) {
            alert("O carrinho está vazio. Adicione itens antes de finalizar o pedido.");
            return;
        }
    
        const dadosPedido = {
            carrinho: carrinho // Envia apenas os itens do carrinho
        };
    
        console.log("JSON enviado:", JSON.stringify(dadosPedido)); // Verifica se os dados são válidos
    
        try {
            const response = await fetch("itemPedido.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dadosPedido)
            });
    
            const respostaBruta = await response.text(); // Lê a resposta do servidor uma única vez
            console.log("Resposta bruta do servidor:", respostaBruta);
    
            const resultado = JSON.parse(respostaBruta); // Converte a string JSON em objeto
            console.log("Resposta JSON parseada:", resultado);
    
            if (resultado.sucesso) {
                alert("Pedido finalizado com sucesso!");
                carrinho = [];
                atualizarCarrinho();
            } else {
                alert("Erro ao finalizar o pedido: " + resultado.mensagem);
            }
        } catch (error) {
            console.error("Erro ao finalizar o pedido:", error);
            alert("Erro ao finalizar o pedido.");
        }
    }
    
    

    document.getElementById("botaoFinalizar").addEventListener("click", finalizarPedido);

    await carregarCardapio();
    atualizarCarrinho();
});