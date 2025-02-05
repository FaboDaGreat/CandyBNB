const express = require('express');
const router = express.Router();
const { Spot } = require('../db/models');


router.get('/', async (req, res, next) => {
  try {
    const spots = await Spot.findAll(); 
    res.json(spots); 
  } catch (error) {
    next(error);
  }
});


router.get('/:id', async (req, res, next) => {
  try {
    const spot = await Spot.findByPk(req.params.id); 
    if (!spot) {
      const err = new Error('Spot not found');
      err.status = 404;
      return next(err);
    }
    res.status(200).json(spot); 
  } catch (error) {
    next(error);
  }
});


router.post('/', async (req, res, next) => {
  try {
    const { name, description, latitude, longitude, address, price } = req.body;
    const newSpot = await Spot.create({ name, description, latitude, longitude, address, price });
    res.status(201).json(newSpot); 
  } catch (error) {
    next(error);
  }
});


router.put('/:id', async (req, res, next) => {
  try {
    const { name, description, latitude, longitude, address, price } = req.body;
    const spot = await Spot.findByPk(req.params.id); // Find the spot by ID
    if (!spot) {
      const err = new Error('Spot not found');
      err.status = 404;
      return next(err);
    }


    spot.name = name || spot.name;
    spot.description = description || spot.description;
    spot.latitude = latitude || spot.latitude;
    spot.longitude = longitude || spot.longitude;
    spot.address = address || spot.address;
    spot.price = price || spot.price;

    await spot.save(); 
    res.status(200).json(spot); 
  } catch (error) {
    next(error);
  }
});


router.delete('/:id', async (req, res, next) => {
  try {
    const spot = await Spot.findByPk(req.params.id); // 
    if (!spot) {
      const err = new Error('Spot not found');
      err.status = 404;
      return next(err);
    }

    await spot.destroy(); 
    res.status(200).json({ message: 'Spot deleted successfully' });
} catch (error) {
    next(error);
  }
});

module.exports = router;