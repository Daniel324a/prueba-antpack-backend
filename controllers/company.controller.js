import Companies from '../models/company.model.js';
import Mongoose from 'mongoose';

const {
  Types: { ObjectId },
} = Mongoose;

export const getCompanies = async (req, res) => {
  const { search = /.*/ } = req.query;

  const regex = new RegExp(search, 'i');

  const query = {
    name: regex,
  };

  const [count, companies] = await Promise.all([Companies.countDocuments(query), Companies.find(query).sort('name')]);

  res.json({
    ok: true,
    count,
    companies,
  });
};

export const getCompanyByID = async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) return res.status(400).json({ msg: 'Not received a valid ID' });

  const company = await Companies.findById(id);

  if (!company) return res.status(404).json({ msg: 'Company not found' });

  res.json({
    ok: true,
    company,
  });
};

export const postCompany = async (req, res) => {
  const company = new Companies(req.body);

  company.save((err, company) => {
    if (err) return res.status(400).json({ msg: err.message, errors: err.errors });

    res.json({
      ok: true,
      company,
    });
  });
};

export const putCompany = async (req, res) => {
  const {
    params: { id },
    body,
  } = req;

  if (!ObjectId.isValid(id)) return res.status(400).json({ msg: 'Not received a valid ID' });

  Companies.findByIdAndUpdate(id, body, (err, company) => {
    if (err) return res.status(400).json({ msg: err.message, errors: err.errors });

    res.json({
      ok: true,
      company,
    });
  });
};

export const deleteCompany = async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) return res.status(400).json({ msg: 'Not received a valid ID' });

  Companies.findByIdAndDelete(id, (err, company) => {
    if (err) return res.status(400).json({ msg: err.message, errors: err.errors });

    res.json({ company, ok: true });
  });
};
