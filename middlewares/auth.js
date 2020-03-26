const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const data = jwt.verify(token, process.env.JWT_KEY);
    const { __id } = data;
    const user = await User.findOne({ _id: __id, 'tokens.token': token }).cache(10);
    if (!user) throw new Error();

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Azt hiszem, nem vagy bejelentkezve' });
  }
};
