// const express = require('express');
// const router = express.Router();
// const { requireAuth } = require('../utils/auth'); // Authentication middleware
// const { SpotImage, Spot } = require('../db/models');  // Your models

// // DELETE /api/spot-images/:imageId (Delete a Spot Image)
// router.delete('/:imageId', requireAuth, async (req, res) => {
//     const imageId = req.params.imageId;
//     try {
//         const spotImage = await SpotImage.findByPk(imageId, { include: Spot });
//         if (!spotImage) {
//             return res.status(404).json({ message: "Spot Image couldn't be found" });
//         }
//         await spotImage.destroy();
//         return res.json({ message: "Successfully deleted" });
//     } catch (e) {
//         next(e);
//     }


// });




// module.exports = router;