import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import ImageRoutes from './Routes/ImageRoutes.js';
import errorHandler from './Middlewares/ErrorHandler.js';
import './Models/db.js';
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8090;

const _dirname = path.resolve();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use('/api/images', ImageRoutes);
app.use(errorHandler); 

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get('*', (req, res) =>{
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
