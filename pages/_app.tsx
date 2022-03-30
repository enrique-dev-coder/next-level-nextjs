import { AppProps } from "next/app";
import Head from "next/head";
// import { ApolloProvider } from "@apollo/client";
// import { useApollo } from "src/apollo";
// import { AuthProvider } from "src/auth/useAuth";
//importar estilos de tailwind que vienen de la carpeta de styles/index.css
import "../styles/index.css";

//aqui en app se van poniendo todos los providers porque engloban todas las paginas de la app

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Home sweet Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />;
    </>
  );
}

//la configuracion de babel , que es un compilador , es para ser compatible con typescript y graphql
//el postcss.config.js file es para que se purgen todas las clases de tailwind sin usar
//en el tsconfig.json hay una opcion muy interesante que dice baseUrl: ".", esto sirve para poder  hacer los imports desde el folder /src/componentes en vez de /../../src/
