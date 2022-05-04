import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from '../config/provider';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;
