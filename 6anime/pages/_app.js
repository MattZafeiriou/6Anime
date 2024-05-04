import '../styles/global.css';
import '../styles/Header.css';
import '../styles/Footer.css';
import '../styles/Main.css'
import '../styles/Sponsored.css'
import '../styles/Trending.css'
import '../styles/RandomVideo.css'
import '../styles/About.css'
import '../styles/Contact.css'
import '../styles/Donate.css'
import '../styles/AnimeList.css'
import '../styles/VideoPlayer.css'
import '../styles/Player.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
    <Head>
      <meta name="theme-color" content="#9b2727" />
      <meta property="og:image" content="/logo.png" />
    </Head>

    <div className='mainpage'>
      <Header/>
      <Component {...pageProps} />
    </div>
    <Footer/>
    </>
);
}