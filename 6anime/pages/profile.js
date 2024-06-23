import { useEffect } from "react";
import getAccountId from "../lib/routes/Auth/getAccountId";

export default function Profile({ data }) {

    useEffect(() => {
        const img = sessionStorage.getItem('profilepic');
        document.getElementById('profileimg').src = img;
        if (!img) {
            fetch(process.env.NEXT_PUBLIC_API_URL + '/getprofilepic')
                .then(res => res.blob())
                .then(blob => {
                    const url = URL.createObjectURL(blob);
                    document.getElementById('profileimg').src = url;
                });
        }

        fetch(process.env.NEXT_PUBLIC_API_URL + '/getbackground')
        .then(res => res.blob())
        .then(blob => {
            const url = URL.createObjectURL(blob);
            document.getElementById('backgroundimg').src = url;
        });

    });

    function changePfp() {
        document.getElementById('file').click();
        document.getElementById('file').addEventListener('change', function () {
            const file = document.getElementById('file').files[0];
            const reader = new FileReader();
            reader.onload = function () {
                const img = reader.result;
                document.getElementById('profileimg').src = img;
                sessionStorage.setItem('profilepic', img);
            }
            reader.readAsDataURL(file);
        });
    }

    return (
        <>
            <div className='profilesection'>
                <img id="backgroundimg" src='' alt='background profile image' />
                <div className='profile'>
                    <div className="profile_img">
                        <img id="profileimg" src="" alt='profile image' />
                        <div onClick={changePfp} className="changeprofileimg">
                            <input type="file" accept="image/*" id="file" style={{ opacity: '0' }} />
                            <i className="fas fa-camera"></i>
                        </div>
                    </div>
                    <h1>My Profile</h1>
                    <h2><a href={`/users/user?id=${data.id}`}>@{data.username}</a></h2>
                </div>

                <div className="buttons">
                    <div className="signout">
                        <button className="btn btn-danger" onClick={() => {
                            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                            window.location.href = '/';
                        }}>Sign Out <i className="fa fa-sign-out" aria-hidden="true"></i></button>
                    </div>
                    <div className="applychanges">
                        <button className="btn btn-primary">Apply Changes <i class="fas fa-save"></i></button>
                    </div>
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps({ req, res }) {
    const id = getAccountId.getAccountId(req, res);
    if (!id) {
        res.writeHead(302, { Location: '/login' });
        res.end();
        return { props: {} };
    }
    const res_ = await fetch(process.env.NEXT_PUBLIC_SS_API_URL + '/getuserinfo?id=' + id);
    const data = await res_.json();
    return {
        props: {
            data,
        },
    };
}