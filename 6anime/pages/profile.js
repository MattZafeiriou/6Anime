import { useEffect } from "react";
import { useState } from "react";
import getAccountId from "../lib/routes/Auth/getAccountId";
import Cropper from 'react-easy-crop'

export default function Profile({ data }) {

    function cropImage(image, croppedAreaPixels) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;
        ctx.drawImage(
            image,
            croppedAreaPixels.x * scaleX,
            croppedAreaPixels.y * scaleY,
            croppedAreaPixels.width * scaleX,
            croppedAreaPixels.height * scaleY,
            0,
            0,
            croppedAreaPixels.width,
            croppedAreaPixels.height
        );

        return canvas.toDataURL('image/jpeg');
    }

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

        const bg = sessionStorage.getItem('bg');
        document.getElementById('backgroundimg').src = bg;
        if (!bg) {
            fetch(process.env.NEXT_PUBLIC_API_URL + '/getbackground')
                .then(res => res.blob())
                .then(blob => {
                    const url = URL.createObjectURL(blob);
                    document.getElementById('backgroundimg').src = url;

                    // save image to local storage
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onloadend = function () {
                        const base64data = reader.result;
                        sessionStorage.setItem('bg', base64data);
                    }
                });
        }
    });

    function changePfp() {
        document.getElementById('file').click();
        document.getElementById('file').addEventListener('change', function () {
            const file = document.getElementById('file').files[0];
            const reader = new FileReader();
            reader.onload = function () {
                const img = reader.result;

                document.querySelector('.cropdiv').style.display = 'block';
                setRatio(1);
                setImgType('profilepic');
                setImage(img);
            }
            reader.readAsDataURL(file);
        });
    }

    function changeBg() {
        document.getElementById('file').click();
        document.getElementById('file').addEventListener('change', function () {
            const file = document.getElementById('file').files[0];
            const reader = new FileReader();
            reader.onload = function () {
                const img = reader.result;

                document.querySelector('.cropdiv').style.display = 'block';
                setRatio(4);
                setImgType('background');
                setImage(img);
            }
            reader.readAsDataURL(file);
        });
    }

    function setCroppedArea(croppedArea, croppedAreaPixels) {
        setCroppedArea_(croppedAreaPixels);
    }

    function uploadImage() {
        let img = new Image();
        img.src = image;
        img.onload = () => {
            const croppedAreaPixels = croppedArea;
            document.querySelector('.cropdiv').style.display = 'none';

            img = cropImage(img, croppedAreaPixels);

            let url = '/setprofilepic';
            if (imgType === 'background') {
                url = '/setbackground';
            }

            fetch(process.env.NEXT_PUBLIC_API_URL + url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: img }),
            })
                .then(res => {
                    if (res.status === 200) {
                        if (imgType === 'background') {
                            document.getElementById('backgroundimg').src = img;
                            sessionStorage.setItem('bg', img);
                        } else {
                            sessionStorage.setItem('profilepic', img);
                            document.getElementById('profileimg').src = img;
                        }
                    }
                });
        }
    }

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [image, setImage] = useState(null)
    const [croppedArea, setCroppedArea_] = useState(null)
    const [imgType, setImgType] = useState('profilepic');
    const [ratio, setRatio] = useState(1);

    return (
        <>
            <div className='profilesection'>
                <div className='backgroundimg'>
                    <img id="backgroundimg" src='' alt='background profile image' />
                    <div onClick={changeBg} className="changeprofilebg">
                        <input type="file" accept="image/*" id="file" style={{ opacity: '0' }} />
                        <i className="fas fa-camera"></i>
                    </div>
                </div>
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
                            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure; Domain=6anime.tv";
                            window.location.href = '/';
                        }}>Sign Out <i className="fa fa-sign-out" aria-hidden="true"></i></button>
                    </div>
                </div>
            </div>
            <div className="cropdiv">
                <div className="backgrounddrop">
                    <div className="croppfp">
                        <i className="closebutton fas fa-times" onClick={() => {
                            document.querySelector('.cropdiv').style.display = 'none';
                        }}></i>
                        <h2>Crop Profile Picture</h2>
                        {imgType === 'profilepic' && <h3>Max Image Size: 320x320</h3>}
                        {imgType === 'background' && <h3>Max Image Size: 1584x396</h3>}
                        <div className="crop_div">
                            <Cropper
                                image={image}
                                crop={crop}
                                zoom={zoom}
                                aspect={ratio}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={setCroppedArea}
                            />

                        </div>
                        <button className="btn btn-success" onClick={(e) => {
                            e.preventDefault();
                            uploadImage();
                        }}>Submit</button>
                        <button className="btn btn-danger" onClick={() => {
                            document.querySelector('.cropdiv').style.display = 'none';
                        }}>Cancel</button>
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