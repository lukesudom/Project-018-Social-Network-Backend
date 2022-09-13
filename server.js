const mongoose = require('mongoose');
const db = require('./config/db-connect');
const express = require('express');
const { User, Thought } = require ('./models');

const PORT = process.env.PORT || 3001;

const routes = require ('./routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use(routes);

db.once('open', async () => {
    console.log('Database opened');

    await User.deleteMany({});
    await Thought.deleteMany({});

    await User.create({ username: 'Luke', email: 'Luke@gmail.com' });
    await User.create({ username: 'Michael', email: 'michael@gmail.com' });
    await User.create({ username: 'Tyler', email: 'tyler@outlook.com' });
    await User.create({ username: 'Samuel', email: 'Samuel@hotmail.com' });

    app.listen(PORT, () => {
        console.log(`Running on port ${PORT}...`);
    });
});