import './globals.css';
import { Chakra_Petch, JetBrains_Mono } from 'next/font/google';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const chakraPetch = Chakra_Petch({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: 'DevHorizon 26',
  description: 'A three-day conference for engineers who build the interfaces humans use every day.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${chakraPetch.variable} ${jetbrainsMono.variable}`}>
      <body>
        <a href="#main" className="skip-link">Skip to main content</a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}