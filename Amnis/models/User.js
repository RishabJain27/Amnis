const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

// Create User Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
	googleUserID: {
		type: String,
		unique: true,
		required: true
	},
	isProfessor: {
		type: Boolean,
		default: false
	},
	dateJoined: {
		type: Date,
		default: Date.now
	}
});

module.exports = User = mongoose.model('user', UserSchema);