const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false); // To avoid deprecation warnings
const Schema = mongoose.Schema;

// Create Question Schema
const QuestionSchema = new Schema({
	googleUserID: {
        type: String,
        required: true
	},
	content: {
		type: String,
		required: true
	},
	score: {
		type: Number,
		default: 0
    },
    lectureID: {
        type: Schema.Types.ObjectId,
        ref: 'lectures',
        required: true
    },
    upvotes: [String],
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Question = mongoose.model('question', QuestionSchema);