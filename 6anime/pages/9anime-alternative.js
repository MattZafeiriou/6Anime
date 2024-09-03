import { useEffect } from 'react';
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Alternative({ data }) {
    useEffect(() => {
        document.title = "9Anime Alternative Websites (2024)";
    }, []);

    return (
        <>
            <Head>
                <title>9Anime Alternative Websites (2024)</title>
                <meta property="og:title" content="6Anime - 9Anime Alternative" />
                <meta
                    property="og:description"
                    content="6Anime: Alternatives to 9anime and aniwave shutdowns."
                />
            </Head>
            <div className="blog">
                <h1>9Anime has Shutdown. Now What?</h1>
                <div className='tabinside'>
                    <p>
                        <b>9Anime</b>, recently also known as <b>Aniwave</b>, has been shutdown. <br />This has
                        left many anime fans without a place to watch their favorite anime
                        series. But don't worry, there are plenty of alternatives to 9Anime
                        that you can use to watch anime online. Here are some of the best
                        alternatives to 9Anime:
                        <br /><br />
                    </p>
                </div>
                <h2>Alternative Websites</h2>
                <div className='tabinside'>
                    <br />
                    <h3><a href="https://6anime.tv" rel='noreferrer noopener nofollow' target="_blank"><b>6Anime.tv</b> <i className="fa-solid fa-arrow-up-right-from-square"></i></a></h3>
                    <div className='tabinside'>
                        <p>
                            6Anime is a website that allows you to watch anime online for free.
                            The website has a wide selection of anime series and movies, and you
                            can watch them in high quality. The website is easy to use and has a
                            clean interface, making it a great alternative to 9Anime.
                        </p>
                        <div className='pros'>
                            <h5><b>Pros:</b></h5>
                            <ul>
                                <li>No ads</li>
                                <li>Wide selection of anime series and movies</li>
                                <li>High quality videos</li>
                                <li>Easy to use interface</li>
                                <li>Free to use</li>
                            </ul>
                        </div>
                        <div className='cons'>
                            <h5><b>Cons:</b></h5>
                            <ul>
                                <li>Not as many anime series as 9Anime</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='tabinside'>
                    <br />
                    <br />
                    <br />
                    <h3><a href="https://9animetv.to/" rel='noreferrer noopener nofollow' target="_blank"><b>9animetv.to</b> <i className="fa-solid fa-arrow-up-right-from-square"></i></a></h3>
                    <div className='tabinside'>
                        <p>
                            9AnimeTV.to is a website that allows you to watch anime online for free.
                            Even though the original 9Anime has been shutdown, 9AnimeTV.to is still
                            up and running. The website has a wide selection of anime series and movies,
                            and you can watch them in high quality. The website is easy to use and has a
                            clean interface, making it a great alternative to 9Anime.
                        </p>
                        <div className='pros'>
                            <h5><b>Pros:</b></h5>
                            <ul>
                                <li>Wide selection of anime series and movies</li>
                                <li>High quality videos</li>
                                <li>Easy to use interface</li>
                                <li>Free to use</li>
                                <li>Similar to the original 9Anime</li>
                            </ul>
                        </div>
                        <div className='cons'>
                            <h5><b>Cons:</b></h5>
                            <ul>
                                <li>Not the original 9Anime</li>
                                <li>Many ads</li>
                                <li>Many popups</li>
                                <li>Not as many anime series as 9Anime</li>
                                <li>Not official, which can make it less reliable</li>
                            </ul>
                        </div>
                    </div>
                </div>
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