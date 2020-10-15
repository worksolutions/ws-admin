import PasswordValidator from "password-validator";

export const weakSchema = new PasswordValidator();
export const mediumSchema = new PasswordValidator();
export const strongSchema = new PasswordValidator();

weakSchema.is().min(1);
mediumSchema.is().min(6);
strongSchema.is().min(9);
