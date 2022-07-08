const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// INDEX
// GET /api/quizzes
router.get('/', (req, res, next) => {
	Quiz.find()
		.then((quizzes) => res.json(books))
		.catch(next);
});

// SHOW
// GET /api/quizzes/:id
router.get('/:id', async (req, res, next) => {
	try {
		const quiz = await Quiz.findById(req.params.id);
		res.json(quiz);
	} catch (err) {
		next(err);
	}
});

// CREATE
// POST /api/quizzes
router.post('/', async (req, res, next) => {
	try {
		const newQuiz = await Quiz.create(req.body);
		Quiz.find({}).then((quizzes) => {
			// Send back 201 Created and the quizzes list with the newly add quiz
			return res.status(201).json(quizzes);
		});
	} catch (err) {
		next(err);
	}
});

// UPDATE
// PUT /api/quizzes/:id
router.put('/:id', async (req, res, next) => {
	try {
		const updateQuiz = await Quiz.findByIdAndUpdate(req.params.id, req.body);
		Quiz.find({}).then((quizzes) => {
			return res.json(quizzes);
		});
	} catch (err) {
		next(err);
	}
});

// DESTROY
// DELETE /api/quizzes/:id
router.delete('/:id', async (req, res, next) => {
	try {
		const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
		Quiz.find({}).then((quizzes) => {
			return res.json(quizzes);
		});
	} catch (err) {
		next(err);
	}
});

module.exports = router;
