import Head from 'next/head'

export default function Custom404() {
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
          name="description"
          content="6Anime: Your ultimate anime destination. Enjoy free, competitive streaming with access to any anime you desire."
        />
      </Head>
      <div className='NotFound'>
        <h1 align="center">404 Not Found</h1>
        <h3 align="center"><a align="center" href="javascript:history.back()">Go Back</a></h3>
      </div>
    </>
  );
}