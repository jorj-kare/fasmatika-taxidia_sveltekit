import { model, Schema } from 'mongoose';

const postSchema = new Schema({
	title: {
		type: String,
		required: [true, 'Please provide a title']
	},
	content: {
		type: String,
		required: [true, 'You need to provide content']
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
