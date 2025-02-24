const router = require('express').Router();
const controller = require('../Controllers/DogUsers');
const upload = require('../Middleware/multerConfig'); // Import multer middleware

// Call upload.single() and specify the field name from the frontend form
router.post('/signUp', (req, res, next) => {
    upload.single('profilePhoto')(req, res, (err) => {
      if (err) {
        console.error('Multer error:', err);
      }
      next();
    });
  }, controller.addUsers);


//get the user profile details
router.post('/login',controller.getUserDetails)

router.get('/swipeRight', controller.getAllUsers)

module.exports = router;
