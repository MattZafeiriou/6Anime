import { useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function About({ data }) {
  useEffect(() => {
    document.title = "6Anime - About";
    document.getElementById("about").classList.add("active");
    document.getElementById("aboutm").classList.add("active");
  }, []);

  return (
    <>
      <Head>
        <title>6Anime - About</title>
        <meta property="og:title" content="6Anime - About" />
        <meta
          property="og:description"
          content="6Anime: Your ultimate anime destination. Enjoy free, competitive streaming with access to any anime you desire."
        />
      </Head>
      <div className="aboutmain">
        <h1>About Us</h1>
        <p>6Anime is an anime streaming service that is safe and easy to use. It provides a wide range of anime series, movies, and OVAs such as Naruto, One Piece, Dragon Ball, Attack on Titan, My Hero Academia, and many more. 6Anime is a free website that allows you to watch anime without any restrictions. You can watch anime on 6Anime without creating an account. 6Anime is the best place to watch anime online for free. We update our website regularly with the latest anime series and movies. You can watch anime on 6Anime on any device, including your PC, laptop, tablet, and smartphone. 6Anime is the ultimate anime destination for all anime lovers. Enjoy free, competitive streaming with access to any anime you desire.</p>
        <br />
        <h2 id="faqh2">Frequently Asked Questions</h2>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Is 6Anime.tv safe to use?</Accordion.Header>
            <Accordion.Body>
              Yes, 6Anime.tv is a safe website. It does not contain any malware or viruses. You can watch anime on 6Anime without any worries.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Does 6Anime.tv have advertisemenets?</Accordion.Header>
            <Accordion.Body>
              No, 6Anime.tv does not have any advertisements. You can watch anime on 6Anime without any interruptions.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>What anime can I watch on 6Anime.tv?</Accordion.Header>
            <Accordion.Body>
              You can watch a wide range of anime series, movies, and OVAs on 6Anime.tv. Some of the popular anime series available on 6Anime.tv include Naruto, One Piece, Dragon Ball, Attack on Titan, My Hero Academia, and many more.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Do I need to create an account to watch Anime on this website?</Accordion.Header>
            <Accordion.Body>
              No, you do not need to create an account to watch Anime on this website. You can watch Anime on this website without creating an account.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>Why should I prefer 6Anime.tv?</Accordion.Header>
            <Accordion.Body>
              6Anime.tv is a website that has no advertisements, it is safe to use, and you can watch a wide range of anime series, movies, and OVAs on this website. You can watch anime on 6Anime.tv without any restrictions. 6Anime.tv is the best place to watch anime online for free.
            </Accordion.Body>
          </Accordion.Item>

        </Accordion>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const languageHandler = require('../lib/languageHandler');

  return {
      props: {
          ...(await serverSideTranslations(languageHandler.getLanguage(context), ['common'])),
      }
  }
}