import { useEffect } from 'react';

export default function Profile({ data }) {

    return (
        <>
            <div className='profilesection'>
                <h1>My Profile</h1>
                <div className='profile'>
                    <div className='profileimg'>
                        <img src={data.avatar} alt='profile' />
                    </div>
                    <div className='profileinfo'>
                        <h2>{data.name}</h2>
                        <p>{data.email}</p>
                        <p>{data.phone}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const data = await res.json();
    console.log(data)
    return {
        props: {
            data,
        },
    };
}