const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

// Create User Schema
const LectureSchema = new Schema({
    name: {
        type: String,
        required: true
    },
	googleUserID: {
		type: String,
		unique: false,
		required: true
	},
	dateJoined: {
		type: Date,
		default: Date.now
	},
	lectureUrl: {
		type: String,
		required: true
	}
});

module.exports = Lecture = mongoose.model('lecture', LectureSchema);