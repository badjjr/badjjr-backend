const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// INDEX
// GET /api/quizzes
router.get('/', async (req, res) => {
	try {
		const quizzes = await Quiz.find({});
		res.json(quizzes);
	} catch (err) {
		return res.sendStatus(400);
	}
});

// SHOW
// GET /api/quizzes/:id
router.get('/:id', async (req, res) => {
	try {
		const quiz = await Quiz.findById(req.params.id);
		res.json(quiz);
	} catch (err) {
		return res.sendStatus(400);
	}
});

// CREATE
// POST /api/quizzes
router.post('/', async (req, res, next) => {
	try {
		const newQuiz = await Quiz.create(req.body);
		if (newQuiz) {
			const quizzes = await Quiz.find({});

			// Send status code 202 Accepted.
			return res.status(202).json(quizzes);

		}
	} catch {
		return res.sendStatus(400);
	}
});

// UPDATE
// PUT /api/quizzes/:id
router.put('/:id', async (req, res, next) => {
	try {
		const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, req.body);
		if (updatedQuiz) {
			const quizzes = await Quiz.find({});
			return res.json(quizzes);
		}
	} catch (err) {
		return res.sendStatus(400);
	}
});

// DESTROY
// DELETE /api/quizzes/:id
router.delete('/:id', async (req, res, next) => {
	try {
		const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
		if (deletedQuiz) {
			const quizzes = await Quiz.find({});
			return res.json(quizzes);
		}
	} catch (err) {
		return res.sendStatus(400);
	}
});

module.exports = router;
