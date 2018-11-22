const express = require('express');
const router = express.Router();

// Question Model
const User = require('../../models/User');

// @route GET api/users
// @desc Get all users
// @access Public
router.get('/', (req, res) => {
	User.find()
		.sort({userID: -1})
		.then(users => res.json(users))
});

// @route POST api/users
// @desc Post a user
// @access Public
router.post('/', (req, res) => {
	const newUser = new User({
		content: req.body.name
	});
	
	newUser.save().then(user => res.json(user));
});

// @route DELETE api/users/:id
// @desc Delete a user
// @access Public
router.delete('/:id', (req, res) => {
	User.findByID(req.params.id)
		.then(user => user.remove().then(()=>res.json({success: true})))
		.catch(err => res.status(404).json({success:false}));
});

module.exports = router;