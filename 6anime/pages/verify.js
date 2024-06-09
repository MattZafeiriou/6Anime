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