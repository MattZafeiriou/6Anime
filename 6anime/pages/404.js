import Head from 'next/head'

export default function Custom404() 
{
    return (
        <>
        <Head>
            <title>6Anime - 404 Not Found</title>
            <meta property="og:title" content="6Anime - 404 Not Found" />
            <meta
              property="og:description"
              content="6Anime: Your ultimate anime destination. Enjoy free, competitive streaming with access to any anime you desire."
            />
            <meta
        name="keywords"
        content="anime, free anime, 6anime, 9anime, anime streaming, anime online, anime hd, anime free, anime website, anime site, anime watch, anime watch online, anime watch free, anime watch hd, anime watch online free, anime watch online hd, anime watch free online, anime watch free hd, anime watch free online hd, anime watch free online english sub, anime watch free online english dub, anime watch free online english subbed, anime watch free online english dubbed, anime watch free online english subbed and dubbed, anime watch free online english subbed hd, anime watch free online english"
      />
            <meta
              name="description"
              content="6Anime: Your ultimate anime destination. Enjoy free, competitive streaming with access to any anime you desire."
            />
        </Head>
        <div className='NotFound'>
            <h1 align="center">404 Not Found</h1>
            <h3 align="center"><a align="center" href="javascript:history.back()">Go back</a></h3>
        </div>
        </>
    );
}