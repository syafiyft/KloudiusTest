const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (email: string): boolean => EMAIL_REGEX.test(email);

export const isValidPassword = (password: string): boolean => password.length >= 6;

export const isRequired = (value: string): boolean => value.trim().length > 0;
