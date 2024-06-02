const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Servir archivos estáticos desde el directorio 'client'
app.use(express.static(path.join(__dirname, '../client')));

// Importar las rutas
const itemRoutes = require('./routes/items');
app.use('/api/items', itemRoutes);

// Ruta de fallback para servir index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
