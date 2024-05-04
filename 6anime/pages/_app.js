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
      <meta
        name="keywords"
        content="anime, free anime, 6anime, 9anime, anime streaming, anime online, anime hd, anime free, anime website, anime site, anime watch, anime watch online, anime watch free, anime watch hd, anime watch online free, anime watch online hd, anime watch free online, anime watch free hd, anime watch free online hd, anime watch free online english sub, anime watch free online english dub, anime watch free online english subbed, anime watch free online english dubbed, anime watch free online english subbed and dubbed, anime watch free online english subbed hd, anime watch free online english"
      />
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