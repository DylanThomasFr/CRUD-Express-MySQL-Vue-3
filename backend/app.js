const express = require('express');
const path = require('path')
require('dotenv').config({path: path.resolve('.env')})

// Database
const db = require('./config/database')
db.authenticate()
    .then(() => console.log('Database connected !'))
    .catch(error => console.log(error))

// Constants
const PORT = process.env.API_PORT || 3000;

// App
const app = express();
app.get('/', (req, res) => {
    res.send('Express up !');
});

// Routes
app.use('/posts', require('./routes/posts'))
app.use('/users', require('./routes/users'))

app.listen(PORT, console.log(`Running on port : ${PORT}`));
