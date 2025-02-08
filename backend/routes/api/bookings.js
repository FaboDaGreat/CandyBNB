const express = require('express');
const router = express.Router();
const { Booking, /*Spot, User*/ } = require('../db/models'); // Adjust based on your models
const { requireAuth } = require('../utils/auth'); // Middleware for authentication



// Get all of the Current User's Bookings
router.get('/current', async (req, res) => {
    const bookings = await Booking.findAll({
        where: { userId: req.user.id },
        include: {
            model: Spot,
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price', 'previewImage']
        }
    });
    res.status(200).json({ Bookings: bookings });
});

// Get all Bookings for a Spot based on the Spot's id
router.get('/spots/:spotId/bookings',  async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }
    // returns all the info if its the owner himself
    let bookings;
    if (spot.ownerId === req.user.id) {

        bookings = await Booking.findAll({
            where: { spotId: req.params.spotId },
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        });
    } else {
        //returns limited details if not the owner himself
        bookings = await Booking.findAll({
            where: { spotId: req.params.spotId },
            attributes: ['spotId', 'startDate', 'endDate']
        });
    }
    res.status(200).json({ Bookings: bookings });
});
// Create a Booking from a Spot based on the Spot's id
router.post('/spots/:spotId/bookings', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }
    if (spot.ownerId === req.user.id) {
        return res.status(403).json({ message: "Sorry, this spot is already booked for the specified dates", });
    }
    // Check for booking conflicts
    const conflictingBooking = await Booking.findOne({
        where: Sequelize.literal(`
          "spotId" = :spotId AND
          (
            ("startDate" <= :endDate && "endDate" >= :startDate) ||
            (:startDate <= "endDate" && :endDate >= "startDate")
          )
        `),
    });

    if (conflictingBooking) {
        return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
            }
        });
    }
});

//edit a booking
router.put('/:bookingId', requireAuth, async (req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId);

    // Check if the booking is in the past
    if (new Date(booking.endDate) < new Date()) {
        return res.status(403).json({ message: "Past bookings can't be modified" });
    }
});
// delete a booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId);

    // Check if the booking has already started
    if (new Date(booking.startDate) < new Date()) {
        return res.status(403).json({ message: "Bookings that have been started can't be deleted" });
    }

    await booking.destroy();
    res.status(200).json({ message: "Successfully deleted" });
});

module.exports = router;