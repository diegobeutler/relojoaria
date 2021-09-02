INSERT INTO permissao (nome) values('ROLE_ADMIN');
INSERT INTO permissao (nome) values('ROLE_USER');
INSERT INTO usuario(nome, apelido, username, password, cpf, genero,data_nasc, telefone, cep, rua, bairro, cidade, estado, numero) VALUES ('Administrador','Admin','teste@teste.com','$2a$10$.PVIfB07x.SfMYTcToxL0.yxcLWU0GbS2NUO1W1QAvqMm/TsFhVem', '12061623985', 'Masculino','2021-01-01','46999991232','34234234','Rua Tapajós', 'centro', 'Pato Branco','PR','231');


INSERT INTO usuario_permissoes(usuario_id, permissoes_id) VALUES (1, 1);


-- ITENS --
-- Relógios
insert into ITEM (NOME, DESCRICAO, VALOR_ANTERIOR, VALOR, CATEGORIA_ITEM, IMAGEM) values ('Relógio Olevs masculino aço inoxidável','Movimento quartzo suíço. Vidro de safira, super resistente a riscos. Produto resistente a choques. Data automática. Pulseira com 25 cm de comprimento e 2 cm de largura',420.00,320.00, 'RELOGIOS', '1');
insert into ITEM (NOME, DESCRICAO, VALOR_ANTERIOR, VALOR, CATEGORIA_ITEM, IMAGEM) values ('NIBOSI Wheel Rim Hub Watch Custom','NIBOSI Novo relógio exclusivo com design personalizado masculino relógio esportivo à prova de água, aro de roda de carro, relógio de pulso de quartzo',700.00,580.00, 'RELOGIOS','2');
insert into ITEM (NOME, DESCRICAO, VALOR_ANTERIOR, VALOR, CATEGORIA_ITEM, IMAGEM) values ('Strong Shock Hardlex a prova de água','Strong Shock foi desenhado para aqueles que buscam o melhor em relógios com muita resistência, inspirado em modelos usados por grandes nomes mundialmente conhecidos.',1300.00,1040.00, 'RELOGIOS','3');
insert into ITEM (NOME, DESCRICAO, VALOR_ANTERIOR, VALOR, CATEGORIA_ITEM, IMAGEM) values ('Relógio masculino Minimalista GENEVA','Relógio masculino. Movimento quartzo, trabalhado em aço inoxidável e com vidro resistente a impactos, garantindo extrema qualidade e durabilidade do produto.',980.00,840.00, 'RELOGIOS','4');

-- Anéis
insert into ITEM (NOME, DESCRICAO, VALOR_ANTERIOR, VALOR, CATEGORIA_ITEM, IMAGEM) values ('Anel Prata Espinélios e Topázios London','A Liberdade e leveza dos pássaros na magnitude do céu inspira a criação desta coleção. Topázios azuis e espinélios negros transmitem estas sensações para as joias.',990.00, 880.00, 'ANEIS','1');
insert into ITEM (NOME, DESCRICAO, VALOR_ANTERIOR, VALOR, CATEGORIA_ITEM, IMAGEM) values ('League of Legends - Caçadores Eternos','Chegou a nova Moda League of Legends Kindred - Os Caçadores Eternos - Anéis de Jogos, Nunca Um Sem Os Outros, Anéis de Casal para LOL, Anéis de Amantes de Jogos.',250.00,100.00, 'ANEIS','2');
insert into ITEM (NOME, DESCRICAO, VALOR_ANTERIOR, VALOR, CATEGORIA_ITEM, IMAGEM) values ('Anel Solitário One & Only De Diamantes','Uma joia que é paixão entre as mulheres de todas a idades. Ele é símbolo de amor e sofisticação, ideal para presentear alguém especial, ou, por quê não, a si mesma?',4200.00, 3200.00, 'ANEIS','3');
insert into ITEM (NOME, DESCRICAO, VALOR_ANTERIOR, VALOR, CATEGORIA_ITEM, IMAGEM) values ('Anéis de formatura em ouro 18K + pedras','Anel de Formatura Fabricado em Ouro 18k com brilhantes e Pedra Natural. A cor azul simboliza diversos cursos. Uma joia perfeita para simbolizar esse rito de passagem.',1700.00, 1100.00, 'ANEIS','4');
