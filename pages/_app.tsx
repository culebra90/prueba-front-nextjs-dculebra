import '../styles/globals.css';
import { AppProps } from 'next/app';
import ErrorPage from 'next/error';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        //cacheTime: 24 * 60 * 60 * 1000, // 24 horas en milisegundos
        cacheTime: 0, // 24 horas en milisegundos
      },
    }
  })
  // Verificar si hay un error en las props y si el error es un error 404
  if ('statusCode' in pageProps && pageProps.statusCode === 404) {
    return (
      <ErrorPage statusCode={404} />
    );
  }

  // Si no hay error o el error no es 404, renderizar la página normalmente
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );  
};

export default MyApp;
