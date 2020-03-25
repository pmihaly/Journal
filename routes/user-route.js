const router = require('express').Router();
const {
  registerUser,
  loginUser,
  profile,
  logoutUser,
  logoutUserAll
} = require('../controllers/user-controller');
const auth = require('../middlewares/auth');

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router
  .route('/profile')
  .all(auth)
  .get(profile);

router
  .route('/logout')
  .all(auth)
  .get(logoutUser);

router
  .route('/logout-all')
  .all(auth)
  .get(logoutUserAll);

module.exports = router;
