<?php
header('Content-Type: application/json');

// Verifica se o cabeçalho da requisição indica JSON
if ($_SERVER['CONTENT_TYPE'] !== 'application/json') {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Requisição inválida. Esperado JSON.']);
    exit;

}

// Captura os dados recebidos
$dadosRecebidos = file_get_contents("php://input");

// Se os dados recebidos estiverem vazios, ignora a requisição
if (empty($dadosRecebidos)) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Nenhum dado recebido.']);
    exit;
}

// Salva no log para depuração
file_put_contents("debug_log.txt", "Recebido: " . $dadosRecebidos . PHP_EOL, FILE_APPEND);

// Tenta decodificar o JSON
$data = json_decode($dadosRecebidos, true);

// Verifica se houve erro na conversão do JSON
if (json_last_error() !== JSON_ERROR_NONE) {
    file_put_contents("debug_log.txt", "Erro JSON: " . json_last_error_msg() . PHP_EOL, FILE_APPEND);
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao decodificar JSON: ' . json_last_error_msg()]);
    exit;
}

// Se chegou até aqui, significa que o JSON foi interpretado corretamente

echo json_encode(['sucesso' => true, 'mensagem' => 'Pedido recebido com sucesso!']);
?>
