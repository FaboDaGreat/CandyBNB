const express = require("express")
const { requireAuth } = require('../../utils/auth.js');
const { Spot, Review, User, ReviewImage } = require('../../db/models');
const { Model } = require("sequelize");
const router = express.Router();



router.get('/:spotId/reviews', async(req ,res, next) => {
    try {
        const spotId = req.params.spotId
        const spot = await Spot.findByPk(spotId);

        if(spot === null){

            const invalidError = new Error("Spot couldn't be found")
            invalidError.status = 404;
            throw invalidError
        }

        console.log(spot)
        const reviews = await Review.findAll({
            include: [{
                model: User,
                attributes: ["id", 'firstName', "lastName"]
            },
            {
                model: ReviewImage,
                attributes: ["id", 'url']
            }
            ],
            where: {spotId: spotId}
        });
        return res.json({Reviews: reviews})
        
    } catch(e) {
        next(e);
    }
})



// --------------------- BAD CODE UNDER THIS LINE -----------------------





// Get all Spots
// router.get('/', async (req, res, next) => {
//     try {
//         const spot = await Spot.findAll();
//         return res.json({ spot });
//     } catch (error) {
//         next(error);
//     }


// });

// router.get('/:id', async (req, res, next) => {
//     const { id } = req.params;
//     try {
//         const spot = await Spot.findByPk(id);
//         if (spot) {
//             return res.json({ spot });
//         } else {
//             return res.status(404).jspn({ error: "Spot couldn't be found" });
//         }
//     } catch (error) {
//         next(error)
//     }
// });

// //Create a spot
// router.post('/', requireAuth, async (req, res, next) => {
//     const { address, city, state, country, lat, lng, name, description, price } = req.body;
//     try {
//         const newSpot = await Spot.create({
//             address,
//             city,
//             state,
//             country,
//             lat,
//             lng,
//             name,
//             description,
//             price,
//             ownerId: req.user.id,
//         });
//         return res.status(201).json({ spot: newSpot });
//     } catch (error) {
//         next(error);
//     }
// });
// //Edit a spot
// router.put('/:id', requireAuth, async (req, res, next) => {
//     const { id } = req.params;
//     const { address, city, state, country, lat, lng, name, description, price } = req.body;
//     try {
//         const spot = await Spot.findByPk(id);
//         if (!spot) {
//             return res.status(403).json({ error: 'Spot not found' });
//         }
//         if (spot.ownerId !== req.user.id) {
//             return res.status(403).json({ error: 'Unauthorized to update this spot' });
//         }
//         const updatedSpot = await spot.update({
//             address,
//             city,
//             state,
//             country,
//             lat,
//             lng,
//             name,
//             description,
//             price,
//         });
//         return res.json({ spot: updatedSpot });
//     } catch (error) {
//         next(error)
//     }
// });
// //delete a spot
// router.delete('/:id', requireAuth, async (req, res, next) =>{
//     const { id } = req.params;
//     try{
//         const spot = await Spot.findByPk(id);
//         if (!spot) {
//             return res.status(404).json({ error: "Spot couldn't be found"});
//         }
//         if (spot.ownerId !== req.user.id) {
//             return res.status(403).json({ error: 'Unauthorized to delete this spot'});
//         }
//         await spot.destroy();
//         return res.status(200).json({message: 'Successfully deleted'});
//     } catch (error){
//             next(error);
//         }
    
// });


module.exports = router;