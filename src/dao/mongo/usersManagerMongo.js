import userModel from '../models/user.model.js';
import { createHash } from '../../helpers/createHash.js';

export class UserManagerMongo {
	constructor(){
		this.model = userModel;
	}
	async createUser (first_name, last_name, email, password, role, last_connection) {
		if (!first_name || !last_name || !email || !password || !role || !last_connection) {
			throw new Error('Faltan datos');
		}
		const newUser = {
			first_name,
			last_name,
			email,
			password:  createHash(password),
			last_connection,
			role: 'User'
		};
		const result = await this.model.create(newUser);
		return result;
	}
	async getUsers () {
		const result = await this.model.find();
		return result;
	}
	async getUserByEmail (username) {
		const result = await this.model.findOne({ email: username });
		return result;
	}
	async getUserById (id) {
		const result = await this.model.findById(id);
		return result;
	}
	async login (username) {
		try {
			const user = await this.model.findOne({ email: username }).exec();
			if (!user) {
				console.log('Es necesario registrarse');
				return false;
			}
			return user;
		} catch (error) {
			console.error(error);
			return false;
		}
	}
}