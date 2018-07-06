const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database.js');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

// GET all Users
router.get('/user', (req, res) => {
  mysqlConnection.query('select SHA1(user_id) as id, first_name,last_name,google_account,facebook_account from user', (err, rows, fields) => {
    if (err) throw err;
    res.json({
      'status': 'ok',
      'totalResults': rows.length,
      'data': rows
    });
  });
});

// GET An User
router.get('/user/:id', [
  check('id', "you must enter a value for the id field", ).exists(),
  check('id', "id it must be numeric", ).matches(/\d/),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  const { id } = req.params;
  mysqlConnection.query('select SHA1(user_id) as id, first_name,last_name,google_account,facebook_account from user WHERE user_id = ?', [id], (err, rows, fields) => {
    if (err) throw err;
    res.json({
      'status': 'ok',
      'totalResults': rows.length,
      'data': rows
    });
  });
});

//PUT
router.put('/user/:id', (req, res) => {
  return res.status(405).json({
    'status': 'error',
    'message': "Method is not defined",
  });
});

//PATCH
router.patch('/user/:id', (req, res) => {
  return res.status(405).json({
    'status': 'error',
    'message': "Method is not defined",
  });
});

//POST
router.post('/user', (req, res) => {
  return res.status(405).json({
    'status': 'error',
    'message': "Method is not defined",
  });
});


module.exports = router;
