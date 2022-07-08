//=============================================================================
// Basic Config
//=============================================================================
const express = require('express');
// instantiate express
const app = express();
//Require cors
const cors = require('cors');
//Set server port
app.set('port', process.env.PORT || 3000);

//=============================================================================
// Middleware
//=============================================================================
// `express.json` parses application/json request data and
//  adds it to the request object as request.body
app.use(express.json());
// `express.urlencoded` parses x-ww-form-urlencoded request data and
//  adds it to the request object as request.body
app.use(express.urlencoded({ extended: true }));
//Enable cross-origin resource sharing (aka let other websites make requests to our api)
app.use(cors());
//=============================================================================
// ROUTES
//=============================================================================
// Redirect
app.get('/', (req, res) => {
	res.redirect('/gifs');
});
/* START CONTROLLERS HERE */
const giphController = require('./controller/giphController.js');
//Delegate all requests to giphs to the controller
app.use('/gifs', giphController);

//quizzes controller
const quizzesController = require('./controllers/quizzesController');
app.use('/api/quizzes/', quizzesController);

//questions controller
const questionsController = require('./controllers/questionsController');
app.use('/api/questions', questionsController);


// // The catch all for handling errors
// const { handleErrors } = require('./middleware/custom_errors');
// app.use(handleErrors);

/* END CONTROLLERS HERE */
//=============================================================================
// START SERVER
//=============================================================================
app.listen(app.get('port'), () => {
	console.log(`✅ PORT: ${app.get('port')} 🌟`);
});
