const router = require('express').Router(); // sequelize import
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const { User } = require('../../db/models'); //express import

// middleware imports
const { restoreUser, setTokenCookie, requireAuth} = require('../../utils/auth.js');



//middleware
router.use(restoreUser);

// routes for api
router.use('/session', sessionRouter);

router.use('/users', usersRouter);
router.use('/spots', spotsRouter); 
//routes
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



module.exports = router;
