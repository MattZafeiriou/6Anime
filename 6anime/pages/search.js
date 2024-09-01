import AnimeList from '../components/AnimeList';
import { useEffect } from 'react';
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Search() {

    useEffect(() => {
        document.getElementById("searchanimebutton").click();
    }, []);
    let search = "";
    if (typeof window !== "undefined") {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        search = decodeURI(urlParams.get('search'));
    }

    return (
        <>
            <Head>
                <title>6Anime - Search: {(search === 'null') ? "" : search}</title>
            </Head>
            <AnimeList startInput={search} />
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