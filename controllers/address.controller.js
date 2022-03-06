import Addresses from '../models/address.model.js';
import Mongoose from 'mongoose';

const {
  Types: { ObjectId },
} = Mongoose;

export const getAddresses = async (req, res) => {
  const { search = /.*/ } = req.query;

  const regex = new RegExp(search, 'i');

  const query = {
    $or: [{ street: regex }, { city: regex }],
  };

  const [count, addresses] = await Promise.all([Addresses.countDocuments(query), Addresses.find(query).sort('name')]);

  res.json({
    ok: true,
    count,
    addresses,
  });
};

export const getAddressByID = async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) return res.status(400).json({ msg: 'Not received a valid ID' });

  const address = await Addresses.findById(id);

  if (!address) return res.status(404).json({ msg: 'Address not found' });

  res.json({
    ok: true,
    address,
  });
};

export const postAddress = async (req, res) => {
  const address = new Addresses(req.body);

  address.save((err, address) => {
    if (err) return res.status(400).json({ msg: err.message, errors: err.errors });

    res.json({
      ok: true,
      address,
    });
  });
};

export const putAddress = async (req, res) => {
  const {
    params: { id },
    body,
  } = req;

  if (!ObjectId.isValid(id)) return res.status(400).json({ msg: 'Not received a valid ID' });

  Addresses.findByIdAndUpdate(id, body, (err, address) => {
    if (err) return res.status(400).json({ msg: err.message, errors: err.errors });

    res.json({
      ok: true,
      address,
    });
  });
};

export const deleteAddress = async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) return res.status(400).json({ msg: 'Not received a valid ID' });

  Addresses.findByIdAndDelete(id, (err, address) => {
    if (err) return res.status(400).json({ msg: err.message, errors: err.errors });

    res.json({ address, ok: true });
  });
};
