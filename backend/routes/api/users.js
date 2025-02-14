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
      .withMessage('Invalid email'),
    check('username')
      .exists({ checkFalsy: true})
      .withMessage('Username is required'),
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
    check('firstName')
      .exists({ checkFalsy: true })
      .withMessage('First Name is required'),
    check('lastName')
      .exists({ checkFalsy: true })
      .withMessage('Last Name is required'),
    handleValidationErrors
  ];
  
  
// // Get the Current User
// router.get('/api/session', async (req, res) => {
//   const { user } = req;
//   if (user) {
//       const safeUser = {
//           id: user.id,
//           firstName: user.firstName,
//           lastName: user.lastName,
//           email: user.email,
//           username: user.username
//       };
//       return res.json({ user: safeUser });
//   } else {
//       return res.json({ user: null });
//   }
// });


// Sign up
router.post('/', validateSignup, async (req, res, next) => {
  try {

      const { email, password, username, firstName, lastName } = req.body;

      const existingEmail = await User.findOne({
        where: {
          email: email
        }
      })
      
      if (existingEmail !== null) {
        const invalidEmail = new Error("User already exists");
        invalidEmail.status = 500;
        invalidEmail.errors = {
          "email": "User with that email already exists"
        }
        throw invalidEmail;
          }

      const existingUsername = await User.findOne({
        where: {
          username: username
        }
      })    

      if (existingUsername !== null) {
        const invalidUsername = new Error("User already exists");
        invalidUsername.status = 500;
        invalidUsername.errors = {
          "username": "User with that username already exists"
        };
        throw invalidUsername
      }

      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({ email, username, hashedPassword, firstName, lastName });

      const safeUser = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username: user.username,
          
      };

      await setTokenCookie(res, safeUser);
      return res.json({
          user: safeUser
      });

  } catch (e) {
      next(e)
  }
}
);

module.exports = router;
