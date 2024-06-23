import React, { useEffect } from 'react';

export default function User({ data }) {
    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_SS_API_URL + '/getprofilepic?id=' + data.id)
            .then(res => res.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                document.getElementById('profileimg').src = url;
            });

            fetch(process.env.NEXT_PUBLIC_SS_API_URL + '/getbackground?id=' + data.id)
            .then(res => res.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                document.getElementById('backgroundimg').src = url;
            });
    
    });

    return (
        <>
            <div className='profilesection'>
                <img id="backgroundimg" src='https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630' alt='background profile image' />
                <div className='profile'>
                    <div className='profile'>
                        <div className="profile_img">
                            <img id="profileimg" src="" alt='profile image' />
                        </div>
                        <h1><a href={`/users/user?id=${data.id}`}>@{data.username}</a>'s profile</h1>
                    </div>
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps({ req, res }) {
    const id = req.url.split('=')[1];
    if (!id) {
        res.writeHead(302, { Location: '/404' });
        res.end();
        return { props: {} };
    }
    const res_ = await fetch(process.env.NEXT_PUBLIC_SS_API_URL + '/getuserinfo?id=' + id);
    if (res_.status === 404) {
        res.writeHead(302, { Location: '/404' });
        res.end();
        return { props: {} };
    }
    const data = await res_.json();
    return {
        props: {
            data,
        },
    };
}