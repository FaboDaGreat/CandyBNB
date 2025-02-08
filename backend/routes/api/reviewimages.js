const express = require('express');
const router = express.Router();
const { requireAuth } = require('../utils/auth'); // Authentication middleware
const { ReviewImage, Review } = require('../db/models');  // Your models

// DELETE /api/spot-images/:imageId (Delete a Spot Image)
router.delete('/:imageId', requireAuth, async (req, res) => {
    const reviewImageId = req.params.reviewImageId;
    try {
        const reviewImage = await ReviewImage.findByPk(reviewImageId, { include: Review });
        if (!reviewImage) {
            return res.status(404).json({ message: "Spot Image couldn't be found" });
        }
        await reviewImage.destroy();
        return res.json({ message: "Successfully deleted" });
    } catch (e) {
        next(e);
    }
});

module.exports = router;