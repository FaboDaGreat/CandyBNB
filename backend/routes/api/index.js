//backend/routes/api/index.js
const router = require('express').Router(); //done

const reviewsRouter = require('./reviews.js');
const spotsRouter = require('./spots.js');
const usersRouter = require('./users.js');
const sessionRouter = require('./session.js');
const bookingsRouter = require('./bookings.js');
const spotImagesRouter = require('./spotImages.js');
const reviewImagesRouter = require('./reviewImages.js');

const express = require('express'); // sequelize import
const { User } = require('../../db/models'); //express import

// middleware imports
const { restoreUser, setTokenCookie, requireAuth} = require('../../utils/auth.js');


//middleware
router.use(restoreUser);

// routes for api
router.use('/session', sessionRouter);
router.use('/bookings', bookingsRouter);
router.use('/users', usersRouter);
router.use('/spotImages', spotImagesRouter);
router.use('/spots', spotsRouter); 
router.use('/reviews', reviewsRouter); 
router.use('/reviewImages', reviewImagesRouter); 

//routes
router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

// Add a XSRF-TOKEN cookie
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user: user });
});

router.get('/restore-user', (req, res) => {
    return res.json(req.user);
  }
);



router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);



module.exports = router;
