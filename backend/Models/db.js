import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('MongoDB connected successfully...');
    } catch (error) {
        console.error('Error in MongoDB connection:', error.message);
    }
};

connectDB();

export default mongoose;