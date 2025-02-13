const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT
const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

// Add Movie (Admin only)
router.post('/add', authenticate, async (req, res) => {
    try {
        if (!req.user.isAdmin) return res.status(403).json({ message: "Access Denied" });

        const { title, description, genre, releaseYear, rating, videoUrl, thumbnail } = req.body;
        const newMovie = new Movie({ title, description, genre, releaseYear, rating, videoUrl, thumbnail });
        await newMovie.save();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Fetch Movies
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Fetch Single Movie
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: "Movie not found"});
        res.json(movie);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

module.exports = router;