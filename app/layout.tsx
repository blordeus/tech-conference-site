import './globals.css';
import { Chakra_Petch, JetBrains_Mono } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import SessionProvider from '../components/SessionProvider.jsx';
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

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className={`${chakraPetch.variable} ${jetbrainsMono.variable}`}>
      <body>
        <SessionProvider session={session}>
          <a href="#main" className="skip-link">Skip to main content</a>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}