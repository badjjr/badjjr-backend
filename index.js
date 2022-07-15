//=============================================================================
// Basic Config
//=============================================================================
// Import express
const express = require('express');
// Instantiate express
const app = express();
// Set server port
app.set('port', process.env.PORT || 8000);

//=============================================================================
// Middleware
//=============================================================================
// Parse key value pairs in request
app.use(express.urlencoded({ extended: true }));
// Convert json strings to an object and attaches it to req.body
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

// Quizzes Controller
const quizzesController = require('./controllers/quizzesController');
app.use('/api/quizzes', quizzesController);

// Questions Controller
const questionsController = require('./controllers/questionsController');
app.use('/api/questions', questionsController);

// Users Controller
const usersController = require('./controllers/usersController');
app.use('/api/users', usersController);

//Redirect
app.all('*', (req, res) => {
	res.redirect('/');
});

//Error handling for user auth
const { handleErrors } = require('./middleware/custom_errors');
app.use(handleErrors);

//=============================================================================
// START SERVER
//=============================================================================
app.listen(app.get('port'), () => {
	console.log(`✅ BadJJR API 🦡 is listening on Port ${app.get('port')}`);
});
