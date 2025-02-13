const express = require("express")
const router = express.Router();
// const { requireAuth } = require('../../utils/auth');
// const {check, validationResult} = require('express-validator');
// const { Review } = require('../../db/models');




// router.get('/:id', async (req, res, next) => {
//     const { id } = req.params;
//     try {
//         const review = await Spot.findByPk(id);
//         if (review) {
//             return res.json({ review });
//         } else {
//             return res.status(404).jspn({ error: "review couldn't be found" });
//         }
//     } catch (error) {
//         next(error)
//     }
// });

// //Create a review
// router.post('/', requireAuth, async (req, res, next) => {
//     const { address, city, state, country, lat, lng, name, description, price } = req.body;
//     try {
//         const newreview = await Review.create({
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
//         return res.status(201).json({ review: newreview });
//     } catch (error) {
//         next(error);
//     }
// });
// //Edit a review
// router.put('/:id', requireAuth, async (req, res, next) => {
//     const { id } = req.params;
//     const { address, city, state, country, lat, lng, name, description, price } = req.body;
//     try {
//         const review = await Review.findByPk(id);
//         if (!review) {
//             return res.status(403).json({ error: 'review not found' });
//         }
//         if (review.ownerId !== req.user.id) {
//             return res.status(403).json({ error: 'Unauthorized to update this review' });
//         }
//         const updatedreview = await review.update({
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
//         return res.json({ review: updatedreview });
//     } catch (error) {
//         next(error)
//     }
// });
// //delete a review
// router.delete('/:id', requireAuth, async (req, res, next) =>{
//     const { id } = req.params;
//     try{
//         const review = await Review.findByPk(id);
//         if (!review) {
//             return res.status(404).json({ error: "review couldn't be found"});
//         }
//         if (review.ownerId !== req.user.id) {
//             return res.status(403).json({ error: 'Unauthorized to delete this review'});
//         }
//         await review.destroy();
//         return res.status(200).json({message: 'Successfully deleted'});
//     } catch (error){
//             next(error);
//         }
    
// });


module.exports = router;