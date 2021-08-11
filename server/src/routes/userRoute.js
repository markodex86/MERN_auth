const router = require('express').Router();
const userController = require('../controllers/userController');

const { isAuthenticated, signup } = require('../middlewares')

// Route mathces api/v1/user
router.get('/', (req, res) => {
  res.send({
    message: '💻'
  })
})
// Route mathces api/v1/user/signup
router.post('/signup', signup, userController.signup);

// Route mathces api/v1/user/login
router.post('/login', userController.login);


// Route mathces api/v1/user/dash
router.get('/dash', isAuthenticated, userController.findByID)
module.exports = router