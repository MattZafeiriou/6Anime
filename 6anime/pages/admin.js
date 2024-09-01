import Head from 'next/head'
import { useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Admin({ }) {
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

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_SS_API_URL + '/isAdmin')
            .then(res => {
                if (res.ok)
                    giveAccess();
            })
            .catch(err => {
                console.log('You do not have access to this page');
            });
    }, []);

    function giveAccess() {
        document.getElementsByClassName('noaccess')[0].style.display = 'none'; // remove anything that says no access

        
    }

    return (
        <>
            <Head>
                <title>6Anime - Admin</title>
                <meta property="og:title" content="6Anime - Admin" />
                <meta
                    property="og:description"
                    content="Admin page for 6Anime"
                />
            </Head>
            <div className='adminpanel'>
                <div className='noaccess'>
                    <h2>You have no access to this page</h2>
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