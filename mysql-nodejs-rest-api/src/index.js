const express = require('express');
const app = express();

const cors = require('cors')

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json()); // parsear json
app.use(cors()) // Use this after the variable declaration

// Routes
app.use(require('./routes/platos'));

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
