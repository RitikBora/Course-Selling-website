
import mongoose from 'mongoose';
import {config} from 'dotenv'

let dbConnected = false;

export const checkifDbConnected = () =>
{

  if(!dbConnected)
  {
    config();

    const username = process.env.MONGO_USERNAME;
    const password = process.env.MONGO_PASSWORD;
    // const dbUrl = `mongodb+srv://${username}:${password}@projects.icbkpjd.mongodb.net/courseapp` ;
    const dbUrl = 'mongodb://127.0.0.1:27017/courseapp' ; // for local testing

    
    mongoose.connect(dbUrl);
    mongoose.connection.on('connected', () => {
      console.log('Connected to MongoDB');
      dbConnected = true;
    });
    
    mongoose.connection.on('error', (err : Error
    ) => {
      console.error('MongoDB connection error:', err);
    });
  }
  
}
