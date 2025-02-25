<?php
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "restaurante_lulu";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["sucesso" => false, "mensagem" => "Falha na conexão com o banco de dados."]));
}

$dados = json_decode(file_get_contents("php://input"), true);
if (!$dados) {
    echo json_encode(["sucesso" => false, "mensagem" => "Dados inválidos."]);
    exit;
}

$nome = $dados['nome'];
$email = $dados['email'];
$endereco = $dados['endereco'];
$cep = $dados['cep'];
$telefone = $dados['telefone'];
$pagamento = $dados['pagamento'];
$troco = $dados['troco'];
$observacoes = $dados['observacoes'];
$carrinho = $dados['carrinho'];

// Verifica se o cliente já existe pelo email
$stmt = $conn->prepare("SELECT id FROM cliente WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $id_cliente = $row['id'];
} else {
    // Insere novo cliente
    $stmt = $conn->prepare("INSERT INTO cliente (nome, email, endereco, cep, telefone) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $nome, $email, $endereco, $cep, $telefone);
    if ($stmt->execute()) {
        $id_cliente = $stmt->insert_id;
    } else {
        echo json_encode(["sucesso" => false, "mensagem" => "Erro ao cadastrar cliente."]);
        exit;
    }
}

// Salvar pedido em pedidos.json
$pedido = [
    "id_cliente" => $id_cliente,
    "nome" => $nome,
    "email" => $email,
    "endereco" => $endereco,
    "cep" => $cep,
    "telefone" => $telefone,
    "pagamento" => $pagamento,
    "troco" => $troco,
    "observacoes" => $observacoes,
    "carrinho" => $carrinho
];

$arquivo_pedidos = "pedidos.json";
$pedidos = file_exists($arquivo_pedidos) ? json_decode(file_get_contents($arquivo_pedidos), true) : [];
$pedidos[] = $pedido;
file_put_contents($arquivo_pedidos, json_encode($pedidos, JSON_PRETTY_PRINT));

echo json_encode(["sucesso" => true, "mensagem" => "Pedido salvo com sucesso!"]);
$conn->close();
?>
