const express = require('express');
const router = express.Router();
const Item = require('../models/item');

let items = [];

// Crear un nuevo ítem
router.post('/', (req, res) => {
  const { id, name } = req.body;
  const item = new Item(id, name);
  items.push(item);
  res.status(201).send(item);
});

// Obtener todos los ítems
router.get('/', (req, res) => {
  res.send(items);
});

// Obtener un ítem por ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const item = items.find(i => i.id === id);
  if (item) {
    res.send(item);
  } else {
    res.status(404).send({ message: 'Item no encontrado' });
  }
});

// Actualizar un ítem por ID
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  const index = items.findIndex(i => i.id === id);
  if (index !== -1) {
    items[index].name = name;
    res.send(items[index]);
  } else {
    res.status(404).send({ message: 'Item no encontrado' });
  }
});

// Eliminar un ítem por ID
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const index = items.findIndex(i => i.id === id);
  if (index !== -1) {
    const deletedItem = items.splice(index, 1);
    res.send(deletedItem[0]);
  } else {
    res.status(404).send({ message: 'Item no encontrado' });
  }
});

module.exports = router;
