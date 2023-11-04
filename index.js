require('dotenv').config();
require('./src/configs/db.config');

const express = require('express');
const app = express();
const PORT = process.env.PORT;

const usersRouter = require('./src/routes/users.route');
const authRouter = require('./src/routes/auth.route');

app.use(express.json());
app.use('/v1/users', usersRouter);
app.use('/v1/auth', authRouter);

app.listen(PORT, () => {
    console.log("API escuchando en el puerto " + PORT);
});