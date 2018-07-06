const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database.js');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

// GET
router.get('/auth', (req, res) => {
  return res.status(405).json({
    'status': 'error',
    'message': "Method is not defined",
  });
});

//POST new auth
router.post('/auth', [
  check('username', "you must enter a value for the username field.", ).exists(),
  check('username', "username does not comply with the format.", ).matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
  check('password', "you must enter a value for the password field.", ).exists()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }
  const { username,password } = req.body;
  mysqlConnection.query('select concat(u.first_name," ",u.last_name) as display_name from user u where UPPER(u.username)=UPPER(?) and UPPER(u.password)=UPPER(?)',[username,password],
    (err, rows, fields) => {
      if (err) throw err;
      res.json({
        'status': 'ok',
        'totalResults': rows.length,
        'assignments': rows
      }).status(200);
    });
});
//PUT
router.put('/auth/:id', (req, res) => {
  return res.status(405).json({
    'status': 'error',
    'message': "Method is not defined",
  });
});

//PATCH
router.patch('/auth/:id', (req, res) => {
  return res.status(405).json({
    'status': 'error',
    'message': "Method is not defined",
  });
});


module.exports = router;