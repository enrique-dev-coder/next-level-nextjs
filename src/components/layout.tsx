import { FunctionComponent, ReactNode } from "react";
import Link from "next/link";
import { useAuth } from "src/auth/useAuth";

//las interfaces se usan en react para declarar los tipos de propiedades

//reactnode es el tipado para bloques de react como el string o numbre
//por ejemplo el tipado para layuoyt es un componente de funcion
interface IProps {
  main: ReactNode;
}

const Layout: FunctionComponent<IProps> = ({ main }) => {
  const { logout, authenticated } = useAuth();
  //que regresa useAuth() --> el Auth.Contextcon value de user,logout y authenticated
  //const authenticated = false;
  //const logout = () => null;
  return (
    <div className="bg-gray-900  max-w-screen-2xl mx-auto text-white">
      <nav className="bg-gray-800 " style={{ height: "64px" }}>
        <div className="px-6 flex items-center justify-between h-16">
          <Link href="/">
            <a>
              <img
                src="/home-color.svg"
                alt="home logo"
                className="inline w-6"
              />
            </a>
          </Link>
          {authenticated ? (
            <>
              <Link href="/houses/add">
                <a>Add House</a>
              </Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link href="/auth">
                <a>Login/signup</a>
              </Link>
            </>
          )}
        </div>
      </nav>
      <main style={{ minHeight: "calc(100vh - 64px)" }}>{main}</main>
    </div>
  );
};
export default Layout;
