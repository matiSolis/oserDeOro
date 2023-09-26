import mongoose from 'mongoose';

const collection = 'comments';
const schema = new mongoose.Schema({
	conmments: {
		type: [
			{
				comment: {
					type: String,
					required: true
				},
				qualification: {
					type: String,
					enum:['Positive', 'Negative', 'None'],
					required: true,
					default: 'None'
				}
			}
		],
		default: []
	}
});
const commentModel = mongoose.model(collection, schema);
export default commentModel;