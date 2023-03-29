import { model, Schema } from 'mongoose';

const postSchema = new Schema({
	title: {
		type: String,
		required: [true, 'Το πεδίο τίτλος είναι υποχρεωτικό.']
	},
	content: {
		type: String,
		required: [true, 'Το πεδίο περιεχόμενο είναι υποχρεωτικό.']
	},
	img: {
		type: String
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	createdAt: {
		type: Date,
		default: Date.now(),
		immutable: true
	},
	stars: {
		type: [String]
	}
});

const Post = model('Post', postSchema);
export default Post;
