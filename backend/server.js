const express = require('express');
const mongoose = require('mongoose');

const questions = require('./routes/api/questions');

const app = express();

//Parsing json
app.use(express.json());

// DB Config
const db = require('./config/keys').mongoURI; // Go to folder config/keys to find mongodb connection URI

mongoose
	.connect(db, {useNewUrlParser:true})
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));

//User Routes
app.use('/api/questions', questions);

const port = process.env.PORT || 5000; // for use with heroku

app.listen(port, () => console.log(`Server started on port ${port}`));
