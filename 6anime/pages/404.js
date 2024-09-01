import Head from 'next/head'
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Custom404() {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>6Anime - {t('404')}</title>
        <meta property="og:title" content={"6Anime - " + t('404')} />
        <meta
          property="og:description"
          content="6Anime: Your ultimate anime destination. Enjoy free, competitive streaming with access to any anime you desire."
        />
        <meta
          name="description"
          content="6Anime: Your ultimate anime destination. Enjoy free, competitive streaming with access to any anime you desire."
        />
      </Head>
      <div className='NotFound'>
        <h1 align="center">{t('404')}</h1>
        <h3 align="center"><a align="center" href="javascript:history.back()">{t('go_back')}</a></h3>
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