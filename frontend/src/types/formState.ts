export type AuthMode = 'login' | 'register';

export default interface FormState {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}
