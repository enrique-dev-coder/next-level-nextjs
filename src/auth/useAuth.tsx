import {
  useEffect,
  useState,
  useContext,
  createContext,
  FunctionComponent,
} from "react";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import "firebase/auth";
//llamas a la funcion de inicar firebase
import initFirebase from "./initFirebase";
import { removeTokenCookie, setTokenCookie } from "./tokenCookies";

//llamamos la funcion
initFirebase();

//ahora tenemos que crear un contexto para que se englobe un estado a toda la operacion
//esto se hace con el hook de create Context
// en el contexto estan los valores iniciales que va a tener la app

//interface para el context
//NOTA. al aparecer una interface puede tener chingos de tipos hasta objetos
//el logout es un void porque no regresa nada y el | es un or
interface IAuthContext {
  user: firebase.User | null;
  logout: () => void;
  authenticated: boolean;
}

// en el <> pasamos la interface al componente
const AuthContext = createContext<IAuthContext>({
  user: null,
  logout: () => null,
  authenticated: false,
});

//es del tipo fucntion provider para recibir children
//el .Provider es creo una propiedad de createcontext
//el provider siempre requiere un valor , en este caso le pasaremos user,logout y authenticated
export const AuthProvider: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const router = useRouter();
  const logout = () => {
    //funcion para dar logout de la app de firebase
    //la funcion regresa una promesa y usamos el then para resolverla
    firebase
      .auth()
      .signOut()
      .then(() => {
        router.push("/");
      })
      .catch((e) => {
        console.error(e);
      });
  };
  //setear el usuario
  // aqui usamos un useEffect para que funcione solo al inicio
  //e- onIdTokenChanged es un evento que registra cambios en el token de usuario
  //si no hay usuario de tipo firebase recibe un null en el que llama a la fucnion de remover token
  useEffect(() => {
    const cancelAuthListener = firebase
      .auth()
      .onIdTokenChanged(async (user) => {
        if (user) {
          //generamos el token con la funcion de getIdToken
          const token = await user.getIdToken();
          setTokenCookie(token);
          setUser(user);
        } else {
          removeTokenCookie();
          setUser(null);
        }
      });
    // regresa una funcion cuando el componente se desmonte
    return () => {
      cancelAuthListener();
    };
  }, []);

  // el !!user convierte un valor en un boolean
  return (
    <AuthContext.Provider value={{ user, logout, authenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

//aqui se va  ahacer un hook para dar acceso a toda la aplicacion al auth provider
export function useAuth() {
  return useContext(AuthContext);
}

// en resumen
//1.- se inicio firebase
//2.-se hizo un componente que reciba el contexto con useContext y las interfaces que reciba children osea todas las paginas de la app
// se hizo un hook para que se pueda accedar al auth provider sin pasar props desde arriba hasta los hijos
