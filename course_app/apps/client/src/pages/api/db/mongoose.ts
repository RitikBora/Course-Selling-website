
import mongoose from 'mongoose';


const dbUrl = 'mongodb://127.0.0.1:27017/courseapp' ;

export const connectToDb = () =>
{

  mongoose.connect(dbUrl);

  mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });
  
  mongoose.connection.on('error', (err : Error
  ) => {
    console.error('MongoDB connection error:', err);
  });
}
