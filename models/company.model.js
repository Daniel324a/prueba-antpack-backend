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
    users: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
    ],
  },
  { timestamps: true }
);

export default Mongoose.model('companies', CompanySchema);
