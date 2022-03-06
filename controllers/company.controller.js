import Mongoose from 'mongoose';

import Companies from '../models/company.model.js';

const ObjectId = Mongoose.Types.ObjectId;

export const getCompanies = async (req, res) => {
  // Get search value
  const { search = /.*/ } = req.query;

  // Regex to ignore caps
  const regex = new RegExp(search, 'i');

  // Filter query
  const query = {
    name: regex,
  };

  // Get companies and companies count
  const [count, companies] = await Promise.all([Companies.countDocuments(query), Companies.find(query).sort('name')]);

  // Response to client
  res.json({
    ok: true,
    count,
    companies,
  });
};

export const getCompanyByID = async (req, res) => {
  // Get company ID
  const id = req.params.id;

  // Check Id
  if (!ObjectId.isValid(id)) return res.status(400).json({ msg: 'Not received a valid ID' });

  // Get company
  const company = await Companies.findById(id).populate('users', '-company');

  // Check if company exist
  if (!company) return res.status(404).json({ msg: 'Company not found' });

  // Response to client
  res.json({
    ok: true,
    company,
  });
};

export const postCompany = async (req, res) => {
  // Create a new company object
  const company = new Companies(req.body);

  // Save company
  company.save((err, company) => {
    if (err) return res.status(400).json({ msg: err.message, errors: err.errors });

    // Response to client
    res.json({
      ok: true,
      company,
    });
  });
};

export const putCompany = async (req, res) => {
  // Destructure update data
  const {
    params: { id },
    body,
  } = req;

  // Check ID
  if (!ObjectId.isValid(id)) return res.status(400).json({ msg: 'Not received a valid ID' });

  // Update company
  Companies.findByIdAndUpdate(id, body, (err, company) => {
    if (err) return res.status(400).json({ msg: err.message, errors: err.errors });

    // Response to client
    res.json({
      ok: true,
      company,
    });
  });
};

export const deleteCompany = async (req, res) => {
  // Get company ID
  const id = req.params.id;

  // Check ID
  if (!ObjectId.isValid(id)) return res.status(400).json({ msg: 'Not received a valid ID' });

  // Delete Company
  Companies.findByIdAndDelete(id, (err, company) => {
    if (err) return res.status(400).json({ msg: err.message, errors: err.errors });

    // Response to client
    res.json({ company, ok: true });
  });
};
