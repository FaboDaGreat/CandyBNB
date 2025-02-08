const express = require('express')
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth'); // utility imports
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User } = require('../../db/models'); //sequelize imports



const router = express.Router();


//protect the incoming data for incoming routes
const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];
  
  
// Get the Current User
router.get('/api/session', async (req, res) => {
  const { user } = req;
  if (user) {
      const safeUser = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username: user.username
      };
      return res.json({ user: safeUser });
  } else {
      return res.json({ user: null });
  }
});

// Log In a User
router.post('/api/session', requireAuth, async (req, res) => {
  const { credential, password } = req.body;
  const user = users.find(user => (user.email === credential || user.username === credential) && user.password === password);
  if (user) {
    req.session.user = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username
    };
    res.status(200).json({ user: req.session.user });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});
  // Sign up
router.post('/', validateSignup, async (req, res) => {
      const { email, password, username } = req.body;
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({ email, username, hashedPassword });
  
      const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
      };
  
      await setTokenCookie(res, safeUser);
  
      return res.json({
        user: safeUser
      });
    }
  );

module.exports = router;
