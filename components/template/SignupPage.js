import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function SignupPage() {
  const router = useRouter();
  const { status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (status === "authenticated") router.replace("/");
  }, [router, status]);

  const signUpHandler = async () => {
    axios
      .post("/api/auth/signup", {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data.message);
        toast.success(res.data.message);
        if (res.data.status === "success") router.push("/signin");
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="modal-signin-form">
      <div className="signin-form">
        <h3>Registration Form</h3>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signUpHandler}>Register</button>
        <div>
          <p>Have an account?</p>
          <Link href="/signin">Sign in</Link>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
