const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// INDEX: Get all quizzes
// GET /api/quizzes
router.get('/', async (req, res) => {
	try {
		const quizzes = await Quiz.find({});
		res.json(quizzes);
	} catch (err) {
		console.log('Something went wrong...', err);
		return res.sendStatus(400);
	}
});

// SHOW: Get quiz by id
// GET /api/quizzes/:id
router.get('/:id', async (req, res) => {
	try {
		const quiz = await Quiz.findById(req.params.id);
		res.json(quiz);
	} catch (err) {
		console.log('Something went wrong...', err);
		return res.sendStatus(400);
	}
});

// SHOW: Get quizzes by category
// GET /api/quizzes/:category
router.get('/categories/:category', async (req, res) => {
	try {
		const quizCategory = req.params.category;
		const quizzes = await Quiz.find({ category: quizCategory });
		res.json(quizzes);
	} catch (err) {
		console.log('Something went wrong...', err);
		return res.sendStatus(400);
	}
});

// CREATE: Add new quiz
// POST /api/quizzes
router.post('/', async (req, res, next) => {
	try {
		const newQuiz = await Quiz.create(req.body);
		if (newQuiz) {
			const quizzes = await Quiz.find({});
			// Send status code 202 Accepted.
			return res.status(202).json(quizzes);
		}
	} catch (err) {
		console.log('Something went wrong...', err);
		res.sendStatus(400);
		next(err);
	}
});

// UPDATE: Update quiz by id
// PATCH /api/quizzes/:id
router.patch('/:id', async (req, res, next) => {
	try {
		const quiz = await Quiz.findById(req.params.id);
			Quiz.findByIdAndUpdate(req.params.id, req.body, {new: true})
			.then((quiz) => res.json(quiz))
			.catch(next)

	} catch (err) {
		console.log('Something went wrong...', err);
		res.sendStatus(400);
		next(err);
	}
});

// DELETE: Remove quiz by id
// DELETE /api/quizzes/:id
router.delete('/:id', async (req, res, next) => {
	try {
		const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
		if (deletedQuiz) {
			const quizzes = await Quiz.find({});
			return res.json(quizzes);
		}
	} catch (err) {
		console.log('Something went wrong...', err);
		res.sendStatus(400);
		error(next);
	}
});

module.exports = router;
