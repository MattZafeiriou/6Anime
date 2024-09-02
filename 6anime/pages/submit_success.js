import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

export default function submit_success() {
    const {t} = useTranslation();
    return (
        <>
            <Head>
                <title>6Anime - Form Submitted</title>
                <meta property="og:title" content="6Anime - Form Submitted" />
                <meta
                    property="og:description"
                    content="6Anime: Your ultimate anime destination. Enjoy free, competitive streaming with access to any anime you desire."
                />
                <meta
                    name="description"
                    content="6Anime: Your ultimate anime destination. Enjoy free, competitive streaming with access to any anime you desire."
                />
            </Head>
            <div style={{ color: 'white', margin: '10vw', marginTop: '1em' }}>
                <h1>{t('form_submit')}</h1>
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