const express = require('express');
const router = express.Router();

const { getAllGardens, getOneGarden, addGarden } = require('../models/garden');
const { createUser, authenticate, logIn } = require('../models/user')

router.post('/users', createUser, (req, res) => {
  res.json(res.rows);
});

router.get('/users', authenticate, (req, res) => {
  res.json('You\'re a valid user');
});

router.post('/users/login', logIn, (req, res) => {
  res.json(res.rows);
});


router.get('/:gardenID', getOneGarden, (req, res) => {
  res.json(res.garden || []);
  console.log(res.garden);
});

router.get('/', getAllGardens, (req, res) => {
  res.json(res.gardens || []);


});

router.post('/', addGarden, (req, res) => {
  res.json(res.gardens || []);
  // console.log(res.gardens);
});



module.exports = router;
