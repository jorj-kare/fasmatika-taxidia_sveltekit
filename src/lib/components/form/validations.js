export function isPasswordsTheSame(password, confirmPassword) {
	if (password && password !== confirmPassword) return 'Οι κωδικοί δεν είναι ίδιοι';
}

export function isFieldEmpty(value, label = 'Πεδίο') {
	if (!value) return `${label}: το πεδίο είναι υποχρεωτικό`;
}
