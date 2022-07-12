//=============================================================================
// Basic Config
//=============================================================================
//Import express
const express = require('express');
//Instantiate express
const app = express();
//Set server port
app.set('port', process.env.PORT || 8000);

//=============================================================================
// Middleware
//=============================================================================
// Parses key value pairs in request
app.use(express.urlencoded({ extended: true }));
// Converts json strings to the an object and attaches it to req.body
app.use(express.json());
// Use cors package to allow connections from all domains
const cors = require('cors');
app.use(cors());

//=============================================================================
// ROUTES
//=============================================================================
// Redirect any requests to the homepage to quizzes API
app.get('/', (req, res) => {
	res.redirect('/api/quizzes');
});

//quizzes controller
const quizzesController = require('./controllers/quizzesController');
app.use('/api/quizzes/', quizzesController);

//questions controller
const questionsController = require('./controllers/questionsController');
app.use('/api/questions', questionsController);

//=============================================================================
// START SERVER
//=============================================================================
app.listen(app.get('port'), () => {
	console.log(`✅ BadJJR API 🦡 is listening on port ${app.get('port')}`);
});
