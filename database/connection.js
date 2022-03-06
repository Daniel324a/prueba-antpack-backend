import Mongoose from 'mongoose';

export const connectBD = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    Mongoose.connect(process.env.MONGODB_CNN, options, () => console.log('BD Online'));
  } catch (err) {
    throw new Error(`BD Connection Error \n\n${err}`);
  }
};
