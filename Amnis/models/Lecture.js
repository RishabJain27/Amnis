const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

// Create User Schema
const LectureSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    lectureUrl: {
		type: String,
        required: true,
        unique: true
    },
    isLive: {
        type: Boolean,
        default: false
    },
	posterName: {
		type: String,
		required: true
    },
    posterGoogleID: {
        type: String,
        required: true
    },
    tags: [String],
	dateCreated: {
		type: Date,
		default: Date.now
	}
});

module.exports = Lecture = mongoose.model('lecture', LectureSchema);