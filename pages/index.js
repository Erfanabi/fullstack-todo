import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import HomePage from "../components/template/HomePage";

function Home() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/signup");
  }, [router, status]);

  return <HomePage />;
}

export default Home;

// export async function getServerSideProps({ req }) {
//   const session = await getSession({ req });
//   console.log(session);

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/signin",
//         permanent: false,
//       },
//     };
//   }

//   return { props: {} };
// }
