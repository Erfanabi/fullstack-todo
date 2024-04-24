import User from "../../../models/User";
import { hashPassword } from "../../../utils/auth";
import connectDB from "../../../utils/connectDB";

export default async function handler(req, res) {
  if (req.method !== "POST") return;

  //   connectDB
  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: "failed", message: "error in connecting to DB" });
    return;
  }

  const { email, password } = req.body;

  //   validate
  if (!email || !password) {
    return res.status(422).json({ status: "failed", message: "invalid data" });
  }

  //   existingUser
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res
      .status(422)
      .json({ status: "failed", message: "user exists already!" });
  }

  //   hashedPassword
  const hashedPassword = await hashPassword(password);

  //   create user
  const newUser = await User.create({ email, password: hashedPassword });
  res.status(201).json({
    status: "success",
    message: "user created!",
    data: newUser,
  });
}
