import Users from '../models/user.model.js';
import Mongoose from 'mongoose';

const {
  Types: { ObjectId },
} = Mongoose;

export const getUsers = async (req, res) => {
  const { search = /.*/ } = req.query;

  const regex = new RegExp(search, 'i');

  const query = {
    $or: [{ name: regex }, { email: regex }, { username: regex }],
  };

  const [count, users] = await Promise.all([Users.countDocuments(query), Users.find(query).sort('name')]);

  res.json({
    ok: true,
    count,
    users,
  });
};

export const getUserByID = async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) return res.status(400).json({ msg: 'Not received a valid ID' });

  const user = await Users.findById(id);

  if (!user) return res.status(404).json({ msg: 'User not found' });

  res.json({
    ok: true,
    user,
  });
};

export const postUser = async (req, res) => {
  const user = new Users(req.body);

  user.save((err, user) => {
    if (err) return res.status(400).json({ msg: err.message, errors: err.errors });

    res.json({
      ok: true,
      user,
    });
  });
};

export const putUser = async (req, res) => {
  const {
    params: { id },
    body,
  } = req;

  if (!ObjectId.isValid(id)) return res.status(400).json({ msg: 'Not received a valid ID' });

  Users.findByIdAndUpdate(id, body, (err, user) => {
    if (err) return res.status(400).json({ msg: err.message, errors: err.errors });

    res.json({
      ok: true,
      user,
    });
  });
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) return res.status(400).json({ msg: 'Not received a valid ID' });

  Users.findByIdAndDelete(id, (err, user) => {
    if (err) return res.status(400).json({ msg: err.message, errors: err.errors });

    res.json({ user, ok: true });
  });
};
