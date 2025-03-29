import { Router } from 'express';
import { getAllImages, uploadImages, getImageDetailById, deleteImageById } from '../Controllers/ImageController.js';
import { uploadMultiple } from '../Middlewares/FileUploader.js';

const routes = Router();

routes.get('/', getAllImages);
routes.get('/:id', getImageDetailById);
routes.post('/upload-images', uploadMultiple, uploadImages);
routes.delete('/:id', deleteImageById);

export default routes;
