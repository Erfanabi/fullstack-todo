import Link from "next/link";
import { VscListSelection } from "react-icons/vsc";
import { BiMessageSquareAdd } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

function Layout({ children }) {
  const router = useRouter();

  const logOutHandler = () => {
    signOut();
  };

  return (
    <div className="container">
      <header>
        <p>Botostart Todo App</p>

        <button className="btn btn-logout" onClick={logOutHandler}>
          Logout
          <FiLogOut />
        </button>
      </header>

      <div className="container--main">
        <aside>
          <p>Welcome 👋</p>
          <ul>
            <li className={router.pathname == "/" ? "active" : ""}>
              <Link href="/">
                <VscListSelection />
                Todos
              </Link>
            </li>
            <li className={router.pathname == "/add-todo" ? "active" : ""}>
              <Link href="/add-todo">
                <BiMessageSquareAdd />
                Add Todo
              </Link>
            </li>
            <li className={router.pathname == "/profile" ? "active" : ""}>
              <Link href="/profile">
                <RxDashboard />
                Profile
              </Link>
            </li>
          </ul>
        </aside>

        <section>{children}</section>
      </div>
    </div>
  );
}

export default Layout;
