
import mongoose from 'mongoose';


const dbUrl = 'mongodb://127.0.0.1:27017/courseapp' ;

let dbConnected = false;

export const checkifDbConnected = () =>
{

  if(!dbConnected)
  {
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
