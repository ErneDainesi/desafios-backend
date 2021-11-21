import nodemailer, {Transporter} from 'nodemailer';

export const transporter: Transporter = nodemailer.createTransport({
	host: 'smtp.ethereal.email',
	port: 587,
	auth: {
		user: 'weston.braun16@ethereal.email',
		pass: 'pyW8Zxh5dRs53EQRVN'
	}
});
