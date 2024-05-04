import Head from 'next/head';

export default function submit_success() {
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
            <div style={{color: 'white', margin: '10vw', marginTop: '1em'}}>
                <h1>Form submitted succesfully!</h1>
            </div>
        </>
    );
}