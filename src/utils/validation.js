const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (email) => EMAIL_REGEX.test(email);

export const isValidPassword = (password) => password.length >= 6;

export const isRequired = (value) => value.trim().length > 0;
