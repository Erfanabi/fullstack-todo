import { getSession } from "next-auth/react";
import connectDB from "../../utils/connectDB";
import User from "../../models/User";
import fiterTodos from "../../utils/fiterTodos";

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
    const { title, status } = req.body;

    //   validate
    if (!title || title.length < 3) {
      return res.status(422).json({
        status: "failed",
        message: "Title is empty or less then 3 char",
      });
    }
    if (!status) {
      return res
        .status(422)
        .json({ status: "failed", message: "select status" });
    }

    // push todo
    user.todos.push({ title, status });
    user.save();

    res.status(201).json({
      status: "success",
      message: "Todo created!",
      data: { title, status },
    });
  } else if (req.method === "GET") {
    const { sortedData } = fiterTodos(user.todos);

    res.status(200).json({
      status: "success",
      todos: sortedData,
    });
  } else if (req.method === "PATCH") {
    const { id, status } = req.body;

    if (!id || !status) {
      return res
        .status(422)
        .json({ status: "failed", message: "Invalid data!" });
    }

    const result = await User.updateOne(
      { "todos._id": id },
      { $set: { "todos.$.status": status } }
    );
    console.log(result);
    res.status(200).json({ status: "success", result });
  }
}
