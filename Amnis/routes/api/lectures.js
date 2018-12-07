const express = require('express');
const router = express.Router();

// Question Model
const Lecture = require('../../models/Lecture');

// @route GET api/lectures
// @desc Get all lectures
// @access Public
router.get('/', (req, res) => {
	Lecture.find()
		.sort({dateCreated: -1})
		.then(lectures => res.json(lectures))
});

// @route GET api/lectures/:id
// @desc Get specific lecture by Mongo's _id field
// @access Public
router.get('/:id', (req, res) => {
	Lecture.findById(req.params.id)
		.then(lecture => res.json(lecture))
		.catch(err => res.status(404).json({failure:true}));
});

// @route PUT api/lectures/tags/:id
// @desc Put/upvote a question
// @access Public
router.put('/tags/:id', (req, res) => {
    Lecture.findById(req.params.id)
		.then(lecture => {
            lecture.tags = req.body.tags;
            lecture.save().then(()=>res.json(lecture));
        })
		.catch(err => res.status(404).json({success:false})); // status used for errors, res.json used for success
});

// @route DELETE api/lectures/:id
// @desc Delete a lecture by ID
// @access Public
router.delete('/:id', (req, res) => {
	Lecture.findById(req.params.id)
		.then(lecture => lecture.remove().then(()=>res.json({success: true})))
		.catch(err => res.status(404).json({success:false}));
});

module.exports = router;