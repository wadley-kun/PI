CREATE database restaurante_lulu;

create schema restautante_lulu;

use restaurante_lulu;

create table cliente (
    id int primary key auto_increment,
    nome varchar(100) not null,
    cep varchar(12),
    endereco varchar(255),
	telefone varchar(15) not null,
    email varchar(100) not null unique
    
);

create table cardapio (
    id int primary key auto_increment,
    nome_item varchar(100) not null,
    descricao longtext,
    preco decimal(10,2) not null,
    imagem MEDIUMBLOB
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

INSERT INTO cliente (id, nome, cpf, telefone, email, senha, endereco) VALUES
(1,'João Silva', 12345678900, 29.171-273,'(11) 9999-8888', 'joao.silva@email.com', 'senha123'),
(2,'Maria Santos', 98765432100, 29.171-274,'(21) 8888-7777', 'maria.santos@email.com', 'senhamaria'),
(3,'Pedro Oliveira', 45612378900, 29.171-275,'(31) 7777-6666', 'pedro.oliveira@email.com', 'senhapedro'),
(4,'Ana Souza', 78945612300, 29.171-276,'(41) 6666-5555', 'ana.souza@email.com', 'senhaana'),
(5,'Carlos Pereira', 65498732100, 29.171-277,'(51) 5555-4444', 'carlos.pereira@email.com', 'senhacarlos'),
(6,'Juliana Costa', 32165498700, 29.171-278,'(61) 4444-3333', 'juliana.costa@email.com', 'senhajuliana'),
(7,'Fernando Almeida', 78932165400, 29.171-279,'(71) 3333-2222', 'fernando.almeida@email.com', 'senhafernando'),
(8,'Patrícia Lima', 98778932100, 29.171-280,'(81) 2222-1111', 'patricia.lima@email.com', 'senhapatricia'),
(9,'Roberto Santos', 45678912300,  29.171-281,'(91) 1111-0000', 'roberto.santos@email.com', 'senharoberto'),
(10,'Camila Oliveira', 12378945600, 29.171-282,'(01) 0000-9999', 'camila.oliveira@email.com', 'senhacamila');


select * from cliente;

INSERT INTO cardapio (nome_item, descricao, preco, imagem) VALUES
('Pizza de Catupiry (G)', 'Deliciosa pizza de frango com catupiry, feita com ingredientes frescos e selecionados.', 34.99, 'recursos/img/Section_Carrossel/Recomendacoes/Pizza.png'),
('Cachorro-Quente', 'Cachorro-quente com salsicha, molho de tomate, milho, ervilha, batata palha e maionese.', 8.99, 'recursos/img/Section_Carrossel/Recomendacoes/Cachorro-quente.png'),
('Hamburguer Gourmet', 'Delicioso hamburguer gourmet com carne de primeira, queijo cheddar, alface...', 29.99, 'recursos/img/Section_Carrossel/Recomendacoes/Hamburguer.png'),
('Porção de Churrasco', 'Deliciosa porção de churrasco com carne de primeira, linguiça, frango e pão de alho.', 27.99, 'recursos/img/Section_Carrossel/Recomendacoes/Porcao_Churrasco.png'),
('Prato Feito de Churrasco', 'Delicioso prato feito de churrasco com carne de primeira, arroz, feijão, farofa e salada.', 19.99,  'recursos/img/Section_Carrossel/Recomendacoes/Prato_Churrasco.png');

INSERT INTO cardapio (nome_item, descricao, preco, imagem) VALUES  
('Ramen de Porco', 'Delicioso Ramen de Porco com ovos cozidos e um macarrão bem temperado.', 34.99, 'recursos/img/Section_Carrossel/Recomendacoes/Ramen1.png'),
('Ramen de Frango', 'Delicioso ramen de frango com macarrão, carne de frango, ovo, cebolinha e broto de feijão.', 35.99, 'recursos/img/Section_Carrossel/Recomendacoes/Ramen2.png'),
('Sushi', 'Delicioso sushi com arroz, salmão, cream cheese, cebolinha e gergelim.', 39.99, 'recursos/img/Section_Carrossel/Recomendacoes/Sushi.png'),
('Taco Mexicano', 'Delicioso Taco Mexicano com carne bem temperada e apimentada', 22.99, 'recursos/img/Section_Carrossel/Recomendacoes/Taco.png'),
('Taco Mexicano com porção',  'Delicioso Taco Mexicano com carne bem temperada e apimentada, acompanhado de porção...', 24.99, 'recursos/img/Section_Carrossel/Recomendacoes/Taco2.png');

select * from cardapio;

UPDATE `restaurante_lulu`.`cardapio` SET `imagem` = 'recursos/img/Section_Carrossel/Recomendacoes/Prato_Churrasco.png' WHERE (`id` = '5');