CREATE DATABASE IF NOT EXISTS restaurante;

USE restaurante;

CREATE TABLE plato (
  id INT(11) NOT NULL AUTO_INCREMENT,
  nombreplato VARCHAR(45) DEFAULT NULL,
  descripcion VARCHAR(400) DEFAULT NULL,
  precio INT(11) DEFAULT NULL, 
  PRIMARY KEY(id)
);

DESCRIBE plato;

INSERT INTO plato values 
  (1, 'empanada ranchera','jamón,queso,maicitos,salchicha', 5000),
  (2, 'empanada hawaina','piña, jamón, queso', 3000),
  (3, 'empranda de queso','queso', 50000);

SELECT * FROM plato;
