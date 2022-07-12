const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// INDEX
// GET /api/Questions
router.get('/', async (req, res) => {
	try {
		const questions = await Question.find({});
		res.json(questions);
	} catch (err) {
		return res.sendStatus(400);
	}
});

// SHOW
// GET /api/Questions/:id
router.get('/:id', async (req, res) => {
	try {
		const question = await Question.findById(req.params.id);
		res.json(question);
	} catch (err) {
		return res.sendStatus(400);
	}
});

// CREATE
// POST /api/Questions

router.post('/', async (req, res, next) => {
	try {
		const newQuestion = req.body;
		const quizId = req.body.quizId;
		const quiz = await Quiz.findById(quizId)
			.then((quiz) => {
				quiz.questions.push(newQuestion);
				return quiz.save();
			})
			.then((updatedQuiz) => res.json(updatedQuiz));
	} catch (err) {
		return res.sendStatus(400);
	}
});

// UPDATE
// PUT /api/Questions/:id
router.put('/:id', async (req, res, next) => {
	try {
		const quizId = req.body.quizId;

		const quizzesId = await Quiz.findById(quizId).then((quiz) => {
			const quizToUpdate = quiz.questions.id(req.params.id);
			quizToUpdate.set(req.body);
			return quiz.save();
		});
		const updatedQuestion = await Question.findByIdAndUpdate(
			req.params.id,
			req.body
		);
		if (updatedQuestion) {
			const questions = await Question.find({});
			return res.json(questions);
		}
	} catch (err) {
		return res.sendStatus(400);
	}
});

// DESTROY
// DELETE /api/Questions/:id
router.delete('/:id', async (req, res, next) => {
	try {
		const deletedQuestion = await Quiz.findByIdAndDelete(req.params.id);
		if (deletedQuestion) {
			const question = await Question.find({});
			return res.json(question);
		}
	} catch (err) {
		return res.sendStatus(400);
	}
});

module.exports = router;
