const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const questions = require('./routes/api/questions');
const users = require('./routes/api/users'); 
const lectures = require('./routes/api/lectures'); // Get the schemas

const app = express();

//Parsing json
app.use(express.json());

// DB Config
const db = require('./config/keys').mongoURI; // Go to folder config/keys to find mongodb connection URI

mongoose
	.connect(db, {useNewUrlParser:true})
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err))
	
app.use(cors()); // Avoids errors with CORS requests between client and server

mongoose.set('useCreateIndex', true);

//User Routes
app.use('/api/questions', questions);
app.use('/api/users', users);
app.use('/api/lectures', lectures);

const port = process.env.PORT || 5000; // for use with heroku

app.listen(port, () => console.log(`Server started on port ${port}`));
