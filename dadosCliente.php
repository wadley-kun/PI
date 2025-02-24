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
    $cep = $_POST['cep'];
    $telefone = $_POST['telefone'];
    $email = $_POST['email'];
    $endereco = $_POST['endereco'];

    // Cria uma instância da classe Database
    $database = new Database();
    $conn = $database->getConnection();

    // Verifica se o e-mail já está cadastrado
    $query = "SELECT * FROM cliente WHERE email = :email";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row) {
        echo "E-mail já cadastrado.";
        exit;
    }

    // Prepara a consulta SQL de inserção
    $query = "INSERT INTO cliente (nome, cep, telefone, email, endereco) 
              VALUES (:nome, :cep, :telefone, :email, :endereco)";
    $stmt = $conn->prepare($query);

    // Vincula os parâmetros
    $stmt->bindParam(':nome', $nome);
    $stmt->bindParam(':cep', $cep);
    $stmt->bindParam(':telefone', $telefone);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':endereco', $endereco);

    // Executa a consulta
    if ($stmt->execute()) {
        echo "Dados inseridos com sucesso!";
    } else {
        echo "Erro ao inserir os dados.";
    }
}
?>
