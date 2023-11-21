import React from 'react';
import Hls from "hls.js";

class VideoPlayer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            video_url: "",
            episode: ""
        }

        let name = window.location.href.split("/")[4];
        this.state.episode = window.location.href.split("/")[5].replace("ep", "");

        // Change banner image
        var url = "anime_url/?name=" + name + "&ep=" + this.state.episode;
        fetch("http://localhost:9000/" + url)
        .then(res => res.text())
        .then(data => {
            data = JSON.parse(data);
            this.setState({video_url: data.url});
            document.getElementById("captions").src = data.subs;
            this.setCookies();
        })
        .catch(error => {
            console.error('Error fetching anime url:', error);
        });
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

    setCookie(name, value, days, global) {
        let expires = "";
        if (days) {
          let date = new Date();
          date.setTime(date.getTime() + (days*24*60*60*1000));
          expires = "; expires=" + date.toUTCString();
        }

        if (global)
            document.cookie = name + "=" + (value || "")  + expires + "; path=/p" + "; SameSite=None; Secure";
        else
        {
            let name2 = window.location.href.split("/")[4];
            document.cookie = name + "=" + (value || "")  + expires + "; path=/p/" + name2 + "; SameSite=None; Secure";
        }
    }

    setCookies() {
        // get and change time and volume to last session's
        let currentTime = this.getCookie("currentTime");
        let currentVolume = this.getCookie("currentVolume");
        this.setCookie("last_ep", this.state.episode, 7, false)
        const player = document.getElementById('player');

        if (currentTime)
            player.currentTime = parseFloat(currentTime);

        if (currentVolume)
            player.volume = parseFloat(currentVolume);

        // Save current time and volume every second
        setInterval(() =>{
            this.setCookie("currentTime", player.currentTime, 7, false);
            this.setCookie("currentVolume", player.volume, 7, true);
        }, 1000);
    }

    componentDidUpdate() {
        const video = this.player;
        const hls = new Hls();
        const url = this.state.video_url;

        hls.loadSource(url);
        hls.attachMedia(video);
        
        // hls.startLevel = 2;
        // hls.nextLevel = 2;
        hls.on(Hls.Events.MANIFEST_PARSED, () => {

            var availableLevels = hls.levels;
  
            // Log the available resolutions
            availableLevels.forEach(function (level, index) {
              console.log('Resolution ' + index + ': ' + level.width + 'x' + level.height);
            });
            video.loadSource();
            hls.attachMedia(video)
        });

    }
    
    render() {
        return (
            <div className="video-player">
                <video controls id="player" playsInline crossOrigin='anonymous' style={{width: '100%', height: '100%'}}
                    ref={player => (this.player = player)}>
                    <source src="" type="video/mp4" />
                    <track id="captions" src="" label="English" srcLang='en' kind="subtitles" default />
                </video>
            </div>
        )
    }
}

export default VideoPlayer;