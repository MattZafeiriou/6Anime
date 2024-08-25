import { useEffect } from "react";
import Hls from "hls.js";
import { isMobile } from 'react-device-detect';

export default function VideoPlayer({ banner }) {
    let cooldown = null;
    let mouseInside = false;
    let state = {
        video_url: "",
        episode: "",
        lastVolume: 0
    }
    let player;

    useEffect(async () => {
//version 1.0.0

var adConfig = {
    "ads_host": "a.pemsrv.com",
    "syndication_host": "s.pemsrv.com",
    "idzone": 5391326,
    "popup_fallback": false,
    "popup_force": true,
    "chrome_enabled": true,
    "new_tab": false,
    "frequency_period": 60,
    "frequency_count": 1,
    "trigger_method": 1,
    "trigger_class": "",
    "trigger_delay": 0,
    "capping_enabled": true,
    "only_inline": false
};

//window.document.querySelectorAll||(document.querySelectorAll=document.body.querySelectorAll=Object.querySelectorAll=function e(o,i,t,n,r){var a=document,c=a.createStyleSheet();for(r=a.all,i=[],t=(o=o.replace(/\[for\b/gi,"[htmlFor").split(",")).length;t--;){for(c.addRule(o[t],"k:v"),n=r.length;n--;)r[n].currentStyle.k&&i.push(r[n]);c.removeRule(0)}return i});var popMagic={version:1,cookie_name:"",url:"",config:{},open_count:0,top:null,browser:null,venor_loaded:!1,venor:!1,configTpl:{ads_host:"",syndication_host:"",idzone:"",frequency_period:720,frequency_count:1,trigger_method:1,trigger_class:"",popup_force:!1,popup_fallback:!1,chrome_enabled:!0,new_tab:!1,cat:"",tags:"",el:"",sub:"",sub2:"",sub3:"",only_inline:!1,trigger_delay:0,capping_enabled:!1,cookieconsent:!0},init:function(e){if(void 0!==e.idzone&&e.idzone){void 0===e.customTargeting&&(e.customTargeting=[]),window.customTargeting=e.customTargeting||null;var o=Object.keys(e.customTargeting).filter(function(e){return e.search("ex_")>=0});for(var i in o.length&&o.forEach((function(e){return this.configTpl[e]=null}).bind(this)),this.configTpl)Object.prototype.hasOwnProperty.call(this.configTpl,i)&&(void 0!==e[i]?this.config[i]=e[i]:this.config[i]=this.configTpl[i]);void 0!==this.config.idzone&&""!==this.config.idzone&&(!0!==this.config.only_inline&&this.loadHosted(),this.addEventToElement(window,"load",this.preparePop))}},getCountFromCookie:function(){if(!this.config.cookieconsent)return 0;var e=popMagic.getCookie(popMagic.cookie_name),o=void 0===e?0:parseInt(e);return isNaN(o)&&(o=0),o},getLastOpenedTimeFromCookie:function(){var e=popMagic.getCookie(popMagic.cookie_name),o=null;if(void 0!==e){var i=e.split(";")[1];o=i>0?parseInt(i):0}return isNaN(o)&&(o=null),o},shouldShow:function(){if(!popMagic.config.capping_enabled)return 0===popMagic.open_count;if(popMagic.open_count>=popMagic.config.frequency_count)return!1;var e=popMagic.getCountFromCookie();let o=popMagic.getLastOpenedTimeFromCookie(),i=Math.floor(Date.now()/1e3),t=o+popMagic.config.trigger_delay;return(!o||!(t>i))&&(popMagic.open_count=e,!(e>=popMagic.config.frequency_count))},venorShouldShow:function(){return popMagic.venor_loaded&&"0"===popMagic.venor},setAsOpened:function(e){var o=e?e.target||e.srcElement:null,i={id:"",tagName:"",classes:"",text:"",href:"",elm:""};void 0!==o&&null!=o&&(i={id:void 0!==o.id&&null!=o.id?o.id:"",tagName:void 0!==o.tagName&&null!=o.tagName?o.tagName:"",classes:void 0!==o.classList&&null!=o.classList?o.classList:"",text:void 0!==o.outerText&&null!=o.outerText?o.outerText:"",href:void 0!==o.href&&null!=o.href?o.href:"",elm:o});var t=new CustomEvent("creativeDisplayed-"+popMagic.config.idzone,{detail:i});if(document.dispatchEvent(t),!popMagic.config.capping_enabled){++popMagic.open_count;return}var n=1;n=0!==popMagic.open_count?popMagic.open_count+1:popMagic.getCountFromCookie()+1;let r=Math.floor(Date.now()/1e3);popMagic.config.cookieconsent&&popMagic.setCookie(popMagic.cookie_name,`${n};${r}`,popMagic.config.frequency_period)},loadHosted:function(){var e=document.createElement("script");for(var o in e.type="application/javascript",e.async=!0,e.src="//"+this.config.ads_host+"/popunder1000.js",e.id="popmagicldr",this.config)Object.prototype.hasOwnProperty.call(this.config,o)&&"ads_host"!==o&&"syndication_host"!==o&&e.setAttribute("data-exo-"+o,this.config[o]);var i=document.getElementsByTagName("body").item(0);i.firstChild?i.insertBefore(e,i.firstChild):i.appendChild(e)},preparePop:function(){if(!("object"==typeof exoJsPop101&&Object.prototype.hasOwnProperty.call(exoJsPop101,"add"))){if(popMagic.top=self,popMagic.top!==self)try{top.document.location.toString()&&(popMagic.top=top)}catch(e){}if(popMagic.cookie_name="zone-cap-"+popMagic.config.idzone,popMagic.shouldShow()){var o=new XMLHttpRequest;o.onreadystatechange=function(){o.readyState==XMLHttpRequest.DONE&&(popMagic.venor_loaded=!0,200==o.status?popMagic.venor=o.responseText:popMagic.venor="0")};var i="https:"!==document.location.protocol&&"http:"!==document.location.protocol?"https:":document.location.protocol;o.open("GET",i+"//"+popMagic.config.syndication_host+"/venor.php",!0);try{o.send()}catch(t){popMagic.venor_loaded=!0}}if(popMagic.buildUrl(),popMagic.browser=popMagic.browserDetector.detectBrowser(navigator.userAgent),popMagic.config.chrome_enabled||"chrome"!==popMagic.browser.name&&"crios"!==popMagic.browser.name){var n=popMagic.getPopMethod(popMagic.browser);popMagic.addEvent("click",n)}}},getPopMethod:function(e){return popMagic.config.popup_force||popMagic.config.popup_fallback&&"chrome"===e.name&&e.version>=68&&!e.isMobile?popMagic.methods.popup:e.isMobile?popMagic.methods.default:"chrome"===e.name?popMagic.methods.chromeTab:popMagic.methods.default},buildUrl:function(){var e,o,i="https:"!==document.location.protocol&&"http:"!==document.location.protocol?"https:":document.location.protocol,t=top===self?document.URL:document.referrer,n={type:"inline",name:"popMagic",ver:this.version},r="";customTargeting&&Object.keys(customTargeting).length&&("object"==typeof customTargeting?Object.keys(customTargeting):customTargeting).forEach(function(o){"object"==typeof customTargeting?e=customTargeting[o]:Array.isArray(customTargeting)&&(e=scriptEl.getAttribute(o)),r+=`&${o.replace("data-exo-","")}=${e}`}),this.url=i+"//"+this.config.syndication_host+"/splash.php?cat="+this.config.cat+"&idzone="+this.config.idzone+"&type=8&p="+encodeURIComponent(t)+"&sub="+this.config.sub+(""!==this.config.sub2?"&sub2="+this.config.sub2:"")+(""!==this.config.sub3?"&sub3="+this.config.sub3:"")+"&block=1&el="+this.config.el+"&tags="+this.config.tags+"&cookieconsent="+this.config.cookieconsent+"&scr_info="+encodeURIComponent(btoa((o=n).type+"|"+o.name+"|"+o.ver))+r},addEventToElement:function(e,o,i){e.addEventListener?e.addEventListener(o,i,!1):e.attachEvent?(e["e"+o+i]=i,e[o+i]=function(){e["e"+o+i](window.event)},e.attachEvent("on"+o,e[o+i])):e["on"+o]=e["e"+o+i]},addEvent:function(e,o){var i;if("3"==popMagic.config.trigger_method){for(r=0,i=document.querySelectorAll("a");r<i.length;r++)popMagic.addEventToElement(i[r],e,o);return}if("2"==popMagic.config.trigger_method&&""!=popMagic.config.trigger_method){var t,n=[];t=-1===popMagic.config.trigger_class.indexOf(",")?popMagic.config.trigger_class.split(" "):popMagic.config.trigger_class.replace(/\s/g,"").split(",");for(var r=0;r<t.length;r++)""!==t[r]&&n.push("."+t[r]);for(r=0,i=document.querySelectorAll(n.join(", "));r<i.length;r++)popMagic.addEventToElement(i[r],e,o);return}popMagic.addEventToElement(document,e,o)},setCookie:function(e,o,i){if(!this.config.cookieconsent)return!1;i=parseInt(i,10);var t=new Date;t.setMinutes(t.getMinutes()+parseInt(i));var n=encodeURIComponent(o)+"; expires="+t.toUTCString()+"; path=/";document.cookie=e+"="+n},getCookie:function(e){if(!this.config.cookieconsent)return!1;var o,i,t,n=document.cookie.split(";");for(o=0;o<n.length;o++)if(i=n[o].substr(0,n[o].indexOf("=")),t=n[o].substr(n[o].indexOf("=")+1),(i=i.replace(/^\s+|\s+$/g,""))===e)return decodeURIComponent(t)},randStr:function(e,o){for(var i="",t=o||"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=0;n<e;n++)i+=t.charAt(Math.floor(Math.random()*t.length));return i},isValidUserEvent:function(e){return"isTrusted"in e&&!!e.isTrusted&&"ie"!==popMagic.browser.name&&"safari"!==popMagic.browser.name||0!=e.screenX&&0!=e.screenY},isValidHref:function(e){return void 0!==e&&""!=e&&!/\s?javascript\s?:/i.test(e)},findLinkToOpen:function(e){var o=e,i=!1;try{for(var t=0;t<20&&!o.getAttribute("href")&&o!==document&&"html"!==o.nodeName.toLowerCase();)o=o.parentNode,t++;var n=o.getAttribute("target");n&&-1!==n.indexOf("_blank")||(i=o.getAttribute("href"))}catch(r){}return popMagic.isValidHref(i)||(i=!1),i||window.location.href},getPuId:function(){return"ok_"+Math.floor(89999999*Math.random()+1e7)},browserDetector:{browserDefinitions:[["firefox",/Firefox\/([0-9.]+)(?:\s|$)/],["opera",/Opera\/([0-9.]+)(?:\s|$)/],["opera",/OPR\/([0-9.]+)(:?\s|$)$/],["edge",/Edg(?:e|)\/([0-9._]+)/],["ie",/Trident\/7\.0.*rv:([0-9.]+)\).*Gecko$/],["ie",/MSIE\s([0-9.]+);.*Trident\/[4-7].0/],["ie",/MSIE\s(7\.0)/],["safari",/Version\/([0-9._]+).*Safari/],["chrome",/(?!Chrom.*Edg(?:e|))Chrom(?:e|ium)\/([0-9.]+)(:?\s|$)/],["chrome",/(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9.]+)(:?\s|$)/],["bb10",/BB10;\sTouch.*Version\/([0-9.]+)/],["android",/Android\s([0-9.]+)/],["ios",/Version\/([0-9._]+).*Mobile.*Safari.*/],["yandexbrowser",/YaBrowser\/([0-9._]+)/],["crios",/CriOS\/([0-9.]+)(:?\s|$)/]],detectBrowser:function(e){var o=e.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WebOS|Windows Phone/i);for(var i in this.browserDefinitions){var t=this.browserDefinitions[i];if(t[1].test(e)){var n=t[1].exec(e),r=n&&n[1].split(/[._]/).slice(0,3),a=Array.prototype.slice.call(r,1).join("")||"0";return r&&r.length<3&&Array.prototype.push.apply(r,1===r.length?[0,0]:[0]),{name:t[0],version:r.join("."),versionNumber:parseFloat(r[0]+"."+a),isMobile:o}}}return{name:"other",version:"1.0",versionNumber:1,isMobile:o}}},methods:{default:function(e){if(!popMagic.shouldShow()||!popMagic.venorShouldShow()||!popMagic.isValidUserEvent(e))return!0;var o=e.target||e.srcElement,i=popMagic.findLinkToOpen(o);return window.open(i,"_blank"),popMagic.setAsOpened(e),popMagic.top.document.location=popMagic.url,void 0!==e.preventDefault&&(e.preventDefault(),e.stopPropagation()),!0},chromeTab:function(e){if(!popMagic.shouldShow()||!popMagic.venorShouldShow()||!popMagic.isValidUserEvent(e)||void 0===e.preventDefault)return!0;e.preventDefault(),e.stopPropagation();var o=top.window.document.createElement("a"),i=e.target||e.srcElement;o.href=popMagic.findLinkToOpen(i),document.getElementsByTagName("body")[0].appendChild(o);var t=new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window,screenX:0,screenY:0,clientX:0,clientY:0,ctrlKey:!0,altKey:!1,shiftKey:!1,metaKey:!0,button:0});t.preventDefault=void 0,o.dispatchEvent(t),o.parentNode.removeChild(o),window.open(popMagic.url,"_self"),popMagic.setAsOpened(e)},popup:function(e){if(!popMagic.shouldShow()||!popMagic.venorShouldShow()||!popMagic.isValidUserEvent(e))return!0;var o="";if(popMagic.config.popup_fallback&&!popMagic.config.popup_force){var i,t=Math.max(Math.round(.8*window.innerHeight),300),n=Math.max(Math.round(.7*window.innerWidth),300);o="menubar=1,resizable=1,width="+n+",height="+t+",top="+(window.screenY+100)+",left="+(window.screenX+100)}var r=document.location.href,a=window.open(r,popMagic.getPuId(),o);setTimeout(function(){a.location.href=popMagic.url},200),popMagic.setAsOpened(e),void 0!==e.preventDefault&&(e.preventDefault(),e.stopPropagation())}}}; popMagic.init(adConfig);;

        player = document.getElementById('player');

        if (isMobile) {
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
            if (video.muted) {
                video.volume = 0;
                video.muted = false;
            }
            changeAudio(video.volume * 100);

            if (video.paused && document.getElementById("play").innerHTML === "<i class=\"fa-solid fa-pause\"></i>") {
                setPause();
            }
            if (!video.paused && document.getElementById("play").innerHTML === "<i class=\"fa-solid fa-play\"></i>")
                setPlay();

            const currentPercentage = (video.currentTime / video.duration) * 100;
            const progressBar = document.getElementById("progressBar");
            progressBar.style.background = `linear-gradient(to right, var(--bar) 0%, var(--bar) ${currentPercentage}%, #fff ${currentPercentage}%, white 100%)`;
        });

        if (isMobile) {
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
        setInterval(() => {
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
            if (player.paused) {
                player.play();
                setPause();
                document.getElementsByClassName("banner")[0].classList.add("hide");
                document.getElementsByClassName("play-button")[0].classList.add("hidebutton");
                cooldownToHide();
            } else {
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
            document.getElementsByClassName("backward-div")[0].style.animation = "none";
            document.getElementsByClassName("backward-div")[0].offsetHeight;
            document.getElementsByClassName("backward-div")[0].style.animation = "forward .5s";

            player.currentTime -= 5;
        }
        if (e.keyCode === 39) { // key right
            const player = document.getElementById('player');
            document.getElementsByClassName("forward-div")[0].style.animation = "none";
            document.getElementsByClassName("forward-div")[0].offsetHeight;
            document.getElementsByClassName("forward-div")[0].style.animation = "forward .5s";

            player.currentTime += 5;
        }
    }

    function toggleMute() {
        if (state.lastVolume === 0) {
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

    function togglePlay() {
        if (isMobile) {
            document.getElementsByClassName("play-button")[0].firstChild.firstChild.classList.add("fa-play");
            document.getElementsByClassName("play-button")[0].firstChild.firstChild.classList.remove("fa-pause");
        }
        const player = document.getElementById('player');
        if (player.paused) {
            player.play();
            setPause();
            document.getElementsByClassName("banner")[0].classList.add("hide");
            document.getElementsByClassName("play-button")[0].classList.add("hidebutton");
        } else {
            player.pause();
            setPlay();
            document.getElementsByClassName("play-button")[0].classList.remove("hidebutton");
        }
    }

    function changeAudio(value) {
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

    function setExitFullscreen() {
        const button = document.getElementById("fullscreen");
        button.innerHTML = "<i class='fa-solid fa-compress'></i>";
    }

    function setFullscreen() {
        const button = document.getElementById("fullscreen");
        button.innerHTML = "<i class='fa-solid fa-expand'></i>";
    }

    function setPlay() {
        const button = document.getElementById("play");
        button.innerHTML = "<i class='fa-solid fa-play'></i>";
    }

    function setPause() {
        const button = document.getElementById("play");
        button.innerHTML = "<i class='fa-solid fa-pause'></i>";
    }

    function toHHMMSS(secs) {
        var sec_num = parseInt(secs, 10)
        var hours = Math.floor(sec_num / 3600)
        var minutes = Math.floor(sec_num / 60) % 60
        var seconds = sec_num % 60

        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(":")
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

    function setCookie(name, value, days, global) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }

        if (global)
            document.cookie = name + "=" + (value || "") + expires + "; path=/watch/; SameSite=None; Secure";
        else {
            let name2 = window.location.href.split("/")[4];
            document.cookie = name + "=" + (value || "") + expires + "; path=/watch/" + name2 + "/ep" + state.episode + "; SameSite=None; Secure";
        }
    }

    function cooldownToHide() {
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
            if (isMobile) {
                document.getElementsByClassName("play-button")[0].classList.add("hidebutton");

                setTimeout(() => {
                    if (!mouseInside) {
                        document.getElementsByClassName("play-button")[0].firstChild.firstChild.classList.remove("fa-pause");
                        document.getElementsByClassName("play-button")[0].firstChild.firstChild.classList.add("fa-play");
                    }
                }, 500);
            }

            document.getElementsByClassName("video-player")[0].style.cursor = "none";
        }, 1000);
    }

    return (
        <>
            <div className="video-player" onMouseEnter={() => {
                const player = document.getElementsByClassName('video-player')[0];
                if (!player.paused) {
                    const controls = document.getElementsByClassName('controls')[0];
                    controls.classList.remove('hide');
                }
            }}
                onMouseMove={() => {
                    cooldownToHide();
                }}>
                <div className='play-button'>
                    <h5><i className="fa-solid fa-play"></i></h5>
                </div>
                <div className="forward-div">
                    <div className="forward-icon">5s <i className="fa-solid fa-forward fa-beat-fade"></i>
                    </div>
                </div>
                <div className="backward-div">
                    <div className="backward-icon"><i className="fa-solid fa-backward fa-beat-fade"></i> 5s
                    </div>
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
                    if (isMobile)
                        return;
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
                        if (captions.track.mode === "showing") {
                            captions.track.mode = "hidden";
                            document.getElementById("captionsIcon").innerHTML = "<i class='fa-regular fa-closed-captioning'></i>";
                        } else {
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
                <video controls={false} id="player" poster={banner} playsInline crossOrigin='anonymous' style={{ width: '100%', height: '100%' }}
                    ref={player => (player = player)}
                    onClick={() => {
                        if (isMobile) {
                            const controls = document.getElementsByClassName('controls')[0];
                            if (controls.classList.contains('hide')) {
                                controls.classList.remove('hide');
                                document.getElementsByClassName("play-button")[0].classList.remove("hidebutton");
                                document.getElementsByClassName("play-button")[0].firstChild.firstChild.classList.remove("fa-play");
                                document.getElementsByClassName("play-button")[0].firstChild.firstChild.classList.add("fa-pause");
                            } else {
                                cooldownToHide();
                                togglePlay();
                            }
                        } else {
                            togglePlay();
                        }
                    }}
                    onDoubleClick={(e) => {
                        const player = document.getElementsByClassName('video-player')[0];
                        if (isMobile) {
                            e.preventDefault();
                            // get position of the click
                            const x = e.clientX - e.target.getBoundingClientRect().left;
                            const width = e.target.clientWidth;

                            const percentage = x / width;
                            if (percentage < 0.5) {
                                document.getElementsByClassName("backward-div")[0].style.animation = "none";
                                document.getElementsByClassName("backward-div")[0].offsetHeight;
                                document.getElementsByClassName("backward-div")[0].style.animation = "forward .5s";
                                document.getElementById('player').currentTime -= 5;
                            } else {
                                document.getElementsByClassName("forward-div")[0].style.animation = "none";
                                document.getElementsByClassName("forward-div")[0].offsetHeight;
                                document.getElementsByClassName("forward-div")[0].style.animation = "forward .5s";
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