const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config({path: './config/.env'});
const userRoutes = require('./routes/userRoutes')
require('./config/db');
const {checkUser, requireAuth} = require('./middleware/authMiddlerware')
const cors = require('cors');

const app = express();

// const corsOptions = {
//   origin: process.env.REACT_APP_API_URL,
//   credentials: true,
//   'allowedHeaders': ['sessionId', 'Content-Type'],
//   'exposedHeaders': ['sessionId'],
//   'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   'preflightContinue': false
// }

app.use(cors());
app.use(express.json())

// app.get('*', checkUser);
// app.get('/jwtid', requireAuth, (req, res) => {
//   res.status(200).send(res.locals.user._id)
// });

app.use('/api/user', userRoutes);



app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  })