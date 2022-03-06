import Mongoose from 'mongoose';

import Addresses from '../models/address.model.js';

const ObjectId = Mongoose.Types.ObjectId;

export const getAddresses = async (req, res) => {
  // Get search value
  const { search = /.*/ } = req.query;

  // Regex to ignore caps
  const regex = new RegExp(search, 'i');

  // Filter query
  const query = {
    $or: [{ street: regex }, { city: regex }],
  };

  // Get addresses and addresses count
  const [count, addresses] = await Promise.all([Addresses.countDocuments(query), Addresses.find(query).sort('city')]);

  // Response to client
  res.json({
    ok: true,
    count,
    addresses,
  });
};

export const getAddressByID = async (req, res) => {
  // Get address ID
  const id = req.params.id;

  // Check ID
  if (!ObjectId.isValid(id)) return res.status(400).json({ msg: 'Not received a valid ID' });

  // Get address
  const address = await Addresses.findById(id).populate('users', '-address');

  // Check if address exist
  if (!address) return res.status(404).json({ msg: 'Address not found' });

  // Response to client
  res.json({
    ok: true,
    address,
  });
};

export const postAddress = async (req, res) => {
  // Create new address object
  const address = new Addresses(req.body);

  // Save address
  address.save((err, address) => {
    if (err) return res.status(400).json({ msg: err.message, errors: err.errors });

    // Response to client
    res.json({
      ok: true,
      address,
    });
  });
};

export const putAddress = async (req, res) => {
  // Desctructure update data
  const {
    params: { id },
    body,
  } = req;

  // Check ID
  if (!ObjectId.isValid(id)) return res.status(400).json({ msg: 'Not received a valid ID' });

  // Update address
  Addresses.findByIdAndUpdate(id, body, (err, address) => {
    if (err) return res.status(400).json({ msg: err.message, errors: err.errors });

    // Response to client
    res.json({
      ok: true,
      address,
    });
  });
};

export const deleteAddress = async (req, res) => {
  // Get address ID
  const id = req.params.id;

  // Check ID
  if (!ObjectId.isValid(id)) return res.status(400).json({ msg: 'Not received a valid ID' });

  // Delete address
  Addresses.findByIdAndDelete(id, (err, address) => {
    if (err) return res.status(400).json({ msg: err.message, errors: err.errors });

    // Response to client
    res.json({ address, ok: true });
  });
};
