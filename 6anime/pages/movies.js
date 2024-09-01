import AnimeList from '../components/AnimeList';
import { useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Movies({ data }) {

    useEffect(() => {
        document.getElementById("movies").classList.add("active");
        document.getElementById("searchanimebutton").click();
    }, []);
    return (
        <>
            <AnimeList startOptions="Movie" />
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