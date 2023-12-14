import React from 'react';
import Hls from "hls.js";

class VideoPlayer extends React.Component {

    constructor(props) {
        super(props);
        this.cooldown = null;
        this.mouseInside = false;

        this.state = {
            video_url: "",
            episode: "",
            lastVolume: 0
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
        this.keyPressed = this.keyPressed.bind(this);
        this.cooldownToHide = this.cooldownToHide.bind(this);
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
            document.cookie = name + "=" + (value || "")  + expires + "; path=/watch; SameSite=None; Secure";
        else
        {
            let name2 = window.location.href.split("/")[4];
            document.cookie = name + "=" + (value || "")  + expires + "; path=/watch/" + name2 + "; SameSite=None; Secure";
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
        {
            const value = parseFloat(currentVolume);
            player.volume = value;
            document.getElementById("audioBar").value = value * 100;
            if (value == 0)
                document.getElementById("audioIcon").innerHTML = "<i class='fa-solid fa-volume-mute'></i>";
            else if (value * 100 < 50)
                document.getElementById("audioIcon").innerHTML = "<i class='fa-solid fa-volume-low'></i>";
            else
                document.getElementById("audioIcon").innerHTML = "<i class='fa-solid fa-volume-high'></i>";

            const currentPercentage = value * 100;
            const audioBar = document.getElementById("audioBar");
            audioBar.style.background = `linear-gradient(to right, #f44336 0%, #f44336 ${currentPercentage}%, #fff ${currentPercentage}%, white 100%)`;
        }
        // Save current time and volume every second
        setInterval(() =>{
            this.setCookie("currentTime", player.currentTime, 7, false);
            this.setCookie("currentVolume", player.volume, 7, true);
        }, 1000);
    }
    toHHMMSS(secs) {
        var sec_num = parseInt(secs, 10)
        var hours   = Math.floor(sec_num / 3600)
        var minutes = Math.floor(sec_num / 60) % 60
        var seconds = sec_num % 60
    
        return [hours,minutes,seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v,i) => v !== "00" || i > 0)
            .join(":")
    }

    cooldownToHide()
    {
        document.getElementsByClassName("video-player")[0].style.cursor = null;
        const controls = document.getElementsByClassName('controls')[0];
        controls.classList.remove('hide');
        if (this.cooldown != null)
            clearTimeout(this.cooldown);
        if (!this.mouseInside)
        this.cooldown = setTimeout(() => {
            const controls = document.getElementsByClassName('controls')[0];
            controls.classList.add('hide');
            document.getElementsByClassName("video-player")[0].style.cursor = "none";
        }, 1000);
    }

    keyPressed(e) {
        if (e.keyCode === 32) { // key space
            const player = document.getElementById('player');
            if (player.paused)
            {
                player.play();
                this.setPause();
                this.cooldownToHide();
            }else
            {
                player.pause();
                this.setPlay();
                const controls = document.getElementsByClassName('controls')[0];
                controls.classList.remove('hide');
            }
            e.preventDefault();
        }
        if (e.keyCode === 70) { // key F
            const player = document.getElementsByClassName('video-player')[0];
            // toggle fullscreen
            if (document.fullscreenElement) {
                document.exitFullscreen();
                this.setFullscreen();
            } else {
                player.requestFullscreen();
                this.setExitFullscreen();
            }
            e.preventDefault();
        }
        if (e.keyCode === 77) { // key M
            this.toggleMute();
        }
        if (e.keyCode === 37) { // key left
            const player = document.getElementById('player');
            player.currentTime -= 5;
        }
        if (e.keyCode === 39) { // key right
            const player = document.getElementById('player');
            player.currentTime += 5;
        }
    }

    componentDidUpdate() {
        const video = this.player;
        const hls = new Hls();
        const url = this.state.video_url;

        hls.loadSource(url);
        hls.attachMedia(video);
        video.addEventListener("timeupdate", (event) => {
            document.getElementById("currenttime").innerHTML = this.toHHMMSS(video.currentTime.toFixed(2));
            document.getElementById("progressBar").value = video.currentTime;

            const currentPercentage = (video.currentTime / video.duration) * 100;
            const progressBar = document.getElementById("progressBar");
            progressBar.style.background = `linear-gradient(to right, #f44336 0%, #f44336 ${currentPercentage}%, #fff ${currentPercentage}%, white 100%)`;
        });
        video.addEventListener("loadeddata", (event) => {
            document.getElementById("progressBar").max = video.duration;
            document.getElementById("duration").innerHTML = this.toHHMMSS(video.duration.toFixed(2));
            document.getElementById("currenttime").innerHTML = this.toHHMMSS(video.currentTime.toFixed(2));
            document.getElementById("progressBar").value = video.currentTime;
        })
        document.addEventListener('keydown', this.keyPressed);
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

    toggleMute()
    {
        const player = document.getElementById('player');
        if (this.state.lastVolume == 0)
        {
            this.state.lastVolume = player.volume;
            player.volume = 0;
            document.getElementById("audioBar").value = 0;
            document.getElementById("audioIcon").innerHTML = "<i class='fa-solid fa-volume-mute'></i>";
        } else {
            player.volume = this.state.lastVolume;
            document.getElementById("audioBar").value = this.state.lastVolume * 100;
            if (this.state.lastVolume * 100 < 50)
                document.getElementById("audioIcon").innerHTML = "<i class='fa-solid fa-volume-low'></i>";
            else
                document.getElementById("audioIcon").innerHTML = "<i class='fa-solid fa-volume-high'></i>";
            this.state.lastVolume = 0;
        }
        const currentPercentage = player.volume * 100;
        const audioBar = document.getElementById("audioBar");
        audioBar.style.background = `linear-gradient(to right, #f44336 0%, #f44336 ${currentPercentage}%, #fff ${currentPercentage}%, white 100%)`;
    }

    setPlay()
    {
        const button = document.getElementById("play");
        button.innerHTML = "<i class='fa-solid fa-play'></i>";
    }
    setPause()
    {
        const button = document.getElementById("play");
        button.innerHTML = "<i class='fa-solid fa-pause'></i>";
    }
    setFullscreen()
    {
        const button = document.getElementById("fullscreen");
        button.innerHTML = "<i class='fa-solid fa-expand'></i>";
    }
    setExitFullscreen()
    {
        const button = document.getElementById("fullscreen");
        button.innerHTML = "<i class='fa-solid fa-compress'></i>";
    }

    render() {
        return (
            <>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"></link>
            <div className="video-player" onMouseEnter={() => {
                const player = document.getElementsByClassName('video-player')[0];
                if (!player.paused)
                {
                    const controls = document.getElementsByClassName('controls')[0];
                    controls.classList.remove('hide');
                }
            }}
            onMouseOut={() => {
                const controls = document.getElementsByClassName('controls')[0];
                controls.classList.add('hide');
            }}
            onMouseMove={() => {
                this.cooldownToHide();
            }}>
                <div className='controls' onMouseEnter={() => {
                    this.mouseInside = true;
                }} onMouseLeave={() => {
                    this.mouseInside = false;
                }} onMouseMove={() => {
                    this.mouseInside = true;
                }}>
                    <button id="play" onClick={() => {
                        const player = this.player;
                        if (player.paused)
                        {
                            player.play();
                            this.setPause();
                        }else
                        {
                            player.pause();
                            this.setPlay();
                        }
                    }}><i class="fa-solid fa-play"></i></button>
                    <h5 id="currenttime">00:00</h5>
                    <input type="range" id="progressBar" name="progressBar" defaultValue="0" min="0" max="100" onChange={
                        () => {
                            const player = this.player;
                            player.currentTime = document.getElementById("progressBar").value;
                            document.getElementById("currenttime").innerHTML = this.toHHMMSS(player.currentTime.toFixed(2));
                            
                            const currentPercentage = (player.currentTime / player.duration) * 100;
                            const progressBar = document.getElementById("progressBar");
                            progressBar.style.background = `linear-gradient(to right, #f44336 0%, #f44336 ${currentPercentage}%, #fff ${currentPercentage}%, white 100%)`;
                        }
                    }></input>
                    <h5 id="duration">00:00:00</h5>
                    <button id="audioIcon" onClick={() => {
                        this.toggleMute();

                    }}><i class="fa-solid fa-volume-high"></i></button>
                    <input type="range" id="audioBar" name="audioBar" defaultValue="0" min="0" max="100" onChange={
                        () => {
                            const player = this.player;
                            const value = document.getElementById("audioBar").value;
                            player.volume = value / 100;
                            if (value == 0)
                                document.getElementById("audioIcon").innerHTML = "<i class='fa-solid fa-volume-mute'></i>";
                            else if (value < 50)
                                document.getElementById("audioIcon").innerHTML = "<i class='fa-solid fa-volume-low'></i>";
                            else
                                document.getElementById("audioIcon").innerHTML = "<i class='fa-solid fa-volume-high'></i>";

                                                        
                            const currentPercentage = value;
                            const audioBar = document.getElementById("audioBar");
                            audioBar.style.background = `linear-gradient(to right, #f44336 0%, #f44336 ${currentPercentage}%, #fff ${currentPercentage}%, white 100%)`;
                        }
                    }></input>
                    <button id="captionsIcon" onClick={() => {
                        const player = document.getElementsByClassName('video-player')[0];
                        const captions = document.getElementById('captions');
                        if (captions.track.mode == "showing")
                        {
                            captions.track.mode = "hidden";
                            document.getElementById("captionsIcon").innerHTML = "<i class='fa-regular fa-closed-captioning'></i>";
                        }else
                        {
                            captions.track.mode = "showing";
                            document.getElementById("captionsIcon").innerHTML = "<i class='fa-solid fa-closed-captioning'></i>";
                        }
                    }}><i class="fa-solid fa-closed-captioning"></i></button>

                    <button id="fullscreen" onClick={() => {
                        const player = document.getElementsByClassName('video-player')[0];
                        // toggle fullscreen
                        if (document.fullscreenElement) {
                            document.exitFullscreen();
                            this.setFullscreen();
                        } else {
                            player.requestFullscreen();
                            this.setExitFullscreen();
                        }
                    }}><i class="fa-solid fa-expand"></i></button>
                </div>
                <video controls={false} id="player" playsInline crossOrigin='anonymous' style={{width: '100%', height: '100%'}}
                    ref={player => (this.player = player)}
                    onClick={() => {
                        const player = this.player;
                        if (player.paused)
                        {
                            player.play();
                            this.setPause();
                        }else
                        {
                            player.pause();
                            this.setPlay();
                        }
                    }}
                    onDoubleClick={() => {
                        const player = document.getElementsByClassName('video-player')[0];
                        // toggle fullscreen
                        if (document.fullscreenElement) {
                            document.exitFullscreen();
                            this.setFullscreen();
                        } else {
                            player.requestFullscreen();
                            this.setExitFullscreen();
                        }
                    }}
                    >
                    <source src="" type="video/mp4" />
                    <track id="captions" src="" label="English" srcLang='en' kind="subtitles" default />
                </video>
            </div>
            </>
        )
    }
}

export default VideoPlayer;