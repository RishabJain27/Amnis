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

// @route POST api/questions
// @desc Post a question
// @access Public
router.post('/', (req, res) => {
	const newQuestion = new Question({
		content: req.body.content,
		score: req.body.score
	});

	newQuestion.save().then(question => res.json(question)); // save to database
});

// @route PUT api/questions
// @desc Put/upvote a question
// @access Public
router.put('/:id', (req, res) => {
	Question.findByIdAndUpdate(req.params.id,
		{
			$inc: { score: 1 }
		}).then((question)=>res.json({question})) // then() used with promises
		.catch(err => res.status(404).json({success:false}));
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