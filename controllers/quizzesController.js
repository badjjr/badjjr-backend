const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// INDEX: get all quizzes
// GET /api/quizzes
router.get('/', async (req, res) => {
	try {
		const quizzes = await Quiz.find({});
		res.json(quizzes);
	} catch (err) {
		return res.sendStatus(400);
	}
});

// SHOW: get quiz by id
// GET /api/quizzes/:id
router.get('/:id', async (req, res) => {
	try {
		const quiz = await Quiz.findById(req.params.id);
		res.json(quiz);
	} catch (err) {
		return res.sendStatus(400);
	}
});

// SHOW: get quizzes by category
// GET /api/quizzes/:category
router.get('/categories/:category', async (req, res) => {
	try {
		const quizCategory = req.params.category
		const quizzes = await Quiz.find({ category: quizCategory });
		res.json(quizzes)
	}
	catch {}
})

// CREATE: add new quiz
// POST /api/quizzes
router.post('/', async (req, res, next) => {
	try {
		console.log('first log:', req.body)
		const newQuiz = await Quiz.create(req.body);
		console.log('new quiz:', newQuiz)
		if (newQuiz) {
			const quizzes = await Quiz.find({});
			// Send status code 202 Accepted.
			return res.status(202).json(quizzes);
		}
	} catch (error) {
		console.log('error:', error)
		return res.sendStatus(400);
	}
});

// UPDATE: update quiz by id
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

// DELETE: remove quiz by id
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
