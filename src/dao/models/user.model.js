import mongoose from 'mongoose';
import commentModel from './comments.model.js';

const collection = 'users';
const schema = new mongoose.Schema({
	first_name:{
		type: String,
		required: true
	},
	last_name:{
		type: String,
		required: true
	},
	email:{
		type: String,
		unique: true,
		required: true
	},
	password:String,
	comments:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'comments'
	},
	role:{
		type: String,
		required: true,
		enum: ['User', 'Admin'],
		default: 'User'
	},
	last_connection:{
		type: String,
		default: null
	}
});

schema.pre('save', async function (next) {
	if (!this.comments) {
		const newComment = await commentModel.create({ conmments: [] });
		this.comments = newComment._id;
	}
	next();
});
const userModel = mongoose.model(collection, schema);
export default userModel;