const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    genre: { type: String },
    releaseYear: { type: Number },
    rating: { type: Number },
    videoUrl: { type: String, required: true }, // Video storage link
    thumbnail: { type: String }, 
}, { timestamps: true });

module.exports = mongoose.model('Movie', MovieSchema);