import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: [true, 'Username field is required.'],
		minlength: [3, 'Username must contain minimum 3 characters.'],
		maxlength: [20, 'Username length must not be more than 20 characters.'],
		trim: true
	},
	role: {
		type: String,
		default: 'user',
		select: false
	},
	password: {
		type: String,
		required: [true, 'Password field is required.'],
		trim: true,
		minlength: [5, 'You must provide a password tha contains at least 5 characters.'],
		select: false
	},
	confirmPassword: {
		type: String,
		required: [true, 'Please confirm your password.'],
		trim: true,
		select: false,
		validate: {
			validator: function (val) {
				return val === this.password;
			},
			message: 'Passwords are not the same'
		}
	},
	profileImg: {
		type: String
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
