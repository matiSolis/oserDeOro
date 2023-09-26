import commentModel from '../models/comments.model.js';

export class CommentManagerMongo{
	constructor(){
		this.model = commentModel;
	}
	async createComment (comment, qualification) {
		if(!comment || !qualification){
			throw new Error ('Faltan datos.');
		}
		const newComment = {
			comment,
			qualification
		};
		const result = await this.model.create(newComment);
		return result;
	}
	async getComments () {
		const result = await this.model.find();
		return result;
	}
	async getCommentsById (id) {
		const result = await this.model.findById(id);
		return result;
	}
	async getCommentByQualification (qualification) {
		if(qualification === 'Positive'){
			const result = await this.model.findOne({qualification: Positive});
			return result;
		}else{
			const result = await this.model.findOne({qualification: Negative});
			return result;
		}
	}
}