const Client = require('../models/Client');

// @desc    Fetch all clients
// @route   GET /api/clients
// @access  Public
const getClients = async (req, res) => {
  try {
    const clients = await Client.find({ isActive: true });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a client
// @route   POST /api/clients
// @access  Private/Admin
const createClient = async (req, res) => {
  try {
    const client = new Client(req.body);
    const createdClient = await client.save();
    res.status(201).json(createdClient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a client
// @route   PUT /api/clients/:id
// @access  Private/Admin
const updateClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (client) {
      Object.assign(client, req.body);
      const updatedClient = await client.save();
      res.json(updatedClient);
    } else {
      res.status(404).json({ message: 'Client not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a client
// @route   DELETE /api/clients/:id
// @access  Private/Admin
const deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (client) {
      await client.deleteOne();
      res.json({ message: 'Client removed' });
    } else {
      res.status(404).json({ message: 'Client not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getClients,
  createClient,
  updateClient,
  deleteClient,
};
