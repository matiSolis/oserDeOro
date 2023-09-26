import { transporter } from '../config/gmail.js';

//cuerpo de mail
const emailTemplate = `<div>
<h1>Oficialmente eres bienvenido al website de los OSER D'ORO 2023!!</h1>
<img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fzonagayweb.com%2Fcosas-que-nunca-debes-hacerle-a-un-pene%2F&psig=AOvVaw2IniaSl9wfu7tfsf2Eh7IE&ust=1695759828733000&source=images&cd=vfe&opi=89978449&ved=0CA4QjRxqFwoTCNj_g-bLxoEDFQAAAAAdAAAAABAf" style="width:250px"/>
<p>Tu registro fue realizado exitosamente.<br/>
Si queres ver las ternas de este año clickea <a href="https://www.lemonparty.org/">AQUI</a></p>

</div>`;

export const sendMailRegister = async (user) => {
	const email = await transporter.sendMail({
		from:'OSER D\'ORO',
		to:`${user.email}`,
		subject:'OSER D`ORO REGISTRO EXITOSO',
		html: emailTemplate
	});
	return email;
};