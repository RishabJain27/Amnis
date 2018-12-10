// Defines the lecture schema to be stored in the database

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false); // To avoid deprecation warnings
const Schema = mongoose.Schema;

// Create the Question Schema
const QuestionSchema = new Schema({
	googleUserID: {
        type: String,       // GoogleID of the person who posted the question, required
        required: true
	},
	content: {
		type: String,       // Actual content of question that was asked, required
		required: true
	},
	score: {
		type: Number,       // The number of people who had the same question (based on upvotes)
		default: 0
    },
    lectureID: {
        type: Schema.Types.ObjectId,    // The lecture that this question was posted in, references Lecture schema
        ref: 'lectures',
        required: true
    },
    upvotes: [String],  // Array to hold all users that have updated this question
	date: {
		type: Date,     // Date/Time that this question was posted
		default: Date.now
	}
});

module.exports = Question = mongoose.model('question', QuestionSchema);