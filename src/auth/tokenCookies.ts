import cookies from "js-cookie";

//aqui vamos a crear las funciones de los cookies
//la libreria que nos va a ayudar para esto es js cookie que ya trae funciones creadas
//obtener cookie
export const getTokenCookie = () => cookies.get("token");

//setear el cookie
export const setTokenCookie = (token: string) => {
  //nombre del cookie es token
  cookies.set("token", token, {
    expires: 1 / 24,
  });
};

//borrar el cookie
export const removeTokenCookie = () => cookies.remove("token");
