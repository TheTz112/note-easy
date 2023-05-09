const express = require('express');
const router = express.Router();
const Customer = require('../models/customerModel');

// GET all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single customer by ID
router.get('/:id', getCustomer, (req, res) => {
  res.json(res.customer);
});

// CREATE a new customer
router.post('/', async (req, res) => {
  const customer = new Customer({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  });

  try {
    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE an existing customer by ID
router.patch('/:id', getCustomer, async (req, res) => {
  if (req.body.name != null) {
    res.customer.name = req.body.name;
  }
  if (req.body.email != null) {
    res.customer.email = req.body.email;
  }
  if (req.body.phone != null) {
    res.customer.phone = req.body.phone;
  }
  res.customer.updatedAt = Date.now();

  try {
    const updatedCustomer = await res.customer.save();
    res.json(updatedCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// DELETE a customer by ID
router.delete('/:id', getCustomer, async (req, res) => {
  try {
    await res.customer.remove();
    res.json({ message: 'Customer deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a single customer by ID
async function getCustomer(req, res, next) {
  try {
    const customer = await Customer.findById(req.params.id);
    if (customer == null) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.customer = customer;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
