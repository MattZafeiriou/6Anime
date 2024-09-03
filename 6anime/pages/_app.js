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
import '../styles/Blog.css'
import '../styles/VideoPlayer.css'
import '../styles/Player.css'
import '../styles/Disclaimer.css'
import '../styles/Tos.css'
import '../styles/Login.css'
import '../styles/Profile.css'
import '../styles/pace.css'
import '../styles/Admin.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Toasts from '../components/Toasts';
import Footer from '../components/Footer';
import Head from "next/head";
import { useEffect } from 'react';
import { appWithTranslation } from 'next-i18next';
import nextI18NextConfig, { i18n } from '../next-i18next.config.js';
import { useTranslation } from 'react-i18next';

let theme = 1;
const themes = [0, 50, 100, 150, 200, 255]
function switchThemes() {
  const r = document.querySelector(':root');
  r.style.setProperty('--color', themes[theme]);
  theme++;
  setCookie('theme', theme - 1, 365);
  if (theme >= themes.length) theme = 0;
}

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/; SameSite=None; Secure";
}

function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function App({ Component, pageProps, data }) {
  useEffect(() => {
    if (getCookie('theme') === null) {
      setCookie('theme', '0', 365);
    } else {
      theme = parseInt(getCookie('theme'));
      switchThemes();
    }

    setInterval(() => {
      //(AdProvider = window.AdProvider || []).push({"serve": {}});
    }, 100);
  });

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"></link>
      <script src="https://cdn.jsdelivr.net/npm/pace-js@latest/pace.min.js"></script>
      <link rel="icon" href="/favicon.ico" />
      <i id="changeTheme" onClick={switchThemes} className="fa-solid fa-circle-half-stroke"></i>
      <i id="changeLang" onClick={
        () => {
          if (getCookie('lang') === 'ja')
            setCookie('lang', 'en', 365);
          else
            setCookie('lang', 'ja', 365);
          window.location.reload();
        }
      } className="fa-solid fa-language"></i>
      <Head>
        <meta httpEquiv='content-language' content='en' />
        <meta name="theme-color" content="#9b2727" />
        <meta property="og:image" content="/logo.png" />
        <link href="/manifest.json" rel="manifest" />
        <meta
          name="keywords"
          content="9anime alternative, aniwave alternative, anime, free anime, attack on titan, naruto, one piece, 6anime.tv, 6anime, hd anime, watch anime, movies, series"
        />
      </Head>
      {/* <script async type="application/javascript" src="https://a.magsrv.com/ad-provider.js"></script> */}

      <div className='mainpage'>
        <Header />
        <Component {...pageProps} />
      </div>
      <Toasts />
      <Footer />
    </>
  );
}

export default appWithTranslation(App, nextI18NextConfig);