USE restaurante;

DELIMITER $$
USE `restaurante`$$

CREATE PROCEDURE `platoAddOrEdit` (
  IN _id INT,
  IN _nombreplato VARCHAR(45),
  IN _descripcion VARCHAR(400),
  IN _precio INT
)
BEGIN 
  IF _id = 0 THEN
    INSERT INTO plato (nombreplato, descripcion, precio)
    VALUES (_nombreplato, _descripcion, _precio);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE plato
    SET
    nombreplato = _nombreplato,
    descripcion = _descripcion,
    precio = _precio
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END
