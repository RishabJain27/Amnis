// Defines the user schema to be stored in the database

const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

// Create a User Schema
const UserSchema = new Schema({
    name: {
        type: String,   // Full name of the user, required
        required: true
    },
	googleUserID: {
		type: String,   // GoogleID of the user, required and unique
		unique: true,
		required: true
	},
	isProfessor: {
		type: Boolean,  // True when the user is a professor, false otherwise
		default: false
	},
	dateJoined: {
		type: Date,     // Date that the user joined
		default: Date.now
	}
});

module.exports = User = mongoose.model('user', UserSchema);