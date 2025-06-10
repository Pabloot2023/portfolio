import '@/styles/globals.css'; // Importa aquí el CSS global con Tailwind
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
