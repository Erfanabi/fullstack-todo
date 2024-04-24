import { getSession } from "next-auth/react";
import connectDB from "../../utils/connectDB";
import User from "../../models/User";
import { verifyPassword } from "../../utils/auth";

export default async function handler(req, res) {
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

  //   get token
  const session = await getSession({ req });
  if (!session) {
    return res
      .status(401)
      .json({ status: "failed", message: "You are not logged in!" });
  }

  //   findUser
  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User doesn't exist!" });
  }

  if (req.method === "POST") {
    //   get inputData
    const { name, lastName, password } = req.body;

    //   validate
    if (!name || !lastName) {
      return res
        .status(422)
        .json({ status: "failed", message: "name or lastName is empty" });
    }

    //   compare password with hashPassword
    //   password in client with password write user
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return res.status(422).json({
        status: "failed",
        message: "password is incorrect!",
      });
    }

    user.name = name;
    user.lastName = lastName;
    user.save();
    res.status(200).json({
      status: "success",
      data: { name, lastName, email: session.user.email },
    });
  } else if (req.method === "GET") {
    res.status(200).json({
      status: "success",
      data: { name: user.name, lastName: user.lastName, email: user.email },
    });
  }
}
