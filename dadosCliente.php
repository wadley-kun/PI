<?php
class Database {
    private $host = 'localhost'; // ou o endereço do seu servidor de banco de dados
    private $db_name = 'restaurante_lulu';
    private $username = 'root';
    private $password = '';
    private $conn;

    // Método para obter a conexão com o banco de dados
    public function getConnection() {
        $this->conn = null;

        try {
            // Configura a conexão usando PDO
            $this->conn = new PDO(
                "mysql:host={$this->host};dbname={$this->db_name}",
                $this->username,
                $this->password
            );

            // Define o modo de erro do PDO para exceções
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $exception) {
            // Caso haja um erro, exibe a mensagem
            echo "Erro ao conectar: " . $exception->getMessage();
        }

        return $this->conn;
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtém os dados do formulário
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $telefone = $_POST['telefone'];

    // Cria uma instância da classe Database
    $database = new Database();
    $conn = $database->getConnection();

    // Prepara a consulta SQL de inserção
    $query = "INSERT INTO cliente (nome, email, telefone) VALUES ($nome, $email, $telefone)";
    $stmt = $conn->prepare($query);


    // Executa a consulta
    if ($stmt->execute()) {
        echo "Dados inseridos com sucesso!";
    } else {
        echo "Erro ao inserir os dados.";
    }
}
?>