import Mongoose from 'mongoose';

const AddressSchema = Mongoose.Schema(
  {
    street: {
      type: String,
      required: true,
    },
    suite: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default Mongoose.model('addresses', AddressSchema);
