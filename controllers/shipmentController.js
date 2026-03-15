const Shipment = require('../models/Shipment');
const { validationResult } = require('express-validator');


const createShipment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { companyName, originPort, destinationPort, status } = req.body;

    const shipment = await Shipment.create({
      companyName,
      originPort,
      destinationPort,
      status: status || 'Pending',
      user: req.user._id,
    });

    res.status(201).json(shipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getShipments = async (req, res) => {
  try {
    const { search, status, page = 1, limit = 10 } = req.query;

    const filter = {
      user: req.user._id,
      isDeleted: false, 
    };

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { shipmentId: { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } },
        { originPort: { $regex: search, $options: 'i' } },
        { destinationPort: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Shipment.countDocuments(filter);

    const shipments = await Shipment.find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    res.json({
      shipments,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getShipmentById = async (req, res) => {
  try {
    const shipment = await Shipment.findOne({
      _id: req.params.id,
      user: req.user._id,
      isDeleted: false, 
    });

    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    res.json(shipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findOne({
      _id: req.params.id,
      user: req.user._id,
      isDeleted: false, 
    });

    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    const { companyName, originPort, destinationPort, status } = req.body;

    shipment.companyName = companyName || shipment.companyName;
    shipment.originPort = originPort || shipment.originPort;
    shipment.destinationPort = destinationPort || shipment.destinationPort;
    shipment.status = status || shipment.status;

    const updatedShipment = await shipment.save();
    res.json(updatedShipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findOne({
      _id: req.params.id,
      user: req.user._id,
      isDeleted: false,
    });

    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    shipment.isDeleted = true;
    shipment.deletedAt = new Date();
    shipment.deletedBy = req.user._id;

    await shipment.save();

    res.json({ message: 'Shipment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createShipment,
  getShipments,
  getShipmentById,
  updateShipment,
  deleteShipment,
};
``