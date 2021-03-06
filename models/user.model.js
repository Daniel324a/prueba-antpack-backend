import Mongoose from 'mongoose';

const UserSchema = Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'addresses',
      required: true,
    },
    company: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'companies',
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    gravatar: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

export default Mongoose.model('users', UserSchema);
