import mongoose from 'mongoose';

const { Schema } = mongoose;

const ImageGallarySchema = new Schema({
    imageURL: {
        type: String
    },
    originalName: {
        type: String
    },
    mimeType: {
        type: String
    },
    size: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
});

const ImageGallaryModel = mongoose.model('images', ImageGallarySchema);

export default ImageGallaryModel;
