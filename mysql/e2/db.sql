CREATE DATABASE `pokeapi`;
DROP DATABASE pokeapi;

CREATE TABLE pokeapi.pokemons(
id INT(8) AUTO_INCREMENT PRIMARY KEY NOT NULL,
name VARCHAR(50) NOT NULL, 
typeId TINYINT(3) NOT NULL,
typeId2 TINYINT(3),
FOREIGN KEY (typeId) REFERENCES types(id),
FOREIGN KEY (typeId2) REFERENCES types(id)
);

CREATE TABLE pokeapi.types (
id TINYINT(3) NOT NULL PRIMARY KEY AUTO_INCREMENT,
type VARCHAR(50) NOT NULL
);

SELECT * FROM pokemons;
INSERT INTO types (type) VALUES ('eléctrico');
INSERT INTO pokemons (name, typeId, typeId2) VALUES ('pikachu', 1, 4);

SELECT * FROM pokemons INNER JOIN types ON pokemons.typeId2 = types.id OR pokemons.typeId = types.id;

SELECT COUNT(type) FROM types WHERE type = 'planta'