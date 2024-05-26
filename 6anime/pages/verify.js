import Head from 'next/head'
import { useEffect } from 'react';

export default function Verify() {
    useEffect(() => {
        const url = new URL(window.location.href);
        const token = url.searchParams.get('token');
        if (token) {
            fetch(process.env.NEXT_PUBLIC_API_URL + "/verify", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                }),
            })
                .then((response) => {
                    if (response.status === 200) {
                        document.getElementById("verify").innerHTML = "Account verified";
                        window.location.replace("/");
                    } else {
                        document.getElementById("verify").innerHTML = "Invalid token";
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            alert("Invalid token");
        }
    }, []);

    return (
        <>
            <Head>
                <title>6Anime - Verify Account</title>
                <meta property="og:title" content="6Anime - Verify Account" />
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
            <style>
                {`
                .verify {
                    margin-top: 20vh;
                    height: 100vh;
                    color: white;
                }
            `}
            </style>
            <div className='verify'>
                <h1 align="center" id='verify'>Verifying</h1>
            </div>
        </>
    );
}