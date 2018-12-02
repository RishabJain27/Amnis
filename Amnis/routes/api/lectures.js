const express = require('express');
const router = express.Router();

// Question Model
const Lecture = require('../../models/Lecture');

// @route GET api/users
// @desc Get all users
// @access Public
router.get('/', (req, res) => {
	Lecture.find()
		.sort({name: -1})
		.then(lectures => res.json(lectures))
});

// @route GET api/users
// @desc Get specific user by ID
// @access Public
router.get('/:id', (req, res) => {
	Lecture.findOne({ googleUserID: req.params.id })
		.then(lecture => res.json(lecture))
		.catch(err => res.status(404).json({failure:true}));
});

// @route POST api/users
// @desc Post a user
// @access Public
router.post('/', (req, res) => {
	const newLecture = new Lecture({
		name: req.body.name,
		googleUserID: req.body.googleUserID,
		lectureUrl: req.body.lectureUrl
	});
	
	newLecture.save().then(lecture => res.json(lecture))
		.catch(err => console.log(err));
});

// @route DELETE api/users/:id
// @desc Delete a user
// @access Public
router.delete('/:id', (req, res) => {
	Lecture.findById(req.params.id)
		.then(lecture => lecture.remove().then(()=>res.json({success: true})))
		.catch(err => res.status(404).json({success:false}));
});

module.exports = router;