import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: [true, 'Το πεδίο όνομα χρήστη είναι υποχρεωτικό.'],
		minlength: [3, 'Το όνομα χρήστη πρέπει να περιέχει τουλάχιστον 5 χαρακτήρες.'],
		maxlength: [20, 'Το όνομα χρήστη πρέπει να μην ξεπερνάει τους 20 χαρακτήρες.'],
		trim: true
	},
	role: {
		type: String,
		default: 'user',
		select: false
	},
	password: {
		type: String,
		required: [true, 'Το πεδίο κωδικός είναι υποχρεωτικό.'],
		trim: true,
		minlength: [5, 'Ο κωδικός πρέπει να περιέχει τουλάχιστον 5 χαρακτήρες.'],
		select: false
	},
	confirmPassword: {
		type: String,
		trim: true,
		select: false,
		validate: {
			validator: function (val) {
				return val === this.password;
			},
			message: 'Οι κωδικοί δεν είναι ίδιοι.'
		}
	},
	profileImg: {
		type: String,
		required: [true, 'Το πεδίο φωτογραφία χρήστη είναι υποχρεωτικό.']
	},
	posts: {
		type: Schema.Types.ObjectId,
		ref: 'Post'
	}
});

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	this.password = await bcrypt.hash(this.password, 12);
	this.confirmPassword = undefined;
	next();
});
userSchema.methods.isPasswordCorrect = async function (candidatePassword, password) {
	return await bcrypt.compare(candidatePassword, password);
};
const User = model('User', userSchema);
export default User;
