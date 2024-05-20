import { useEffect } from "react";
import Hls from "hls.js";
import {isMobile} from 'react-device-detect';

export default function VideoPlayer({ banner }) {
    let cooldown = null;
    let mouseInside = false;
    let state = {
        video_url: "",
        episode: "",
        lastVolume: 0,
        bannerImg: ""
    }
    let player;

    useEffect(async () => {
        player = document.getElementById('player');

        if (isMobile)
        {
            document.getElementsByClassName("audio-bar")[0].style.display = "none";
            document.getElementById("audioIcon").style.display = "none";
            player.volume = 1;
        }

        const id = window.location.href.split("/")[4].split("-")[window.location.href.split("/")[4].split("-").length - 1];
        state.episode = window.location.href.split("/")[5].replace("ep", "");

        // Change banner image
        var url = "/getanimeurl/?id=" + id + "&episode_number=" + state.episode;
        await fetch(process.env.NEXT_PUBLIC_API_URL + url)
        .then(res => res.text())
        .then(data => {
            data = JSON.parse(data);
            state.video_url = data.video_url;
            document.getElementById("captions").src = data.tracks[0];
            setCookies();
        })
        .catch(error => {
            console.error('Error fetching anime url:', error);
        });

        const video = document.getElementById('player');
        const hls = new Hls();
        url = state.video_url;

        hls.loadSource(url);
        hls.attachMedia(video);
        video.addEventListener("timeupdate", (event) => {
            document.getElementById("currenttime").innerHTML = toHHMMSS(video.currentTime.toFixed(2));
            document.getElementById("progressBar").value = video.currentTime;
            if (video.muted)
            {
                video.volume = 0;
                video.muted = false;
            }
            changeAudio(video.volume * 100);

            if (video.paused && document.getElementById("play").innerHTML === "<i class=\"fa-solid fa-pause\"></i>")
            {
                setPause();
            }
            if (!video.paused && document.getElementById("play").innerHTML === "<i class=\"fa-solid fa-play\"></i>")
                setPlay();

            const currentPercentage = (video.currentTime / video.duration) * 100;
            const progressBar = document.getElementById("progressBar");
            progressBar.style.background = `linear-gradient(to right, var(--bar) 0%, var(--bar) ${currentPercentage}%, #fff ${currentPercentage}%, white 100%)`;
        });

        if (isMobile)
        {
            document.addEventListener("visibilitychange", (e) => {
                if (document.visibilityState === 'hidden') {
                    video.pause();
                    setPause();
                }
            });
        }

        video.addEventListener("loadeddata", (event) => {
            document.getElementById("progressBar").max = video.duration;
            document.getElementById("duration").innerHTML = toHHMMSS(video.duration.toFixed(2));
            document.getElementById("currenttime").innerHTML = toHHMMSS(video.currentTime.toFixed(2));
            document.getElementById("progressBar").value = video.currentTime;
        })
        document.addEventListener('keydown', keyPressed);
        // hls.startLevel = 2;
        // hls.nextLevel = 2;
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            var availableLevels = hls.levels;
  
            // Log the available resolutions
            // availableLevels.forEach(function (level, index) {
            //   console.log('Resolution ' + index + ': ' + level.width + 'x' + level.height);
            // });
            video.loadSource();
            hls.attachMedia(video)
        });
    }, []);


    function setCookies() {
        // get and change time and volume to last session's
        let currentTime = getCookie("currentTime");
        let currentVolume = getCookie("currentVolume");

        const name = window.location.href.split("/")[4];
        const splitted = name.split("-");
        const id = splitted[splitted.length - 1];

        setCookie(id + "-last_ep", state.episode, 7, true)
        const player = document.getElementById('player');

        if (currentTime)
            player.currentTime = parseFloat(currentTime);

        currentVolume = currentVolume ? currentVolume : 1;
        const value = parseFloat(currentVolume);
        player.volume = value;
        document.getElementById("audioBar").value = value * 100;
        if (value === 0)
            document.getElementById("audioIcon").innerHTML = "<i class='fa-solid fa-volume-mute'></i>";
        else if (value * 100 < 50)
            document.getElementById("audioIcon").innerHTML = "<i class='fa-solid fa-volume-low'></i>";
        else
            document.getElementById("audioIcon").innerHTML = "<i class='fa-solid fa-volume-high'></i>";

        const currentPercentage = value * 100;
        const audioBar = document.getElementById("audioBar");
        audioBar.style.background = `linear-gradient(to right, var(--bar) 0%, var(--bar) ${currentPercentage}%, #fff ${currentPercentage}%, white 100%)`;
        // Save current time and volume every second
        setInterval(() =>{
            setCookie("currentTime", player.currentTime, 7, false);
            setCookie("currentVolume", player.volume, 7, true);
        }, 1000);
    }

    function keyPressed(e) {
        const inputElement = document.getElementById('searchingtop');
        if (document.activeElement === inputElement)
            return;
        
        if (e.keyCode === 32) { // key space
            const player = document.getElementById('player');
            if (player.paused)
            {
                player.play();
                setPause();
                document.getElementsByClassName("banner")[0].classList.add("hide");
                document.getElementsByClassName("play-button")[0].classList.add("hidebutton");
                cooldownToHide();
            }else
            {
                player.pause();
                setPlay();
                const controls = document.getElementsByClassName('controls')[0];
                document.getElementsByClassName("play-button")[0].classList.remove("hidebutton");
                controls.classList.remove('hide');
            }
            e.preventDefault();
        }
        if (e.keyCode === 70) { // key F
            const player = document.getElementsByClassName('video-player')[0];
            // toggle fullscreen
            if (document.fullscreenElement) {
                document.exitFullscreen();
                setFullscreen();
            } else {
                player.requestFullscreen();
                setExitFullscreen();
            }
            e.preventDefault();
        }
        if (e.keyCode === 77) { // key M
            toggleMute();
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

    function toggleMute()
    {
        if (state.lastVolume === 0)
        {
            state.lastVolume = player.volume;
            player.volume = 0;
            document.getElementById("audioBar").value = 0;
            document.getElementById("audioIcon").innerHTML = "<i class='fa-solid fa-volume-mute'></i>";
        } else {
            player.volume = state.lastVolume;
            document.getElementById("audioBar").value = state.lastVolume * 100;
            if (state.lastVolume * 100 < 50)
                document.getElementById("audioIcon").innerHTML = "<i class='fa-solid fa-volume-low'></i>";
            else
                document.getElementById("audioIcon").innerHTML = "<i class='fa-solid fa-volume-high'></i>";
            state.lastVolume = 0;
        }
        const currentPercentage = player.volume * 100;
        const audioBar = document.getElementById("audioBar");
        audioBar.style.background = `linear-gradient(to right, var(--bar) 0%, var(--bar) ${currentPercentage}%, #fff ${currentPercentage}%, white 100%)`;
    }

    function togglePlay()
    {
        if (isMobile){
        document.getElementsByClassName("play-button")[0].firstChild.firstChild.classList.add("fa-play");
        document.getElementsByClassName("play-button")[0].firstChild.firstChild.classList.remove("fa-pause");
        }
        const player = document.getElementById('player');
        if (player.paused)
        {
            player.play();
            setPause();
            document.getElementsByClassName("banner")[0].classList.add("hide");
            document.getElementsByClassName("play-button")[0].classList.add("hidebutton");
        }else
        {
            player.pause();
            setPlay();
            document.getElementsByClassName("play-button")[0].classList.remove("hidebutton");
        }
    }

    function changeAudio(value)
    {
        const player = document.getElementById('player');
        player.volume = value / 100;
        if (value === 0)
            document.getElementById("audioIcon").innerHTML = "<i class='fa-solid fa-volume-mute'></i>";
        else if (value < 50)
            document.getElementById("audioIcon").innerHTML = "<i class='fa-solid fa-volume-low'></i>";
        else
            document.getElementById("audioIcon").innerHTML = "<i class='fa-solid fa-volume-high'></i>";

                                    
        const currentPercentage = value;
        const audioBar = document.getElementById("audioBar");
        audioBar.style.background = `linear-gradient(to right, var(--bar) 0%, var(--bar) ${currentPercentage}%, #fff ${currentPercentage}%, white 100%)`;
    }

    function setExitFullscreen()
    {
        const button = document.getElementById("fullscreen");
        button.innerHTML = "<i class='fa-solid fa-compress'></i>";
    }

    function setFullscreen()
    {
        const button = document.getElementById("fullscreen");
        button.innerHTML = "<i class='fa-solid fa-expand'></i>";
    }

    function setPlay()
    {
        const button = document.getElementById("play");
        button.innerHTML = "<i class='fa-solid fa-play'></i>";
    }

    function setPause()
    {
        const button = document.getElementById("play");
        button.innerHTML = "<i class='fa-solid fa-pause'></i>";
    }

    function toHHMMSS(secs) {
        var sec_num = parseInt(secs, 10)
        var hours   = Math.floor(sec_num / 3600)
        var minutes = Math.floor(sec_num / 60) % 60
        var seconds = sec_num % 60
    
        return [hours,minutes,seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v,i) => v !== "00" || i > 0)
            .join(":")
    }

    function getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for(let i=0;i < ca.length;i++) {
            let c = ca[i];
            while (c.charAt(0)===' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    function eraseCookie(name) {   
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    function setCookie(name, value, days, global) {
        let expires = "";
        if (days) {
          let date = new Date();
          date.setTime(date.getTime() + (days*24*60*60*1000));
          expires = "; expires=" + date.toUTCString();
        }

        if (global)
            document.cookie = name + "=" + (value || "")  + expires + "; path=/watch/; SameSite=None; Secure";
        else
        {
            let name2 = window.location.href.split("/")[4];
            document.cookie = name + "=" + (value || "")  + expires + "; path=/watch/" + name2 + "/ep" + state.episode + "; SameSite=None; Secure";
        }
    }

    function cooldownToHide()
    {
        const player = document.getElementById('player');

        document.getElementsByClassName("video-player")[0].style.cursor = null;
        const controls = document.getElementsByClassName('controls')[0];
        if (!isMobile)
            controls.classList.remove('hide');
        if (cooldown != null)
            clearTimeout(cooldown);
        cooldown = setTimeout(() => {
            if (player.paused)
                return;
            const controls = document.getElementsByClassName('controls')[0];
            if (mouseInside)
                return;
            controls.classList.add('hide');
            if (isMobile)
            {
                document.getElementsByClassName("play-button")[0].classList.add("hidebutton");

                setTimeout(() => {
                    if (!mouseInside){
                    document.getElementsByClassName("play-button")[0].firstChild.firstChild.classList.remove("fa-pause");
                    document.getElementsByClassName("play-button")[0].firstChild.firstChild.classList.add("fa-play");}
                }, 500);
            }

            document.getElementsByClassName("video-player")[0].style.cursor = "none";
        }, 1000);
    }

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
        onMouseMove={() => {
            cooldownToHide();
        }}>
            <div className='play-button'>
                <h1><i className="fa-solid fa-play"></i></h1>
            </div>
            <div className='banner'>
                <img src={banner} alt="banner" />
            </div>
            <div className='controls' onMouseEnter={() => {
                if (isMobile)
                    return;
                const controls = document.getElementsByClassName('controls')[0];
                controls.classList.remove('hide');
                mouseInside = true;
            }} onMouseLeave={() => {
                mouseInside = false;
                cooldownToHide();
            }} onMouseMove={() => {
                if (isMobile)
                    return;
                const controls = document.getElementsByClassName('controls')[0];
                controls.classList.remove('hide');
                mouseInside = true;
            }} onTouchEndCapture={() => {
                mouseInside = false;
                cooldownToHide();
            }}>
                <button id="play" onClick={() => {
                    togglePlay();
                }}><i className="fa-solid fa-play"></i></button>
                <h5 id="currenttime">00:00</h5>
                <div className='progress-bar'>
                    <input type="range" id="progressBar" name="progressBar" defaultValue="0" min="0" max="100" onChange={
                        () => {
                            mouseInside = true;
                            const player = document.getElementById('player');
                            player.currentTime = document.getElementById("progressBar").value;
                            document.getElementById("currenttime").innerHTML = toHHMMSS(player.currentTime.toFixed(2));
                            
                            const currentPercentage = (player.currentTime / player.duration) * 100;
                            const progressBar = document.getElementById("progressBar");
                            progressBar.style.background = `linear-gradient(to right, var(--bar) 0%, var(--bar) ${currentPercentage}%, #fff ${currentPercentage}%, white 100%)`;
                        }
                    } onTouchEndCapture={() => {
                        mouseInside = false;
                        cooldownToHide();
                        }}></input>
                </div>

                <h5 id="duration">00:00:00</h5>
                <button id="audioIcon" onClick={() => {
                    toggleMute();

                }}><i className="fa-solid fa-volume-high"></i></button>
                <div className='audio-bar'>
                    <input type="range" id="audioBar" name="audioBar" defaultValue="0" min="0" max="100" onChange={() => {
                        const value = document.getElementById("audioBar").value;
                        changeAudio(value);
                        }}></input>
                </div>
                <button id="captionsIcon" onClick={() => {
                    const captions = document.getElementById('captions');
                    if (captions.track.mode === "showing")
                    {
                        captions.track.mode = "hidden";
                        document.getElementById("captionsIcon").innerHTML = "<i class='fa-regular fa-closed-captioning'></i>";
                    }else
                    {
                        captions.track.mode = "showing";
                        document.getElementById("captionsIcon").innerHTML = "<i class='fa-solid fa-closed-captioning'></i>";
                    }
                }}><i className="fa-solid fa-closed-captioning"></i></button>

                <button id="fullscreen" onClick={() => {
                    const player = document.getElementsByClassName('video-player')[0];
                    // toggle fullscreen
                    if (document.fullscreenElement) {
                        document.exitFullscreen();
                        setFullscreen();
                    } else {
                        player.requestFullscreen();
                        setExitFullscreen();
                    }

                }}><i className="fa-solid fa-expand"></i></button>
            </div>
            <video controls={false} id="player" playsInline crossOrigin='anonymous' style={{width: '100%', height: '100%'}}
                ref={player => (player = player)}
                onClick={() => {
                    if (isMobile)
                    {
                        const controls = document.getElementsByClassName('controls')[0];
                        if (controls.classList.contains('hide'))
                        {
                            controls.classList.remove('hide');
                            document.getElementsByClassName("play-button")[0].classList.remove("hidebutton");
                            document.getElementsByClassName("play-button")[0].firstChild.firstChild.classList.remove("fa-play");
                            document.getElementsByClassName("play-button")[0].firstChild.firstChild.classList.add("fa-pause");
                        } else
                        {
                            cooldownToHide();
                            togglePlay();
                        }
                    } else
                    {
                        togglePlay();
                    }
                }}
                onDoubleClick={(e) => {
                    const player = document.getElementsByClassName('video-player')[0];
                    if (isMobile)
                    {
                        e.preventDefault();
                        // get position of the click
                        const x = e.clientX - e.target.getBoundingClientRect().left;
                        const width = e.target.clientWidth;

                        const percentage = x / width;
                        if (percentage < 0.5)
                        {
                            document.getElementById('player').currentTime -= 5;
                        }else
                        {
                            document.getElementById('player').currentTime += 5;
                        }
                    } else {
                        e.preventDefault();
                        // toggle fullscreen
                        if (document.fullscreenElement) {
                            document.exitFullscreen();
                            setFullscreen();
                        } else {
                            player.requestFullscreen();
                            setExitFullscreen();
                        }
                    }
                }}
                >
                <source src="" type="video/mp4" />
                <track id="captions" src="" label="English" srcLang='en' kind="subtitles" default />
            </video>
        </div>
        </>
    );
}