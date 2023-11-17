import React, { createRef } from 'react';
import {createRoot} from 'react-dom/client';
import './Player.css'
import './videoplayer.css'
import Hls from "hls.js";

class Playerr extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            loaded_info: false,
            title: "",
            episode: "",
            description: "",
            genre: "",
            studios: [],
            relatedFolders: [],
            relatedNames: [],
            img: "",
            episodesno: "",
            premiered: "",
            season: "",
            episodesdu: ""
        };
        this.customStyle = {
            backgroundColor: 'hsl(0, 60%, 30%)',
            color: 'white',
            border: '3px #9b2727 solid',
            width: '2.3em',
            height: '2.3em',
            padding: '0px',
            float: 'left',
            marginRight: '1em',
            marginBottom: '1em'
        }

        this.customSelectedStyle = {
            backgroundColor: 'hsl(0, 60%, 30%)',
            color: 'white',
            border: '3px hsl(0, 60%, 70%) solid',
            boxShadow: '0px 0px 3px hsl(0, 60%, 70%)',
            width: '2.3em',
            height: '2.3em',
            padding: '0px',
            float: 'left',
            marginRight: '1em',
            marginBottom: '1em'
        }
        this.player = createRef();
        this.getVideoInfo = this.getVideoInfo.bind(this);
        this.getVideoInfo();
        this.render = this.render.bind(this);
        this.setCookies = this.setCookies.bind(this);
    }

    
    getVideoInfo()
    {
        let name = window.location.href.split("/")[4];
        this.state.episode = window.location.href.split("/")[5].replace("ep", "");

        // Change banner image
        var url = "anime_url/?name=" + name + "&ep=" + this.state.episode;
        fetch("http://localhost:9000/" + url)
        .then(res => res.text())
        .then(data => {
            const myVideo= document.getElementsByClassName('plyr__video-wrapper')[0];
            for (const child of myVideo.children) {
                if (child.tagName === 'VIDEO')
                {
                    child.setAttribute('src', data);
                    break;
                }
            }
            this.setCookies();
        })
        .catch(error => {
            console.error('Error fetching anime url:', error);
        });

        url = "get_video/?name=" + name;
        let data;
        fetch("http://localhost:9000/" + url)
        .then(res => res.text())
        .then(res => {
            data = res;
            let info = JSON.parse(data);
            this.setState({title: info.name});
            this.setState({description: info.description});
            this.setState({genre: info.genre});
            this.setState({studios: info.studios});
            this.setState({loaded_info: info.true});
            this.setState({episodesno: info.episodes});
            this.setState({premiered: info.premiered});
            this.setState({season: info.season});
            this.setState({episodesdu: info.duration + " min/ep"});
            this.setState({relatedFolders: info.other_seasons_folders});
            this.setState({relatedNames: info.other_seasons_names}, () => {this.setRelatedAnime();});

            let oof = false;
            if (this.state.episode == 1)
            {
                oof = true;
                document.getElementById("next_ep").children[0].href = "ep" + (parseInt(this.state.episode) + 1);
                const btn = document.getElementById("previous_ep").children[0];
                btn.style.opacity = '0.5';
                btn.style.color = 'gray';
                btn.classList.remove('button');
                btn.classList.add('button_disabled');
                btn.children[0].innerHTML = "No Previous Episode";
            }
            if (info.episodes == this.state.episode)
            {
                oof = true;
                document.getElementById("previous_ep").children[0].href = "ep" + (parseInt(this.state.episode) - 1);
                const btn = document.getElementById("next_ep").children[0];
                btn.style.opacity = '0.5';
                btn.style.color = 'gray';
                btn.classList.remove('button');
                btn.classList.add('button_disabled');
                btn.children[0].innerHTML = "No Next Episode";
            }
            if (!oof) 
            {
                document.getElementById("previous_ep").children[0].href = "ep" + (parseInt(this.state.episode) - 1);
                document.getElementById("next_ep").children[0].href = "ep" + (parseInt(this.state.episode) + 1);
            }

            const tagsDiv = document.getElementById('tags');
            // Create anime tags
            for (let i = 0; i < info.genre.length; i++)
            {
                const newDiv = document.createElement('div');
                tagsDiv.appendChild(newDiv);
                // Render the component into the new div
                const root = createRoot(newDiv);
                root.render(<this.Tag name={info.genre[i]}/>)
            }
            // Create anime episode buttons
            const epsDiv = document.getElementById('episodes');
            for (let i = 1; i <= info.episodes; i++)
            {
                const newDiv = document.createElement('div');
                epsDiv.appendChild(newDiv);
                // Render the component into the new div
                const root = createRoot(newDiv);
                if (i == this.state.episode)
                    root.render(<this.Button text={i} customStyle={this.customSelectedStyle}/>)
                else
                    root.render(<this.Button text={i} link={"ep" + i} customStyle={this.customStyle}/>)
            }
            
        });
        // Change banner image
        var url = "get_image/?name=" + name;
        fetch("http://localhost:9000/" + url)
        .then(res => res.arrayBuffer())
        .then(data => {
            const blob = new Blob([data], { type: 'image/jpeg' }); // Adjust the type as per your image format
            const imgUrl = URL.createObjectURL(blob);

            this.setState({img: imgUrl});
            this.state.loaded_info = true;
        })
        .catch(error => {
            console.error('Error fetching image:', error);
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

    setCookie(name, value, days) {
        let expires = "";
        if (days) {
          let date = new Date();
          date.setTime(date.getTime() + (days*24*60*60*1000));
          expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/p" + "; SameSite=None; Secure";
    }

    setCookies() {
        // get and change time and volume to last session's
        let currentTime = this.getCookie("currentTime");
        let currentVolume = this.getCookie("currentVolume");
        const plyrInstance = this.player.current.plyr;

        if (currentTime)
            plyrInstance.currentTime = parseInt(currentTime);

        if (currentVolume)
            plyrInstance.currentVolume = parseInt(currentTime);
        
        // Save current time and volume every second
        setInterval(() =>{
            this.setCookie("currentTime", plyrInstance.currentTime, 7);
            this.setCookie("currentVolume", plyrInstance.volume, 7);
        }, 1000);
    }

    Button = (proms) => {
        return (
            <>
                <a className='button' type='button' href={proms.link} style={proms.customStyle}>
                    <div style={{textAlign: 'center', lineHeight: '1.9em'}}>
                        {proms.text}
                    </div>
                </a>
            </>
        );
    }

    Info = (proms) => {
        return (
            <div className='pcontainer' style={{marginBottom: '0px', marginTop: '.1em'}}>
                <div className='info_'>
                    <h2 className='info_tag'>{proms.name}</h2>
                    <h2 className='info_text'>{proms.text}</h2>
                </div>
            </div>
        );
    }

    Tag = (proms) => {
        return (
            <>
                <h5 className='anime_tag'>{proms.name}</h5>
            </>
        );
    }

    setRelatedAnime() {
        // Change banner image
        for(let i = 0; i < this.state.relatedFolders.length; i++)
        {
            let url = "get_image/?name=" + this.state.relatedFolders[i];
            let imgUrl = "";

            fetch("http://localhost:9000/" + url)
            .then(res => res.arrayBuffer())
            .then(data => {
                const blob = new Blob([data], { type: 'image/jpeg' }); // Adjust the type as per your image format
                imgUrl = URL.createObjectURL(blob);

                url = "get_video/?name=" + this.state.relatedFolders[i];
                fetch("http://localhost:9000/" + url)
                .then(res2 => res2.text())
                .then(res2 => {
                    let data2 = res2;
                    let info = JSON.parse(data2);

                    let vname = info.name;
                    let vep = info.episodes;
                    let season = info.season;
                    let vlink = "/p/" + info.folder_name + "/ep1";
                    let raDiv = document.getElementsByClassName('related_anime_div')[0];
                    const newDiv = document.createElement('div');
                    raDiv.appendChild(newDiv);
                    // Render the component into the new div
                    const root = createRoot(newDiv);
                    root.render(<this.RelatedAnime title={vname} link={vlink} season={season} img={imgUrl} epsno={vep}/>)
                })
            })
            .catch(error => {
                console.error('Error fetching image:', error);
            });
        }
    }

    RelatedAnime = (proms) => {
        return (
            <>
                <div className='related_anime'>
                    <a href={proms.link}><img id={proms.img_id} className='related_anime_img' src={proms.img}/></a>
                    <div style={{display: 'block'}}>
                        <h3 className='related_anime_title'><a href={proms.link}>{proms.title}</a></h3>
                        <h5 className='related_anime_info'>Season {proms.season} <span>&#8226;</span> {proms.epsno} episodes</h5>
                    </div>
                </div>
            </>
        );
    }

    componentDidMount() {
        
    }

    componentDidUpdate() {
        const video = this.player;
        const hls = new Hls();
        const url = "https://eno.tendoloads.com/_v6/04c62d67738da375aca8b1659516f077c74801fa368082aa2ebd5c4556d4a621e40149ff082d9d6b627f702d28718f4cefec91e79fa9d9f8e407df2c2424be0114f0b211b8e8eb14baff1d78eb556215114a397444824941bed9fc5f7e12ed38b17fff668113bf7e2be351ef365348a89ba0ec5cdbbc56fd9b916d6342e2f46b/master.m3u8";
   
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
        <>
            <div className="gradient"></div>
            <div className='playerdiv'>
                <div className='playerr'>
                    <div className='title'>
                        <h3 id='title'>{this.state.title} - Episode {this.state.episode}</h3>
                    </div>
                    {/* Player Section starts here */}
                    <div className="main_player">
                        {/* Video Player Starts here */}
                        <div className='player'>
                            {/* Video Player */}
                            <video id="player" playsinline crossOrigin='anonymous' style={{width: '100%', height: '100%'}}
                                ref={player => (this.player = player)}>
                                <source src="" type="video/mp4" />
                                <track src="https://cc.bunnyccdn.co/ca/6e/ca6e95a207b37aa7dfff60a5fe12dd75/eng-3.vtt" label="English" srcLang='en' kind="subtitles" default />
                            </video>
                            {/* Video Controls */}
                            <div class="controls">
                                <button class="play-button control-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                                <input type="range" min="0" max="100" class="timeline" value="0" />
                                <button class="sound-button control-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                    </svg>
                                </button>
                                <button class="control-button fullscreen-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className='separator'/>
                        <div className='pcontainer'>
                            <div id="previous_ep">
                                <this.Button id="previous_ep" text="Previous Episode" customStyle={{backgroundColor: '#9b2727', color: 'white', width: '35%', float: 'left'}}/>
                            </div>
                            <div id="next_ep">
                                <this.Button id="next_ep" text="Next Episode" customStyle={{backgroundColor: '#9b2727', color: 'white', width: '35%', float: 'right'}}/>
                            </div>
                        </div>
                        <div id="episodes" className='pcontainer'>
                        </div>
                        <div className='separator'/>
                        <div className='pcontainer'>
                            <div style={{marginBottom: '1em'}}>
                                <div style={{display: 'flex'}}>
                                    <img className='anime_img' src={this.state.img}/>
                                    <div style={{display: 'block'}}>
                                        <h2 id='anime_desc'>Description</h2>
                                        <div className='separator'/>
                                        <p style={{marginTop: '1em'}} id='anime_description'>{this.state.description}</p>
                                        <div id='tags' className='tags'>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='separator'/>
                            <div style={{marginTop: '1em'}}>
                                <div className='anime_info'>
                                    <this.Info name='Season' text={this.state.season}/>
                                    <this.Info name='Publisher' text={this.state.studios}/>
                                    <this.Info name='Episodes' text={this.state.episodesno}/>
                                    <this.Info name='Duration' text={this.state.episodesdu}/>
                                    <this.Info name='Premiered' text={this.state.premiered}/>
                                </div>
                            </div>
                            <div style={{margin:'1em'}}/>
                        </div>
                    </div>
                </div>
                <div className='right_side'>
                    <div className='section related_anime_div'>
                        <h3 className='section_title'>Related Anime</h3>
                    </div>
                </div>
            </div>
        </>
    );
    };
}
export default Playerr;