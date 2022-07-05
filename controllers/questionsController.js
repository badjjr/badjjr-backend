const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const Quiz = require('../models/Quiz');

// CREATE
// POST /api/questions
router.post('/', async (req, res) => {
	try {
		const newQuestion = req.body;
		const quizId = req.body.quizId;
		const findQuiz = await Quiz.findById(quizId)
			.then((quiz) => {
				quiz.questions.push(newQuestion);
				return quiz.save();
			})
			.then((updatedQuiz) => res.status(201).json(updatedQuiz));
	} catch (err) {
		return res.sendStatus(400);
	}
});

// UPDATE
// PUT /api/questions/:id
router.patch('/:id', async (req, res) => {
	try {
		//get body of updated question
		const updatedQuestion = req.body;
		//get id of question to be updated
		const questionId = req.params.id;
		//get id of quiz that holds question to be updated
		const quizId = req.body.quizId;
		//Find quiz using quiz id
		const findQuiz = await Quiz.findById(quizId)
			//Find question to be updated
			.then((quiz) => {
				const questionToUpdate = quiz.questions.id(questionId);
				//Update question
				questionToUpdate.set(updatedQuestion);
				return quiz.save();
			})
			.then((updatedQuiz) => res.status(201).json(updatedQuiz));
	} catch (err) {
		return res.sendStatus(400);
	}
});

// DESTROY
// DELETE /api/questions/:id
router.delete('/:id', async (req, res, next) => {
	try {
		const questionId = req.params.id;
		const deletedQuestion = await Quiz.findOne({ 'questions._id': questionId })
			.then((quiz) => {
				quiz.questions.id(questionId).remove();
				return quiz.save();
			})
			.then((updatedQuiz) => res.status(200).json(updatedQuiz));
	} catch (err) {
		return res.sendStatus(400);
	}
});

module.exports = router;
