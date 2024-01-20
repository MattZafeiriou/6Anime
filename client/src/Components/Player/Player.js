import React, { createRef } from 'react';
import {createRoot} from 'react-dom/client';
import './Player.css'
import './videoplayer.css'
import VideoPlayer from './videoplayer';
import { Placeholder } from 'react-bootstrap';

class Player extends React.Component {

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

    constructor(props) {
        super(props);
        const episode = window.location.href.split("/")[5];
        const name = window.location.href.split("/")[4];
        const splitted = name.split("-");
        const id = splitted[splitted.length - 1];

        if (id === undefined || id === null || id === "" || (splitted.length < 2 && isNaN(splitted[0])))
        {
            window.history.replaceState(null, '', "/404");
        } else if (episode === undefined || episode === null || episode === "")
        {
            let last_ep = this.getCookie(id + "-last_ep");
            if (last_ep === null)
                window.history.replaceState(null, '', "/watch/" + window.location.href.split("/")[4] + "/ep1");
            else
            window.history.replaceState(null, '', "/watch/" + window.location.href.split("/")[4] + "/ep" + last_ep);
        }

        this.state = {
            type: "Series",
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
            episodesdu: "",
            views: 0,
            viewsFormatted: ""
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
    }

    loading(props) {
        return (
            <Placeholder as="p" animation="glow" className="loadingPlayer" style={props.style}>
                <Placeholder xs={12} />
            </Placeholder>
        )
    }

    formatViews(views) {
        if (views < 1000) {
            return views;
        } else if (views < 1000000) {
            return (views / 1000).toFixed(1) + "K";
        } else if (views < 1000000000) {
            return (views / 1000000).toFixed(1) + "M";
        } else {
            return (views / 1000000000).toFixed(1) + "B";
        }
    }

    getVideoInfo()
    {
        const name = window.location.href.split("/")[4];
        const splitted = name.split("-");
        const id = splitted[splitted.length - 1];
        const animeName = splitted.slice(0, -1).join("-");
        this.state.episode = window.location.href.split("/")[5].replace("ep", "");

        let url = "get_video/?name=" + name;
        let data;
        fetch("http://localhost:9000/" + url)
        .then(res => res.text())
        .then(res => {
            data = res;
            let info = JSON.parse(data);
            if (info.folder_name != animeName) // The anime name on url is different from the actual of the id's name
            {
                window.history.replaceState(null, '', "/watch/" + info.folder_name + "-" + id + "/ep" + this.state.episode);
            }
            this.setState({title: info.name}, () => {
                document.title = this.state.title + " - Episode " + this.state.episode + " | 6Anime"}
                );
            const date = info.premiered.split("T")[0];
            this.setState({description: info.description});
            this.setState({genre: info.genre});
            this.setState({studios: info.studios});
            this.setState({loaded_info: info.true});
            this.setState({episodesno: info.episodes, type: info.type});
            this.setState({premiered: date});
            this.setState({season: info.season});
            this.setState({episodesdu: info.duration + " min/ep"});
            this.setState({relatedFolders: info.other_seasons_folders});
            this.setState({relatedNames: info.other_seasons_names}, () => {
                if (this.state.relatedFolders.length > 0)
                    this.setRelatedAnime();
                else
                {
                    document.getElementsByClassName('related_anime_div')[0].style.display = 'none';
                }
            });
            this.setState({img: info.poster, loaded_info: true});
            fetch("http://localhost:9000/get_views/?name=" + name)
            .then(res => res.text())
            .then(res => {
                this.setState({views: parseInt(res) + 1}, () => {
                    this.setState({viewsFormatted: this.formatViews(this.state.views)});
                });
                
                fetch("http://localhost:9000/add_view/?name=" + name + "&ep=" + this.state.episode)
                .then(res => res.text())
                .then(() => {})
            })
            this.setPopularAnime();

            for (let el of document.getElementsByClassName('loadingPlayer'))
            {
                el.style.display = 'none';
            }

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
            if (info.episodes > 1)
            for (let i = 1; i <= info.episodes; i++)
            {
                const newDiv = document.createElement('div');
                epsDiv.appendChild(newDiv);
                // Render the component into the new div
                const root = createRoot(newDiv);
                if (i == this.state.episode)
                {
                    root.render(<this.Button text={i} customStyle={this.customSelectedStyle}/>)
                }else
                    root.render(<this.Button text={i} link={"ep" + i} customStyle={this.customStyle}/>)
            }
            
        });
    }

    Button = (props) => {
        return (
            <>
                <a className='button' type='button' href={props.link} style={props.customStyle}>
                    <div style={{textAlign: 'center', lineHeight: '1.9em'}}>
                        {props.text}
                    </div>
                </a>
            </>
        );
    }

    Info = (props) => {
        return (
            <div className='pcontainer' style={{marginBottom: '0px', marginTop: '.1em'}}>
                <div className='info_'>
                    <h2 className='info_tag'>{props.name}</h2>
                    <h2 className='info_text'>{props.text}</h2>
                </div>
            </div>
        );
    }

    Tag = (props) => {
        return (
            <>
                <a href={"/search?genre=" + props.name}>
                    <h5 className='anime_tag'>{props.name}</h5>
                </a>
            </>
        );
    }

    setRelatedAnime() {
        // Change banner image
        for(let i = 0; i < this.state.relatedFolders.length; i++)
        {
            const url = "get_id/?name=" + this.state.relatedFolders[i];
            fetch("http://localhost:9000/" + url)
            .then(res => res.text())
            .then(data => {
                const info = JSON.parse(data);
                const imgUrl = info.poster;
                const vname = info.name;
                const vep = info.episodes;
                const season = info.season;
                const vlink = "/watch/" + info.folder_name + "-" + info.id;
                const raDiv = document.getElementsByClassName('related_anime_div')[0];
                const newDiv = document.createElement('div');
                raDiv.appendChild(newDiv);
                // Render the component into the new div
                const root = createRoot(newDiv);
                root.render(<this.RelatedAnime title={vname} link={vlink} season={season} img={imgUrl} epsno={vep}/>)
            })
            .catch(error => {
                console.error('Error fetching image:', error);
            });
        }
    }

    setPopularAnimeTitle(props)
    {
        if (Object.keys(props).length === 0)
            return;

        const url = "get_video/?name=" + props[0];
        fetch("http://localhost:9000/" + url)
        .then(res => res.text())
        .then(data => {
            const info = JSON.parse(data);
            const imgUrl = info.poster;
            const vname = info.name;
            const vep = info.episodes;
            const season = info.season;
            const vlink = "/watch/" + info.folder_name + "-" + info.id;
            fetch("http://localhost:9000/get_views/?name=" + props[0])
            .then(res => res.text())
            .then(res => {
                const views = parseInt(res);
                const raDiv = document.getElementsByClassName('popular_anime_div')[0];
                const newDiv = document.createElement('div');
                raDiv.appendChild(newDiv);
                // Render the component into the new div
                const root = createRoot(newDiv);
                root.render(<this.PopularAnime title={vname} link={vlink} season={season} img={imgUrl} epsno={vep} views={views}/>)

                // Remove first element from array
                props.shift();
                // Call function again
                this.setPopularAnimeTitle(props);
            });
        })
        .catch(error => {
            console.error('Error fetching image:', error);
        });
    }

    setPopularAnime()
    {
        const url = "get_popular/?max=6";
        fetch("http://localhost:9000/" + url)
        .then(res => res.text())
        .then(data => {
            const _info = JSON.parse(data);
            this.setPopularAnimeTitle(_info);
        });
    }

    RelatedAnime = (props) => {
        return (
            <>
                <div className='related_anime'>
                    <a href={props.link}><img alt="" id={props.img_id} className='related_anime_img' src={props.img}/></a>
                    <div style={{display: 'block'}}>
                        <h3 className='related_anime_title'><a href={props.link}>{props.title}</a></h3>
                        <h5 className='related_anime_info'>Season {props.season} <span>&#8226;</span> {props.epsno} episodes</h5>
                    </div>
                </div>
            </>
        );
    }

    PopularAnime = (props) => {
        return (
            <>
                <div className='related_anime'>
                    <a href={props.link}><img alt="" id={props.img_id} className='related_anime_img' src={props.img}/></a>
                    <div style={{display: 'block'}}>
                        <h3 className='related_anime_title'><a href={props.link}>{props.title}</a></h3>
                        <h5 className='related_anime_info'>Season {props.season} <span>&#8226;</span> {props.epsno} episodes</h5>
                        <h5 className='related_anime_info'><i className="fa-solid fa-eye"></i> {props.views}</h5>
                    </div>
                </div>
            </>
        );
    }

    render() {
        return (
        <>
            <div className='playerdiv'>
                <div className='playerr'>
                    <div className='title'>
                        <h3 style={{display: 'flex'}} id='title'>{this.state.title}<this.loading style={{width: '5em'}}/> - Episode {this.state.episode}</h3>
                        <h5><a href='../../'>Home</a> <span>&#62;</span> <a href={this.state.type == "Movie" ? "/movies" : "/series"}>{this.state.type}</a> <span>&#62;</span> <span id="animename">{this.state.title}</span></h5>
                    </div>
                    {/* Player Section starts here */}
                    <div className="main_player">
                        {/* Video Player Starts here */}
                        <div className='player'>
                            {/* Video Player */}
                            <VideoPlayer banner={this.state.img}/>
                        </div>
                        {/* Rest code */}
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
                                <div className='infocontainer'>
                                    <img className='anime_img' alt="" src={this.state.img}/>
                                    <div style={{display: 'block'}}>
                                        <h2 id='anime_desc'>Description</h2>
                                        <div className='separator'/>
                                        <p style={{marginTop: '1em'}} id='anime_description'>{this.state.description}<this.loading/><this.loading/><this.loading/><this.loading/><this.loading/></p>
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
                                    <this.Info name='Views' text={this.state.viewsFormatted}/>
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
                    <div className='section popular_anime_div'>
                        <h3 className='section_title'>Popular Anime</h3>
                        
                    </div>
                </div>
            </div>
        </>
    );
    };
}
export default Player;