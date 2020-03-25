const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({ path: './config/config.env' });

const app = express();

// Adatbázishoz való csatlakozás
require('./config/db')();

// Adatokat a request testében, JSON formában fogadjuk
app.use(express.json());

// Lekérdezések loggolása konzolba
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'common'));

app.get('/health-check', async (_, res) => res.send('⚡ API szerver fut'));
app.use('/api/v1/entries', require('./routes/entry-route'));
app.use('/api/v1/user', require('./routes/user-route'));

const PORT = process.env.PORT || 5000;
// eslint-disable-next-line no-console
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
