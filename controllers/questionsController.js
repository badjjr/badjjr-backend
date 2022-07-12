const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const Quiz = require('../models/Quiz');

// CREATE: add new question
// POST /api/questions
router.post('/', async (req, res) => {
	try {
        //get body of new question
		const newQuestion = req.body;
        //get id of quiz to add question to
		const quizId = req.body.quizId;
		const findQuiz = await Quiz.findById(quizId)
			.then((quiz) => {
                //push the question to the quiz
				quiz.questions.push(newQuestion);
                //update quiz
				return quiz.save();
			})
            //return updated quiz
			.then((updatedQuiz) => res.status(201).json(updatedQuiz));
	} catch (err) {
		return res.sendStatus(400);
	}
});

// UPDATE: update question by id
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
            //return updated quiz
			.then((updatedQuiz) => res.status(201).json(updatedQuiz));
	} catch (err) {
		return res.sendStatus(400);
	}
});

// DELETE: Remove question by id
// DELETE /api/questions/:id
router.delete('/:id', async (req, res, next) => {
	try {
        //get id of question to be deleted
		const questionId = req.params.id;
        //Find quiz that contains the question id to be deleted
		const deletedQuestion = await Quiz.findOne({ 'questions._id': questionId })
			.then((quiz) => {
                //delete the question
				quiz.questions.id(questionId).remove();
                //save the quiz
				return quiz.save();
			})
            //return updated quiz
			.then((updatedQuiz) => res.status(200).json(updatedQuiz));
	} catch (err) {
		return res.sendStatus(400);
	}
});

module.exports = router;
