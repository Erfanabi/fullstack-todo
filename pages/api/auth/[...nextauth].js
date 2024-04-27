import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "../../../utils/connectDB";
import { verifyPassword } from "../../../utils/auth";
import User from "../../../models/User";

export const authOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;

        //   connectDB
        try {
          await connectDB();
        } catch (error) {
          throw new Error("Error in connecting to DB!");
        }

        //   validate
        if (!email || !password) {
          throw new Error("Invalid Data!");
        }

        //   findUser
        const user = await User.findOne({ email: email });
        if (!user) throw new Error("User doesn't exist!");

        //   compare password with hashPassword
        //   password in client with password write user
        const isValid = await verifyPassword(password, user.password);
        if (!isValid) throw new Error("Username or password is incorrect!");

        // for create token
        return { email };
      },
    }),
  ],
  secret: "LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=",
};

export default NextAuth(authOptions);
