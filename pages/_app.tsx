import '../styles/globals.css';
import { AppProps } from 'next/app';
import ErrorPage from 'next/error';
import { store } from '../redux/store';
import { Provider } from 'react-redux';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {  
  // Verificar si hay un error en las props y si el error es un error 404
  if ('statusCode' in pageProps && pageProps.statusCode === 404) {
    return (
      <ErrorPage statusCode={404} />
    );
  }

  // Si no hay error o el error no es 404, renderizar la página normalmente
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );  
};

export default MyApp;
