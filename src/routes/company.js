const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database.js');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

// GET all
router.get('/company', (req, res) => {
  mysqlConnection.query('select SHA1(id) as id, name,phone1,phone2,address,latitude,longitude from company', (err, rows, fields) => {
    if (err) throw err;
    res.json({
      'status': 'ok',
      'totalResults': rows.length,
      'data': rows
    });
  });
});

// GET An Company
router.get('/company/:id', [
  check('id', "you must enter a value for the id field", ).exists(),
  check('id', "id it must be numeric", ).matches(/\d/),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  const { id } = req.params;
  mysqlConnection.query('select SHA1(id) as id, name,phone1,phone2,address,latitude,longitude from company where id = ?', [id], (err, rows, fields) => {
    if (err) throw err;

    res.json({
      'status': 'ok',
      'totalResults': rows.length,
      'data': rows
    });
  });
});


//DELETE
router.delete('/company/:id', (req, res) => {
  return res.status(405).json({
    'status': 'error',
    'message': "Method is not defined",
  });
});

//PUT
router.put('/company/:id', (req, res) => {
  return res.status(405).json({
    'status': 'error',
    'message': "Method is not defined",
  });
});

//PATCH
router.patch('/company/:id', (req, res) => {
  return res.status(405).json({
    'status': 'error',
    'message': "Method is not defined",
  });
});

//POST
router.post('/company', (req, res) => {
  return res.status(405).json({
    'status': 'error',
    'message': "Method is not defined",
  });
});

// DELETE An Company
/*
router.delete('/company/:id',[
  check('id', "you must enter a value for the id field", ).exists(),
  check('id', "id it must be numeric", ).matches(/\d/),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }
  const { id } = req.params;

  mysqlConnection.query('DELETE FROM company WHERE id = ?', [id], (err, rows, fields) => {
    if (err) throw err;

    res.json({
      'status': 'ok',
      'totalResults': rows.affectedRows
    });
  });
});
*/

module.exports = router;
