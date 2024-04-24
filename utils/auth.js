import { compare, hash } from "bcryptjs";

async function hashPassword(password) {
  //! رمزنگاری کن
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

async function verifyPassword(password, hashedPassword) {
  // ! password === hashedPassword
  // ! true or false
  const inValid = await compare(password, hashedPassword);
  return inValid;
}

export { hashPassword, verifyPassword };
