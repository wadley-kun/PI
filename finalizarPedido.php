<?php


header('Content-Type: application/json');

// Verifica se a requisição é POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtém o conteúdo JSON enviado pelo cliente
    $json = file_get_contents('php://input');
    $carrinho = json_decode($json, true);

    // Verifica se o carrinho não está vazio
    if (!empty($carrinho)) {
        

        
        echo json_encode(['sucesso' => $sucesso]);
    } else {
        
        echo json_encode(['sucesso' => false, 'mensagem' => 'Carrinho vazio.']);
    }
} else {
    // Retorna uma resposta de erro para métodos que não são POST
    echo json_encode(['sucesso' => false, 'mensagem' => 'Método não permitido.']);
}
?>