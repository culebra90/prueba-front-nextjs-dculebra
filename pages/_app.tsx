import '../styles/globals.css';

interface MyAppProps {
  Component: React.ComponentType;
  pageProps: any; // Aquí deberías especificar el tipo correcto de pageProps si es posible.
}

const MyApp: React.FC<MyAppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
