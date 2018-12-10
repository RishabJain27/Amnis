// Defines the express routes to do GET, POST, PUT, and DELETE requests
// pertaining to questions.

const express = require('express');
const router = express.Router();

// Question Model
const Question = require('../../models/Question');

// @route GET api/questions
// @desc Get all questions
// @access Public
router.get('/', (req, res) => {
	Question.find()
		.sort({score: -1, date: -1 })
		.then(questions => res.json(questions))
});

// @route GET api/questions/findLecture/:lectureID
// @desc Get all questions for a lecture
// @access Public
router.get('/findLecture/:id', (req, res) => {
	Question.find(({lectureID: req.params.id}))
		.sort({score: -1, date: -1 })
		.then(questions => res.json(questions))
});

// @route POST api/questions
// @desc Add a new question
// @access Public
router.post('/', (req, res) => {
	const newQuestion = new Question({
		content: req.body.content,
        score: req.body.score,
        lectureID: req.body.lectureID,
        googleUserID: req.body.googleUserID,
	});

	newQuestion.save().then(question => res.json(question)); // save to database
});

// @route PUT api/questions
// @desc Put/upvote a question
// @access Public
router.put('/upvote/:id', (req, res) => {
    Question.findById(req.params.id)
		.then(question => {
            question.score = question.score + 1;
            question.upvotes.unshift(req.body.googleID);
            question.save().then(()=>res.json(question));
        })
		.catch(err => res.status(404).json({success:false})); // status used for errors, res.json used for success
});

// @route PUT api/questions
// @desc Put/downvote a question
// @access Public
router.put('/downvote/:id', (req, res) => {
	Question.findById(req.params.id)
		.then(question => {
            question.score = question.score - 1;
            question.upvotes = question.upvotes.filter(q => q !== req.body.googleID);
            question.save().then(()=>res.json(question));
        })
		.catch(err => res.status(404).json({success:false})); // status used for errors, res.json used for success
});

// @route DELETE api/questions/:id
// @desc Delete a question
// @access Public
router.delete('/:id', (req, res) => {
	Question.findById(req.params.id)
		.then(question => question.remove().then(()=>res.json({success: true}))) // then() used with promises
		.catch(err => res.status(404).json({success:false})); // status used for errors, res.json used for success
});

module.exports = router;