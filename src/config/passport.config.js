import passport from 'passport';
import local from 'passport-local';
import { validatePassword } from '../helpers/createHash.js';
import UsersManagerMongo from '../dao/mongo/usersManagerMongo.js';
import { dateConnection } from '../helpers/dateConnection.js';
import userModel from '../dao/models/user.model.js';

const usersManagerMongo = new UsersManagerMongo();
const LocalStrategy = local.Strategy;

const initializePassport = () => {
	passport.serializeUser((user, done) => {
		done(null, user._id);
	});
  
	passport.deserializeUser(async (id, done) => {
		const user = await userModel.findById(id);
		done(null, user);
	});

	passport.use(
		'register',
		new LocalStrategy(
			{ passReqToCallback: true, usernameField: 'email' },
			async (req, username, password, done) => {
				const { first_name, last_name, email, role } = req.body;
				try {
					const newUser = await usersManagerMongo.createUser(
						first_name,
						last_name,
						email,
						password,
						role,
						username
					);
					if (!newUser) {
						const errorMessage = 'El usuario ya existe en la base de datos';
						return done(null, false, errorMessage);
					}
					return done(null, newUser);
				} catch (error) {
					return done('Error al registrar el usuario: ' + error);
				}
			}
		)
	);

	passport.use(
		'login',
		new LocalStrategy(
			{ usernameField: 'email' },
			async (username, password, done) => {
				try {
					const user = await usersManagerMongo.login(username);
					if (!user) {
						console.log('No existe el usuario');
						return done(null, false);
					}
					if (!validatePassword(password, user)) return done(null, false);
					user.last_connection = dateConnection();
					await user.save();
					return done(null, user);
				} catch (error) {
					return done('Error al intentar ingresar: ' + error);
				}
			}
		)
	);
};

export default initializePassport;
