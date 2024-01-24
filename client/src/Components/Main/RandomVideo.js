import {React, Component} from 'react';
import './RandomVideo.css'

class RandomVideo extends Component {

    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
        
        this.state = {
            shown: false
        }

        this.setRandomVideo = this.setRandomVideo.bind(this);
    }

    setRandomVideo(data)
    {
        document.getElementById("random_video_trailer").src = data.video;
        document.getElementById("random_video_trailer").title = data.name;

        document.getElementsByClassName("random_video_trailer_title")[0].innerHTML = data.name;

        document.getElementsByClassName("random_video_trailer_desc")[0].innerHTML = data.description;

        document.getElementById("watchLink").href = "/watch/" + data.folder_name;

        document.getElementById("tag1link").href = "/search?genre=" + data.tags[0];
        document.getElementById("tag2link").href = "/search?genre=" + data.tags[1];
        document.getElementById("tag3link").href = "/search?genre=" + data.tags[2];

        document.getElementById("tag1").innerHTML = data.tags[0];
        document.getElementById("tag2").innerHTML = data.tags[1];
        document.getElementById("tag3").innerHTML = data.tags[2];
    }

    getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for(let i=0;i < ca.length;i++) {
            let c = ca[i];
            while (c.charAt(0)===' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    eraseCookie(name) {   
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    setCookie(name, value, days) {
        let expires = "";
        if (days) {
          let date = new Date();
          date.setTime(date.getTime() + (days*24*60*60*1000));
          expires = "; expires=" + date.toUTCString();
        }

        document.cookie = name + "=" + (value || "")  + expires + "; path=/; SameSite=None; Secure";
    }

    handleScroll() {
        let windowBottom = document.documentElement.scrollTop + window.innerHeight;
        let sectionTop = document.getElementsByClassName("random_video_span")[0].offsetTop;
        if (windowBottom > sectionTop) {
            document.getElementsByClassName("random_video")[0].classList.add("video_headtitle_shown");
        }
        sectionTop = document.getElementsByClassName("random_video_trailer")[0].offsetTop;
        if (windowBottom > sectionTop) {
            document.getElementsByClassName("random_video_trailer")[0].classList.add("random_video_trailer_shown");
            document.getElementsByClassName("random_video_trailer_info")[0].classList.add("random_video_trailer_info_shown");
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        if (this.getCookie("featured") === null) {
            const url = "/get_featured"
            fetch("http://localhost:9000" + url)
            .then(response => response.json())
            .then(data => {
                this.setRandomVideo(data);
                this.setCookie("featured", JSON.stringify(data), 3);
            })
        } else {
            const data = JSON.parse(this.getCookie("featured"));
            this.setRandomVideo(data);
        }
    }

    render() {
        return (
            <>
            <div className='random_video'>
                <h1>Don't know what to watch?</h1>
                <h3>Let us help you!</h3>
                <span className='random_video_span'/>
                <div className='random_video_trailer'>
                    <div className='random_video_trailer_vid'>
                        <iframe id="random_video_trailer" src="" title="" allowFullScreen></iframe>
                    </div>
                    <div className='random_video_trailer_info'>
                        <h1 className='random_video_trailer_title'></h1>
                        <p className='random_video_trailer_desc'></p>
                        <div className='random_video_trailer_tags'>
                            <a id="tag1link" href="/search?genre=">
                                <p id="tag1"></p>
                            </a>
                            <a id="tag2link" href="/search?genre=">
                                <p id="tag2"></p>
                            </a>
                            <a id="tag3link" href="/search?genre=">
                                <p id="tag3"></p>
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
}

export default RandomVideo;