const User = require('../models/User');

// @desc Regisztráció
// @route POST /api/v1/user/register
// @access Public
exports.registerUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    return res.status(201).json({ success: true, data: { user, token } });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

// @desc Regisztrált felhasználó beléptetése
// @route POST /api/v1/user/login
// @access Public
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Hibás bejelentkezés! Valamit elgépelhettél vagy még nem is regisztráltál?'
      });
    }

    const token = await user.generateAuthToken();

    user.save();

    return res.json({ success: true, data: { user, token } });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};

// @desc Regisztrált felhasználó adatainak lekérése
// @route GET /api/v1/user/profile
// @access Private
exports.profile = async (req, res) => res.send(req.user);

// @desc Regisztrált felhasználó kiléptetése egy eszközről
// @route GET /api/v1/user/logout
// @access Private
exports.logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
    await req.user.save();
    res.json({ sucess: true });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

// @desc Regisztrált felhasználó kiléptetése minden eszközről
// @route GET /api/v1/user/logout-all
// @access Private
exports.logoutUserAll = async (req, res) => {
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.json({ sucess: true });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
