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
                // Pegando os dados do formulário
                const dadosPedido = {
                    nome: document.getElementById("nome").value,
                    endereco: document.getElementById("endereco").value,
                    cep: document.getElementById("cep").value,
                    telefone: document.getElementById("telefone").value,
                    pagamento: document.getElementById("pagamento").value,
                    troco: document.getElementById("troco").value,
                    observacoes: document.getElementById("observacoes").value,
                    Data: new Date().toLocaleDateString("pt-BR"), // Data do pedido
                    carrinho: carrinho
                };

                // Gerando a mensagem do WhatsApp
                let mensagem = `🍽 *Novo Pedido!* 🍽%0A%0A`;
                mensagem += `😍 *Data:* ${dadosPedido.Data}%0A`;
                mensagem += `👤 *Nome:* ${dadosPedido.nome}%0A`;
                mensagem += `📍 *Endereço:* ${dadosPedido.endereco}%0A`;
                mensagem += `📦 *CEP:* ${dadosPedido.cep}%0A`;

                if (dadosPedido.telefone.trim() !== "") {
                    mensagem += `📞 *Telefone:* ${dadosPedido.telefone}%0A`;
                }

                mensagem += `💳 *Forma de pagamento:* ${dadosPedido.pagamento}%0A`;

                if (dadosPedido.pagamento === "Dinheiro") {
                    mensagem += `💵 *Troco para:* R$ ${dadosPedido.troco}%0A`;
                }

                if (dadosPedido.observacoes.trim() !== "") {
                    mensagem += `📝 *Observações:* ${dadosPedido.observacoes}%0A`;
                }

                mensagem += `%0A🍔 *Itens do Pedido:*%0A`;

                let total = 0;
                dadosPedido.carrinho.forEach((item, index) => {
                    mensagem += `🛒 *${index + 1}.* ${item.nome} - R$ ${Number(item.preco).toFixed(2)}%0A`;
                    total += Number(item.preco);
                });

                mensagem += `✅ *Por favor, confirme meu pedido!*`;
            
                // Número do WhatsApp da loja (formato internacional: 55 + DDD + número)
                const numeroWhatsApp = "5527998032027"; // Substitua pelo número correto
                const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;
            
                // Redirecionar para o WhatsApp
                window.location.href = urlWhatsApp;
                carrinho = [];
                atualrCarrinho();
            } else {
                alert("Erro ao finalizar o pedido: " + resultado.mensagem);
            }
            } catch (error) {
                console.error("Erro ao finalizar o pedido:", error);
                alert("Erro ao finalizar o pedido.");
            }
    }
    botaoFinalizar.addEventListener("click", finalizarPedido);

    document.getElementById("meuFormulario").addEventListener("submit", async function(event) {
        event.preventDefault(); // Impede o redirecionamento padrão
    
        const formData = new FormData(this); // Pega os dados do formulário
    
        try {
            const response = await fetch(this.action, {
                method: this.method,
                body: formData
            });
    
            const resultado = await response.json(); // Resposta do PHP
    
            if (resultado.sucesso) {
                document.getElementById("mensagem").innerText = "Dados enviados com sucesso!";
            } else {
                document.getElementById("mensagem").innerText = "Erro ao enviar os dados.";
            }
        } catch (error) {
            console.error("Erro:", error);
            document.getElementById("mensagem").innerText = "Erro na conexão.";
        }
    });


    await carregarCardapio();
    atualizarCarrinho();
    window.adicionarAoCarrinho = adicionarAoCarrinho; // Garante que a função é acessível globalmente
});
