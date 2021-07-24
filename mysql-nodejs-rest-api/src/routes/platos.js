const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET all Platos
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM plato', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET An Plato
router.get('/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM plato WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An Plato
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM plato WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'plato Eliminado Correctamente'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An Plato
router.post('/', (req, res) => {
  const {id, nombreplato, descripcion, precio} = req.body;
  console.log(id, nombreplato, descripcion, precio);
  const query = `
    SET @id = ?;
    SET @nombreplato = ?;
    SET @descripcion = ?;
    SET @precio = ?;
    CALL platoAddOrEdit(@id, @nombreplato, @descripcion, @precio);
  `;
  mysqlConnection.query(query, [id, nombreplato, descripcion, precio], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Plato guardado correctamente'});
    } else {
      console.log(err);
    }
  });

});

router.put('/:id', (req, res) => {
  const { nombreplato, descripcion, precio } = req.body;
  const { id } = req.params;
  const query = `
  SET @id = ?;
  SET @nombreplato = ?;
  SET @descripcion = ?;
  SET @precio = ?;
  CALL platoAddOrEdit(@id, @nombreplato, @descripcion, @precio);
  `;
  mysqlConnection.query(query, [id, nombreplato, descripcion, precio], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'El plato se ha actualizado correctamente'});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
