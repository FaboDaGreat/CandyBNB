const express = require("express")
const bcrypt = require('bcryptjs');
const { requireAuth } = require('../../utils/auth.js');
const { Spot } = require('../../db/models')
const router = express.Router();


// Get all Spots
router.get('/', async (req, res, next) => {
    try {
        const spot = await Spot.findAll();
        return res.json({ spot });
    } catch (error) {
        next(error);
    }


});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const spot = await Spot.findByPk(id);
        if (spot) {
            return res.json({ spot });
        } else {
            return res.status(404).jspn({ error: "Spot couldn't be found" });
        }
    } catch (error) {
        next(error)
    }
});

//Create a spot
router.post('/', requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    try {
        const newSpot = await Spot.create({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            ownerId: req.user.id,
        });
        return res.status(201).json({ spot: newSpot });
    } catch (error) {
        next(error);
    }
});
//Edit a spot
router.put('/:id', requireAuth, async (req, res, next) => {
    const { id } = req.params;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    try {
        const spot = await Spot.findByPk(id);
        if (!spot) {
            return res.status(403).json({ error: 'Spot not found' });
        }
        if (spot.ownerId !== req.user.id) {
            return res.status(403).json({ error: 'Unauthorized to update this spot' });
        }
        const updatedSpot = await spot.update({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
        });
        return res.json({ spot: updatedSpot });
    } catch (error) {
        next(error)
    }
});
//delete a spot
router.delete('/:id', requireAuth, async (req, res, next) =>{
    const { id } = req.params;
    try{
        const spot = await Spot.findByPk(id);
        if (!spot) {
            return res.status(404).json({ error: "Spot couldn't be found"});
        }
        if (spot.ownerId !== req.user.id) {
            return res.status(403).json({ error: 'Unauthorized to delete this spot'});
        }
        await spot.destroy();
        return res.status(200).json({message: 'Successfully deleted'});
    } catch (error){
            next(error);
        }
    
});


module.exports = router;