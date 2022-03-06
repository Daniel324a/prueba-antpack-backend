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
    users: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
    ],
  },
  { timestamps: true }
);

export default Mongoose.model('addresses', AddressSchema);
