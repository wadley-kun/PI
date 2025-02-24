<?php
header("Content-Type: application/json");

// Obtém os dados JSON enviados via POST
$dados = json_decode(file_get_contents("php://input"), true);

if (!$dados) {
    echo json_encode(["sucesso" => false, "mensagem" => "Dados inválidos."]);
    exit;
}

// Define o nome do arquivo onde os dados serão salvos
$arquivo = 'pedidos.json';

// Verifica se o arquivo já existe e lê seu conteúdo
if (file_exists($arquivo)) {
    $conteudo = file_get_contents($arquivo);
    $pedidos = json_decode($conteudo, true);
    // Garante que o conteúdo seja um array
    if (!is_array($pedidos)) {
        $pedidos = [];
    }
} else {
    $pedidos = [];
}

// Gera um ID numérico sequencial baseado no último pedido
$novoId = count($pedidos) > 0 ? end($pedidos)["id"] + 1 : 1;

// Reorganiza o array para que o ID fique no início
$pedidoFormatado = ["id" => $novoId] + $dados;

// Adiciona os novos dados (pedido) ao array
$pedidos[] = $pedidoFormatado;

// Salva o array atualizado de volta no arquivo com formatação
if (file_put_contents($arquivo, json_encode($pedidos, JSON_PRETTY_PRINT))) {
    echo json_encode(["sucesso" => true, "mensagem" => "Pedido recebido e salvo.", "id" => $novoId]);
} else {
    echo json_encode(["sucesso" => false, "mensagem" => "Erro ao salvar o pedido."]);
}
?>
