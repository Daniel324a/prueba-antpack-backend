import Mongoose from 'mongoose';

const CompanySchema = Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    catchPhrase: {
      type: String,
      required: true,
    },
    bs: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default Mongoose.model('companies', CompanySchema);
