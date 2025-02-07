const express = require('express');
const router = express.Router();
const { Spot } = require('../../db/models'); // Import your Spot model
const { requireAuth } = require('../../utils/auth'); // Import auth middleware if needed

// Get all spots
router.get('/', async (req, res) => {
  try {
    const spots = await Spot.findAll(); // Retrieves all spots from the database
    return res.json({ spots });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve spots' });
  }
});

// Get a specific spot by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const spot = await Spot.findByPk(id); // Finds spot by primary key (ID)
    if (spot) {
      return res.json({ spot });
    } else {
      return res.status(404).json({ error: 'Spot not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve spot' });
  }
});

// Create a new spot (requires authentication)
router.post('/', requireAuth, async (req, res) => {
  const { name, description, location, price } = req.body;
  try {
    const newSpot = await Spot.create({
      name,
      description,
      location,
      price,
      ownerId: req.user.id, // Assuming the user is authenticated and you store the owner ID
    });
    return res.status(201).json({ spot: newSpot });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to create spot' });
  }
});

// Update a spot by ID (requires authentication)
router.put('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const { name, description, location, price } = req.body;
  try {
    const spot = await Spot.findByPk(id);
    if (!spot) {
      return res.status(404).json({ error: 'Spot not found' });
    }

    // Ensure the user is the owner of the spot
    if (spot.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized to update this spot' });
    }

    const updatedSpot = await spot.update({
      name,
      description,
      location,
      price,
    });
    return res.json({ spot: updatedSpot });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to update spot' });
  }
});

// Delete a spot by ID (requires authentication)
router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const spot = await Spot.findByPk(id);
    if (!spot) {
      return res.status(404).json({ error: 'Spot not found' });
    }

    // Ensure the user is the owner of the spot
    if (spot.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized to delete this spot' });
    }

    await spot.destroy();
    return res.status(200).json({ message: 'Spot successfully deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete spot' });
  }
});

module.exports = router;


