import { useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import Head from 'next/head'

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
            <meta
              name="keywords"
              content="anime, free anime, 6anime, 9anime, anime streaming, anime online, anime hd, anime free, anime website, anime site, anime watch, anime watch online, anime watch free, anime watch hd, anime watch online free, anime watch online hd, anime watch free online, anime watch free hd, anime watch free online hd, anime watch free online english sub, anime watch free online english dub, anime watch free online english subbed, anime watch free online english dubbed, anime watch free online english subbed and dubbed, anime watch free online english subbed hd, anime watch free online english"
            />
        </Head>
        <div className="aboutmain">
            <h1>About Us</h1>
            <br/>
            <p>6Anime is a free service that provides a platform for users to watch Anime series and movies. We provide a wide range of Anime series and movies for free. We do not own any of the content on this website, all of the content is owned by their respective owners.</p>
            <p>Our goal is to provide a free and easy way to watch Anime series and movies. We are constantly updating our website with new content to provide the best experience for our users.</p>
            <p>If you have any questions or concerns, please feel free to contact us through our <a href='/contact'>contact page</a>.</p>
            <br/>
            <h1>Frequently Asked Questions</h1>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>What is the purpose of this website?</Accordion.Header>
              <Accordion.Body>
                The purpose of this website is to provide a free and easy way to watch Anime series and movies. We do not own any of the content on this website, all of the content is owned by their respective owners.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>How do I watch Anime on this website?</Accordion.Header>
              <Accordion.Body>
                To watch Anime on this website, simply search for the Anime series or movie you want to watch and click on the episode or movie you want to watch. You can also browse through our collection of Anime series and movies to find something to watch.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Is this website free to use?</Accordion.Header>
              <Accordion.Body>
                Yes, this website is completely free to use. We do not charge any fees for watching Anime on this website.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Do I need to create an account to watch Anime on this website?</Accordion.Header>
              <Accordion.Body>
                No, you do not need to create an account to watch Anime on this website. You can watch Anime on this website without creating an account.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>How do I contact the website admin?</Accordion.Header>
              <Accordion.Body>
                If you have any questions or concerns, please feel free to contact us through our <a href='/contact'>contact page</a>.
              </Accordion.Body>
            </Accordion.Item>
            
          </Accordion>
        </div>
    </>
    );
}