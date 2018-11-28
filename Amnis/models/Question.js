const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false); // To avoid deprecation warnings
const Schema = mongoose.Schema;

// Create Question Schema
const QuestionSchema = new Schema({
	googleUserID: {
		type: String
	},
	content: {
		type: String,
		required: true
	},
	score: {
		type: Number,
		default: 0
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Question = mongoose.model('question', QuestionSchema);