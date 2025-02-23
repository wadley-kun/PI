<?php
header("Content-Type: application/json");


// Conexão com o banco de dados
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "restaurante_lulu";

// Cria a conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Verifica se o formulário foi enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Tratamento dos dados do formulário
    $nome = $conn->real_escape_string($data['nome']);
    $email = $conn->real_escape_string($data['email']);
    $endereco = $conn->real_escape_string($data['endereco']);
    $cep = $conn->real_escape_string($data['cep']);
    $telefone = $conn->real_escape_string($data['telefone']);
    $observacoes = $conn->real_escape_string($data['observacoes']);
    $datapedido = date("d/m/Y H:i");

    // Verifica se o cliente já está cadastrado
    $sql = "SELECT * FROM cliente WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo json_encode(["status" => "success", "message" => "Cliente já cadastrado!"]);
    } else {
        // Insere os dados do cliente no banco de dados
        $sql = "INSERT INTO cliente (nome, cep, telefone, email, endereco) VALUES ('$nome', '$cep', '$telefone', '$email', '$endereco')";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["status" => "success", "message" => "Cliente cadastrado com sucesso!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Erro ao cadastrar cliente: " . $conn->error]);
        }
    }

}

// Fecha a conexão
$conn->close();
?>