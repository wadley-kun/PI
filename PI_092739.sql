create schema restautante_lulu;

create table cliente (
    id int primary key auto_increment,
    nome varchar(100) not null,
    cpf bigint(11) unique,
    end_rua varchar(30) not null,
    end_num int(6) unsigned,
    end_bairo varchar(50) not null,
    end_cep int(8) not null,
    telefone varchar(15) not null,
    email varchar(100) not null unique, 
    senha varchar(30) not null
);

create table cardapio (
    id int primary key auto_increment,
    nome_item varchar(100) not null,
    descricao longtext,
    preco decimal(10,2) not null
);

create table pedido (
    id int primary key auto_increment,
    id_cliente int,
    data_pedido varchar(10) not null,
    foreign key (id_cliente) references cliente(id)
);

create table pedido_item (
    id int primary key auto_increment,
    id_pedido int,
    id_cardapio int,
    quantidade int not null,
    preco_total decimal(10,2) not null,
    observacao varchar(200), 
    foreign key (id_pedido) references pedido(id),
    foreign key (id_cardapio) references cardapio(id)
    on update restrict
    on delete restrict
);

INSERT INTO cliente (nome, cpf, endereco, telefone, email, senha) VALUES
(1,'João Silva', 12345678900, 'Rua A, 123', '(11) 9999-8888', 'joao.silva@email.com', 'senha123'),
('Maria Santos', 98765432100, 'Avenida B, 456', '(21) 8888-7777', 'maria.santos@email.com', 'senhamaria'),
('Pedro Oliveira', 45612378900, 'Rua C, 789', '(31) 7777-6666', 'pedro.oliveira@email.com', 'senhapedro'),
('Ana Souza', 78945612300, 'Travessa D, 321', '(41) 6666-5555', 'ana.souza@email.com', 'senhaana'),
('Carlos Pereira', 65498732100, 'Av. Principal, 555', '(51) 5555-4444', 'carlos.pereira@email.com', 'senhacarlos'),
('Juliana Costa', 32165498700, 'Alameda E, 987', '(61) 4444-3333', 'juliana.costa@email.com', 'senhajuliana'),
('Fernando Almeida', 78932165400, 'Praça F, 654', '(71) 3333-2222', 'fernando.almeida@email.com', 'senhafernando'),
('Patrícia Lima', 98778932100, 'Estrada G, 147', '(81) 2222-1111', 'patricia.lima@email.com', 'senhapatricia'),
('Roberto Santos', 45678912300, 'Rua H, 369', '(91) 1111-0000', 'roberto.santos@email.com', 'senharoberto'),
('Camila Oliveira', 12378945600, 'Av. I, 258', '(01) 0000-9999', 'camila.oliveira@email.com', 'senhacamila');


select * from cliente;

INSERT INTO cardapio (nome_item, descricao, preco) VALUES
('Pizza Margherita', 'Pizza tradicional italiana com molho de tomate, queijo mozarela e manjericão fresco.', 29.90),
('Hambúrguer Clássico', 'Hambúrguer grelhado com queijo cheddar, alface, tomate e maionese especial.', 19.90),
('Salada Caesar', 'Salada clássica com alface romana, croutons, queijo parmesão e molho Caesar.', 15.50),
('Sushi Misto', 'Seleção de sushis variados: nigiri, sashimi e rolinhos.', 39.90),
('Frango à Parmegiana', 'Filé de frango empanado com molho de tomate e queijo derretido, acompanhado de arroz e batatas fritas.', 32.50),
('Lasanha Bolonhesa', 'Lasanha tradicional com camadas de massa, molho bolonhesa e queijo.', 27.80),
('Torta de Limão', 'Torta gelada de limão com massa crocante e cobertura de chantilly.', 12.75),
('Ceviche Peruano', 'Peixe branco marinado em limão, cebola roxa, coentro e pimenta, acompanhado de milho crocante.', 24.00),
('Risoto de Funghi', 'Risoto cremoso com cogumelos funghi, queijo parmesão e um toque de vinho branco.', 28.50),
('Mousse de Chocolate', 'Sobremesa cremosa de chocolate com raspas de chocolate amargo por cima.', 10.95);

select * from cardapio;