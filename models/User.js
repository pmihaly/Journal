const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Légyszi add meg a neved'],
    trim: true
  },
  profilePicture: {
    type: String
  },
  email: {
    type: String,
    required: [true, 'Légyszi add meg az email címedet'],
    unique: [
      true,
      'Már valaki regisztrált ezzel az email címmel, lehet, hogy már regisztráltál? 🤔'
    ],
    lowercase: true,
    validate: email => {
      if (!validator.isEmail(email)) throw new Error({ error: 'Helytelen email cím' });
    }
  },
  password: {
    type: String,
    required: [true, 'Pls adj meg egy jelszót'],
    minLength: 7
  },
  tokens: [{ token: { type: String, required: [true, 'Hoppá, elvesztetted a kulcsod'] } }]
});

userSchema.pre('save', async function preSaveHook(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  this.profilePicture = gravatar.url(this.email, { size: 500 }, true);

  next();
});

userSchema.methods.generateAuthToken = async function() {
  const { _id } = this;
  const token = jwt.sign({ __id: _id }, process.env.JWT_KEY);
  this.tokens = [...this.tokens, { token }];

  await this.save();
  return token;
};

// eslint-disable-next-line no-use-before-define
userSchema.statics.findByCredentials = async (email, password) => {
  // eslint-disable-next-line no-use-before-define
  const user = await User.findOne({ email });
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!user && !isPasswordMatch)
    throw new Error({ error: 'Nem találtam ilyen email címet és jelszót' });

  return user;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
