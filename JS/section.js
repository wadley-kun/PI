document.addEventListener("DOMContentLoaded", async () => {
    const listaCarrinho = document.getElementById("listaCarrinho");
    const totalCarrinho = document.getElementById("totalCarrinho");
    const contadorCarrinho = document.getElementById("contadorCarrinho");
    const botaoFinalizar = document.getElementById("botaoFinalizar");

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let cardapio = [];

    async function carregarCardapio() {
        try {
            const response = await fetch("api.php");
            if (!response.ok) throw new Error("Erro ao buscar cardápio.");
            cardapio = await response.json();
        } catch (error) {
            console.error("Erro ao carregar cardápio:", error);
        }
    }

    function adicionarAoCarrinho(index) {
        const item = cardapio[index];
        if (item) {
            carrinho.push(item);
            atualizarCarrinho();
        }
    }

    function removerDoCarrinho(index) {
        carrinho.splice(index, 1);
        atualizarCarrinho();
    }

    function atualizarCarrinho() {
        listaCarrinho.innerHTML = "";
        let total = carrinho.reduce((acc, item) => acc + Number(item.preco), 0);

        carrinho.forEach((item, index) => {
            const itemContainer = document.createElement("div");
            itemContainer.classList.add("carrinho-item");
            itemContainer.innerHTML = `
                <div class="d-flex align-items-center mb-2">
                    <img src="${item.imagem}" alt="${item.nome}" class="me-2" width="100" height="100" style="border-radius: 5px;">
                    <div class="flex-grow-1">
                        <h6 class="mb-0">${item.nome}</h6>
                        <p class="mb-0 text-muted">${item.descricao}</p>
                        <p class="mb-0 text-muted">R$ ${Number(item.preco).toFixed(2)}</p>
                        <button class="btn btn-sm btn-danger btn-remover" data-index="${index}">Remover</button>
                    </div>
                </div>
            `;
            listaCarrinho.appendChild(itemContainer);
        });

        totalCarrinho.innerHTML = `<strong>Total:</strong> R$ ${total.toFixed(2)}`;
        contadorCarrinho.textContent = carrinho.length;
        localStorage.setItem("carrinho", JSON.stringify(carrinho));

        document.querySelectorAll(".btn-remover").forEach(button => {
            button.addEventListener("click", event => {
                const index = parseInt(event.target.getAttribute("data-index"));
                removerDoCarrinho(index);
            });
        });
    }

    async function finalizarPedido() {
        if (carrinho.length === 0) {
            alert("O carrinho está vazio. Adicione itens antes de finalizar o pedido.");
            return;
        }

        const dadosCliente = {
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            endereco: document.getElementById("endereco").value,
            cep: document.getElementById("cep").value,
            telefone: document.getElementById("telefone").value,
            pagamento: document.getElementById("pagamento").value,
            troco: document.getElementById("troco").value,
            observacoes: document.getElementById("observacoes").value,
            carrinho
        };

        try {
            const response = await fetch("itemPedido.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dadosCliente)
            });

            const resultado = await response.json();

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

    botaoFinalizar.addEventListener("click", finalizarPedido);

    await carregarCardapio();
    atualizarCarrinho();
    window.adicionarAoCarrinho = adicionarAoCarrinho; // Garante que a função é acessível globalmente
});
