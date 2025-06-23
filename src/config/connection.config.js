import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

// singleton db connection
let connection = null;

async function connect() {
  if (connection) {
    return connection;
  }

  try {
    connection = await mongoose.connect(process.env.CONNECTSTRING);
    console.log('Connected to mongoDB');
    return connection;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default { connect };