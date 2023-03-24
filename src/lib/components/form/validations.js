export function isPasswordsTheSame(password, confirmPassword) {
	if (password && password !== confirmPassword)
		return 'Passwords are not the same!';
}

export function isFieldEmpty(value, label = 'Field') {
	if (!value) return `${label} is required!`;
}
