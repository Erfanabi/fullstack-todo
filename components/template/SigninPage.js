import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function SigninPage() {
  const router = useRouter();
  const { status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (status === "authenticated") router.replace("/");
  }, [router, status]);

  const loginHandler = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log(res);
    if (res.error) toast.error(res.error);
    if (!res.error) {
      toast.success("signin is success");
      router.replace("/");
    }
  };

  return (
    <div className="modal-signin-form">
      <div className="signin-form">
        <h3>Login Form</h3>
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
        <button onClick={loginHandler}>Login</button>
        <div>
          <p>Create an account?</p>
          <Link href="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default SigninPage;
