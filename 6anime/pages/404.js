import Head from 'next/head'

export default function Custom404() 
{
    return (
        <>
        <Head>
            <title>6Anime - 404 Not Found</title>
        </Head>
        <div className='NotFound'>
            <h1 align="center">404 Not Found</h1>
            <h3 align="center"><a align="center" href="javascript:history.back()">Go back</a></h3>
        </div>
        </>
    );
}