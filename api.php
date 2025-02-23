<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Permite requisições de qualquer origem

$mysqli = new mysqli("localhost", "root", "", "restaurante_lulu");

if ($mysqli->connect_error) {
    die("Erro na conexão: " . $mysqli->connect_error);
}

$result = $mysqli->query("SELECT id, nome_item, descricao, preco, imagem FROM cardapio");

$cardapio = [];

while ($row = $result->fetch_assoc()) {
    $cardapio[] = [
        "id" => $row["id"],
        "nome" => $row["nome_item"],   // Renomeando para "nome"
        "descricao" => $row["descricao"],
        "preco" => (float) $row["preco"],  // Garantindo que seja um número
        "imagem" => $row["imagem"]
    ];
}

echo json_encode($cardapio, JSON_UNESCAPED_UNICODE);
?>
