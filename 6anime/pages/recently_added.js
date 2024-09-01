import AnimeList from '../components/AnimeList';
import { useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function RecentlyAdded({ data }) {

    useEffect(() => {
        document.getElementById("searchanimebutton").click();
    }, []);
    return (
        <>
            <AnimeList startOptions="Recently-Added" />
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