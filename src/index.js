const express = require('express');
const expressValidator = require('express-validator');
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());
app.use(expressValidator())
// Routes
app.use(require('./routes/user'))
app.use(require('./routes/assignments'));
app.use(require('./routes/auth'));
app.use(require('./routes/company'));

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
