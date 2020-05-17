import { decodeError } from "../decodeErrors";

const errors = {
  email: "Поле обязательное для заполнения (email)",
  password: "Поле обязательное для заполнения (password)",
};

test("should be email error message when try get email", () => {
  expect(decodeError(errors, "email")).toBe(errors.email);
});

test("should be email error message when try get [email]", () => {
  expect(decodeError(errors, ["email"])).toBe(errors.email);
});

test("should be password error message when try get [password, email]", () => {
  expect(decodeError(errors, ["password", "email"])).toBe(errors.password);
});

test("should be 'Пароль: ' + password error message when try get [[password, Пароль], email]", () => {
  expect(decodeError(errors, [["password", "Пароль"], "email"])).toBe(
    `Пароль: ${errors.password}`,
  );
});

test("should be null when try get asd", () => {
  expect(decodeError(errors, "asd")).toBe(null);
});

test("should be null when try get [asd]", () => {
  expect(decodeError(errors, ["asd"])).toBe(null);
});

test("should be null when try get [[asd, Пароль]]", () => {
  expect(decodeError(errors, [["asd", "Пароль"]])).toBe(null);
});
