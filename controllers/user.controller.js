import Mongoose from 'mongoose';
import Gravatar from 'gravatar';

import { UserModel, AddressModel, CompanyModel } from '../models';

const ObjectId = Mongoose.Types.ObjectId;

export const getUsers = async (req, res) => {
  // Get search value
  const { search = /.*/ } = req.query;

  // Regex to ignore caps
  const regex = new RegExp(search, 'i');

  // Filter query
  const query = {
    $or: [{ name: regex }, { email: regex }, { username: regex }],
  };

  // Get users and users count
  const [count, users] = await Promise.all([
    UserModel.countDocuments(query),
    UserModel.find(query).populate('company', '-users').populate('address', '-users').sort('name'),
  ]);

  // Response to client
  res.json({
    ok: true,
    count,
    users,
  });
};

export const getUserByID = async (req, res) => {
  // Get user ID
  const id = req.params.id;

  // Check ID
  if (!ObjectId.isValid(id)) return res.status(400).json({ msg: 'Not received a valid ID' });

  // Get user
  const user = await UserModel.findById(id).populate('company').populate('address');

  // Check if user exist
  if (!user) return res.status(404).json({ msg: 'User not found' });

  // Response to client
  res.json({
    ok: true,
    user,
  });
};

export const postUser = async (req, res) => {
  // Create new user object
  const user = new UserModel(req.body);

  // Get selected address and company
  const address = await AddressModel.findById(user.address);
  const company = await CompanyModel.findById(user.company);

  // Insert user into address and company object
  address.users.push(user._id);
  company.users.push(user._id);

  // Generate Gravatar
  const gravatar = Gravatar.url(user.email, { s: '1024', p: true }, true);

  // Insert gravatar into user object
  user.gravatar = gravatar;

  // Save user
  user.save(async (err, user) => {
    // Update selected address and company
    try {
      await address.save();
      await company.save();
    } catch (err) {
      if (err) return res.status(400).json({ msg: err.message, errors: err.errors });
    }

    if (err) return res.status(400).json({ msg: err.message, errors: err.errors });

    // Response to client
    res.json({
      ok: true,
      user,
    });
  });
};

export const putUser = async (req, res) => {
  // Destructure update data
  const {
    params: { id },
    body,
  } = req;

  // Check ID
  if (!ObjectId.isValid(id)) return res.status(400).json({ msg: 'Not received a valid ID' });

  // Update user
  UserModel.findByIdAndUpdate(id, body, (err, user) => {
    if (err) return res.status(400).json({ msg: err.message, errors: err.errors });

    // Response to client
    res.json({
      ok: true,
      user,
    });
  });
};

export const deleteUser = async (req, res) => {
  // Get user ID
  const id = req.params.id;

  // Check ID
  if (!ObjectId.isValid(id)) return res.status(400).json({ msg: 'Not received a valid ID' });

  // Delete user
  UserModel.findByIdAndDelete(id, async (err, user) => {
    if (err) return res.status(400).json({ msg: err.message, errors: err.errors });

    // Remove user from his address and company
    await AddressModel.findByIdAndUpdate(user.address, {
      $pull: { users: id },
    });
    await CompanyModel.findByIdAndUpdate(user.company, {
      $pull: { users: id },
    });

    // Response to client
    res.json({ user, ok: true });
  });
};
