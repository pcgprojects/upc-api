const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database.js');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

// GET all Assignments
router.get('/assignment', (req, res) => {
  mysqlConnection.query('select SHA1(a.id) as id, c.name, a.`schedule_`, a.service_description,c.latitude,c.longitude, CASE WHEN a.state = 0 THEN "Pendiente" WHEN a.state = 1 THEN "Atendido" ELSE "Observado" END as state_des from company c inner join assignment a on c.id=a.company_id where c.state=1',
    (err, rows, fields) => {
      if (err) throw err;
      res.json({
        'status': 'ok',
        'totalResults': rows.length,
        'data': rows
      }).status(200);
    });
});

// GET An Assignment by User(Employee)
router.get('/assignment/:id', [
  check('id', "you must enter a value for the id field", ).exists(),
  check('id', "id it must be numeric", ).matches(/\d/),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }
  /*
    private String id;
    private String name;
    private String schedule;
    private String serviceDescription;
    private String latitude;
    private String longitude;
    private String stateId;
    private String stateDesc;
  */
  const { id } = req.params;
  mysqlConnection.query('select SHA1(a.id) as id, c.name, a.`schedule_` as schedule, a.service_description as serviceDescription,c.latitude,c.longitude, CASE WHEN a.state = 0 THEN "Pendiente" WHEN a.state = 1 THEN "Atendido" ELSE "Observado" END as stateDescription,a.state as stateId from company c inner join assignment a on c.id=a.company_id where c.state=1 and a.user_id=?',
    [id], (err, rows, fields) => {
      if (err) throw err;

      res.json({
        'status': 'ok',
        'totalResults': rows.length,
        'data': rows
      });
    });
});

//POST new Assignment
router.post('/assignment', [
  check('user_id', "you must enter a value for the user_id field", ).exists(),
  check('user_id', "user_id it must be numeric", ).matches(/\d/),
  check('company_id', "you must enter a value for the company_id field", ).exists(),
  check('company_id', "company_id it must be numeric", ).matches(/\d/),
  check('service_description', "you must enter a value for the service_description field", ).exists(),
  check('service_description', 'service_description must be at least 1 chars long').isLength({ min: 1 }),
  check('schedule', "you must enter a value for the schedule_ field", ).exists(),
  check('schedule', "schedule_ it must be datetime format", ).matches(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/),
], (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  const { user_id, company_id, schedule, service_description } = req.body;
  const query = 'INSERT INTO assignment (user_id, company_id,schedule_,service_description) values (?,?,?,?)';
  mysqlConnection.query(query, [user_id, company_id, schedule, service_description], (err, rows, fields) => {
    if (err) throw err;
    return res.status(200).json({
      'status': 'ok',
      'totalResults': rows.affectedRows,
      'insertId': rows.insertId
    });
  });
});
//PUT
router.put('/assignment/:id', (req, res) => {
  return res.status(405).json({
    'status': 'error',
    'message': "Method is not defined",
  });
});

//PATCH
router.patch('/assignment/:id', [
  check('id', "you must enter a value for the id field", ).exists(),
  check('id', "id it must be numeric", ).matches(/\d/),
  check('state_', "you must enter a value for the state_ field", ).exists(),
  check('state_', "state_ it must be numeric", ).matches(/\d/)
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }
  const { state_ } = req.body;
  const { id } = req.params;
  const query = 'UPDATE assignment SET state=? where id=?';
  mysqlConnection.query(query, [state_, id], (err, rows, fields) => {
    if (err) throw err;

    return res.status(200).json({
      'status': 'ok',
      'totalResults': rows.affectedRows
    });
  });
});


module.exports = router;