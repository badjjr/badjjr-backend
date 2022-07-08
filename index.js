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
app.use('/api', questionsController);

// // The catch all for handling errors
// const { handleErrors } = require('./middleware/custom_errors');
// app.use(handleErrors);

//=============================================================================
// START SERVER
//=============================================================================
app.listen(app.get('port'), () => {
	console.log(`✅ Listening on port ${app.get('port')}`);
});
