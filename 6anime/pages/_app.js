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
import '../styles/Disclaimer.css'
import '../styles/Tos.css'
import '../styles/Login.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from "next/head";

let theme = 1;
const themes = [0, 50, 100, 150, 200, 255]
function switchThemes(e) {
  const r = document.querySelector(':root');
  r.style.setProperty('--color', themes[theme]);
  theme++;
  if (theme >= themes.length) theme = 0;
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"></link>
      <i id="changeTheme" onClick={switchThemes} className="fa-solid fa-circle-half-stroke"></i>
      <Head>
        <meta name="theme-color" content="#9b2727" />
        <meta property="og:image" content="/logo.png" />
        <link href="/manifest.json" rel="manifest" />
      </Head>

      <div className='mainpage'>
        <Header />
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  );
}