// Defines the lecture schema to be stored in the database

const mongoose = require('mongoose'); // Setting up mongoose to create the schema
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

// Create the Lecture Schema
const LectureSchema = new Schema({
    title: {
        type: String,   // Title of the Lecture, required
        required: true
    },
    description: {
        type: String,   // Description of the Lecture
        default: ""
    },
    lectureUrl: {
		type: String,   // URL for the Lecture, required and unique
        required: true,
        unique: true
    },
    isLive: {
        type: Boolean,  // True when the Lecture is live, false otherwise
        default: false
    },
	posterName: {
		type: String,   // Name of professor who posted the Lecture, required
		required: true
    },
    posterGoogleID: {
        type: String,   // GoogleID of the professor who posted the Lecture, required
        required: true
    },
    tags: [
        {
            name: String,   // Tags to be shown alongside the video, contain a tag name and
            val: Number     // the number of times that tag was mentioned
        }
    ],
	dateCreated: {
		type: Date,         // Date that the lecture was created
		default: Date.now
	}
});

module.exports = Lecture = mongoose.model('lecture', LectureSchema);