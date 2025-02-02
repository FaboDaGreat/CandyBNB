const router = require('express').Router(); // sequelize import
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { User } = require('../../db/models'); //express import

// middleware imports
const { restoreUser, setTokenCookie, requireAuth} = require('../../utils/auth.js');


//middleware
router.use(restoreUser);

// routes for api
router.use('/session', sessionRouter);

router.use('/users', usersRouter);
//routes
router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});


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

// ...



//module.exports = router;

// backend/routes/api/index.js

//const sessionRouter = require('./session.js');
//const usersRouter = require('./users.js');
//
//// Connect restoreUser middleware to the API router
//  // If current user session is valid, set req.user to the user in the database
//  // If current user session is not valid, set req.user to null
//router.use(restoreUser);
//
//router.use('/session', sessionRouter);
//
//router.use('/users', usersRouter);
//
//router.post('/test', (req, res) => {
//  res.json({ requestBody: req.body });
//});

module.exports = router;
