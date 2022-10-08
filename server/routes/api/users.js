const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
require('dotenv').config()

const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route  GET api/users
// @desc   Get all Employees
// @access Public
router.get('/', async(req, res) => {
  try{
    const employees = await User.find();
    if(!employees) {
      return res.status(400).json({msg: 'No Employees found'})
    }
    res.json(employees);
  } catch(error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
})

// @route  POST api/users
// @desc   Add Employee
// @access Public
router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('designation', 'Please include a valid designation').not().isEmpty()
], async(req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { name, email, designation } = req.body;

  try{

    let employee = await User.findOne({ email });
    
    if(employee) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
    }

    employee = new User({
      name,
      email,
      designation
    });

    await employee.save();
    res.json("User added successfully")
  } catch(error) {
    console.error(error.message);
    res.status(500).send('Server Error!')
  }
})

// @route  GET api/users/:id
// @desc   Get Employee by ID
// @access Public
router.get('/:id', async(req, res) => {
  try{
    const Employee = await User.findById(req.params.id);

    if(!Employee) {
      return res.status(404).json({ msg: 'Employee not found' })
    }

    res.json(Employee)
  } catch (error) {
    console.error(error.message);
    if(error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    res.status(500).send('Server Error');
  }
})

// @route  DELETE api/users/:id
// @desc   Delete Employee
// @access Public
router.delete('/:id', async (req, res) => {
  try {
    const Employee = await User.findById(req.params.id);

    if(!Employee) {
      return res.status(404).json({ msg: 'Employee not found' })
    }

    await Employee.remove();

    res.json({ msg: 'Employee Removed' })
  } catch (error) {
    console.error(error.message);
    if(error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    res.status(500).send('Server Error');
  }
})

// @route  PUT api/users/:id
// @desc   Update Employee
// @access Public
router.put('/:id', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('designation', 'Please include a valid designation').not().isEmpty()
], async(req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { name, email, designation } = req.body;

  try{

    let employee = await User.find({email});

    await User.updateOne(
      {"_id": req.params.id},
      {$set: {name, email, designation }}
    )

    res.json("Employee updated successfully")
  } catch(error) {
    console.error(error.message);
    res.status(500).send('Server Error!')
  }
})

module.exports = router;