import { useEffect } from "react";

export default function RandomVideo({ data }) {
    function handleScroll() {
        let windowBottom = document.documentElement.scrollTop + window.innerHeight;
        let sectionTop = document.getElementsByClassName("random_video_span")[0].offsetTop;
        if (windowBottom > sectionTop) {
            document.getElementsByClassName("random_video")[0].classList.add("video_headtitle_shown");
        }
        sectionTop = document.getElementsByClassName("random_video_trailer")[0].offsetTop;
        if (windowBottom > sectionTop) {
            if (getCookie("featured") === null) {
                const url = "/getfeatured"
                fetch(process.env.NEXT_PUBLIC_API_URL + url)
                    .then(response => response.json())
                    .then(data => {
                        setRandomVideo(data);
                        setCookie("featured", JSON.stringify(data), 3);
                    })
            } else {
                const data = JSON.parse(getCookie("featured"));
                setRandomVideo(data);
            }
            document.getElementsByClassName("random_video_trailer")[0].classList.add("random_video_trailer_shown");
            document.getElementsByClassName("random_video_trailer_info")[0].classList.add("random_video_trailer_info_shown");
        }
    }

    function setRandomVideo(data) {
        document.getElementById("random_video_trailer").src = data.video;
        document.getElementById("random_video_trailer").title = data.name;

        document.getElementsByClassName("random_video_trailer_title")[0].innerHTML = data.name;

        document.getElementsByClassName("random_video_trailer_desc")[0].innerHTML = data.description;

        document.getElementById("watchLink").href = "/watch/" + data.folder_name;

        document.getElementById("tag1link").href = "/search?genre=" + data.tags[0];
        document.getElementById("tag2link").href = "/search?genre=" + data.tags[1];
        document.getElementById("tag3link").href = "/search?genre=" + data.tags[2];

        document.getElementById("rd_tag1").innerHTML = data.tags[0];
        document.getElementById("rd_tag2").innerHTML = data.tags[1];
        document.getElementById("rd_tag3").innerHTML = data.tags[2];
    }

    function getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function eraseCookie(name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }

        document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=None; Secure";
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div className='random_video'>
                <span className='random_video_span' />
                <h1>Don't know what to watch?</h1>
                <h3>Let us help you!</h3>
                <div className='random_video_trailer'>
                    <div className='random_video_trailer_vid'>
                        <iframe id="random_video_trailer" src="" title="" allowFullScreen></iframe>
                    </div>
                    <div className='random_video_trailer_info'>
                        <h1 className='random_video_trailer_title'></h1>
                        <p className='random_video_trailer_desc'></p>
                        <div className='random_video_trailer_tags'>
                            <a id="tag1link" href="/search?genre=">
                                <p id="rd_tag1"></p>
                            </a>
                            <a id="tag2link" href="/search?genre=">
                                <p id="rd_tag2"></p>
                            </a>
                            <a id="tag3link" href="/search?genre=">
                                <p id="rd_tag3"></p>
                            </a>
                        </div>
                        <a id="watchLink" href="/watch/"><button className='random_video_trailer_button'>Watch Now!</button></a>
                        <button className='add_to_list_button'>Add to my list</button>
                    </div>
                </div>
            </div>
        </>
    );
}
