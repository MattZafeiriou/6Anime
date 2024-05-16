import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Sponsored from '../../components/Sponsored';
import { Placeholder } from 'react-bootstrap';
import {createRoot} from 'react-dom/client';
import VideoPlayer from '../../components/VideoPlayer';
import Head from 'next/head'

export default function Watch({titleseg,epsegment, animeinfo, other_season_ids}) {
    const router = useRouter()
    const { segments } = router.query
    if (typeof window === 'undefined') 
    {
        let oof = JSON.parse(animeinfo).name;
        let oof2 = oof.split(" ");
        //capitalize every first letter
        const max = JSON.parse(animeinfo).episodes > 50 ? 50 : JSON.parse(animeinfo).episodes;
        const episodes = Array.from({ length: max }, (_, index) => index + 1);
        for (let i = 0; i < oof2.length; i++)
        {
            oof2[i] = oof2[i].charAt(0).toUpperCase() + oof2[i].slice(1);
        }
        oof2 = oof2.join(" ");
        return (
            <>
                <Head>
                    <title>{`Watch ${oof2} on 6Anime for free! - Free HD Anime Online - Fast Secure No Ads!`}</title>
                    <meta
                    name="keywords"
                    content={`anime, free anime, 6anime, 9anime, anime streaming, anime online, anime hd, anime free, anime website, anime site, anime watch, anime watch online, anime watch free, anime watch hd, anime watch online free, anime watch online hd, anime watch free online, anime watch free hd, anime watch free online hd, anime watch free online english sub, anime watch free online english dub, anime watch free online english subbed, anime watch free online english dubbed, anime watch free online english subbed and dubbed, anime watch free online english subbed hd, anime watch free online english, watch ${oof2} online subtitle, watch ${oof2} online dub, watch ${oof2} online english sub, watch ${oof2} online english dub, watch ${oof2} online english subbed, watch ${oof2} online english dubbed, watch ${oof2} online english subbed and dubbed, watch ${oof2} online english subbed hd`}
                    />
                    <meta
                    property="og:description"
                    content="6Anime: Your ultimate anime destination. Enjoy free, competitive streaming with access to any anime you desire."
                    />
                </Head>
                <div>
                <h1>loading...</h1>
                <div className='related_anime_del'>
                    {other_season_ids.map((item, index) => (
                        <a href={"/watch/" + item}>{item}</a>
                    ))}
                </div>
                <div className='genre'>
                {JSON.parse(animeinfo).genre.map((item, index) => (
                        <a href={"/search?genre" + item}>{item}</a>
                    ))}
                </div>
                <div className='episodes'>
                {episodes.map((number) => (
                        <a href={"/watch/" + titleseg + "/ep" + number}>{number}</a>
                    ))}
                </div>
                </div>
            </>
        );
    }
    const name = segments[0];
    const splitted = name.split('-');
    const id = splitted[splitted.length - 1];
    let episode = segments[1];

    if (id === undefined || id === null || id === "" || (splitted.length < 2 && isNaN(splitted[0])))
    {
        window.history.replaceState(null, '', "/404");
    } else if (episode === undefined || episode === null || episode === "")
    {
        let last_ep = getCookie(id + "-last_ep");
        if (last_ep === null)
        {
            window.history.replaceState(null, '', "/watch/" + window.location.href.split("/")[4] + "/ep1");
            episode = "ep1";
        }else{
            window.history.replaceState(null, '', "/watch/" + window.location.href.split("/")[4] + "/ep" + last_ep);
            episode = "ep" + last_ep;
        }
    }
    episode = episode.replace("ep", "");

    const [type, setType] = useState("Series");
    const [loaded_info, setLoadedInfo] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState("");
    const [studios, setStudios] = useState([]);
    const [other_season_folders, setOtherSeasonFolders] = useState([]);
    const [other_season_names, setOtherSeasonNames] = useState([]);
    const [img, setImg] = useState("");
    const [banner, setBanner] = useState("");
    const [episodesno, setEpisodesno] = useState("");
    const [premiered, setPremiered] = useState("");
    const [season, setSeason] = useState("");
    const [episodesdu, setEpisodesdu] = useState("");
    const [views, setViews] = useState(0);
    const [viewsFormatted, setViewsFormatted] = useState("");

    let customStyle = {
        fontFamily: 'Roboto',
        backgroundColor: 'rgb(80, 80, 80, 1)',
        color: 'white',
        border: 'none',
        width: '2.5em',
        height: '1.8em',
        padding: '0px',
        float: 'left',
        marginLeft: '.3em',
        marginRight: '.3em',
        marginBottom: '.5em'
    };
    let customSelectedStyle = {
        fontFamily: 'Roboto',
        backgroundColor: 'hsl(0, 60%, 30%)',
        color: 'white',
        border: 'none',
        width: '2.5em',
        height: '1.8em',
        padding: '0px',
        float: 'left',
        marginLeft: '.3em',
        marginRight: '.3em',
        marginBottom: '.5em'
    };

    function formatViews(views) {
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

    function Button(props) {
        return (
            <>
                <a className='button' type='button' href={props.link} style={props.customStyle}>
                    <div style={{textAlign: 'center', fontSize: '.9em', lineHeight: '2em'}}>
                        {props.text}
                    </div>
                </a>
            </>
        );
    }

    function Episodes(props) {
        return (
            <h3 onClick={(e) => {
                if (e.target.id === "") {
                    createEpisodes(props.min, props.max, episode);
                }
                document.getElementById("active_episode_100").id = "";
                e.target.id = "active_episode_100";
            }} id={props.active === undefined ? "" : "active_episode_100"}>{`${props.min === 1 ? "001" : props.min}-${props.max}`}</h3>
        )
    }
    
    function Tag(props) {
        return (
            <>
                <a href={"/search?genre=" + props.name}>
                    <h5 className='anime_tag'>{props.name}</h5>
                </a>
            </>
        );
    }

    function Info(props) {
        return (
            <div className='pcontainer' style={{marginBottom: '0px', marginTop: '.1em'}}>
                <div className='info_'>
                    <h2 className='info_tag'>{props.name}</h2>
                    <h2 className='info_text'>{props.text}</h2>
                </div>
            </div>
        );
    }

    async function getVideoInfo()
    {
        const name = window.location.href.split("/")[4];
        const splitted = name.split("-");
        const id = splitted[splitted.length - 1];
        const animeName = splitted.slice(0, -1).join("-");

            const data = animeinfo;
            let info = JSON.parse(data);
            if (info.folder_name != animeName) // The anime name on url is different from the actual of the id's name
            {
                window.history.replaceState(null, '', "/watch/" + info.folder_name + "-" + id + "/ep" + episode);
            }
            setTitle(info.name);
            const date = info.premiered;
            setDescription(info.description);
            setGenre(info.genre);
            setStudios(info.studios);
            setLoadedInfo(info.true);
            setEpisodesno(info.episodes);
            setType(info.type);
            setPremiered(date);
            setSeason(info.season);
            setEpisodesdu(info.duration + " min/ep");
            setOtherSeasonFolders(info.other_season_folders);
            setOtherSeasonNames(info.other_season_names);
            if (info.other_season_folders.length > 0)
                setRelatedAnime(info.other_season_folders);
            else
                document.getElementsByClassName('related_anime_div')[0].style.display = 'none';
            setBanner(info.banner);
            setImg(info.poster);
            setLoadedInfo(true);
            await fetch(process.env.NEXT_PUBLIC_API_URL + "/getviews/?id=" + id )
            .then(res => res.text())
            .then(res => {
                setViews(parseInt(res) + 1);
                setViewsFormatted(formatViews(parseInt(res) + 1));

                fetch(process.env.NEXT_PUBLIC_API_URL + "/addview/?id=" + id + "&ep=" + episode)
                .then(res => res.text())
                .then(() => {})
            })
            setPopularAnime();

            for (let el of document.getElementsByClassName('loadingPlayer'))
            {
                el.style.display = 'none';
            }

            let oof = false;
            if (episode == 1)
            {
                oof = true;
                document.getElementById("next_ep").children[0].href = "ep" + (parseInt(episode) + 1);
                const btn = document.getElementById("previous_ep").children[0];
                btn.style.opacity = '0.5';
                btn.style.color = 'gray';
                btn.classList.remove('button');
                btn.classList.add('button_disabled');
                btn.children[0].innerHTML = "No Previous Episode";
            }
            if (info.episodes == episode)
            {
                oof = true;
                document.getElementById("previous_ep").children[0].href = "ep" + (parseInt(episode) - 1);
                const btn = document.getElementById("next_ep").children[0];
                btn.style.opacity = '0.5';
                btn.style.color = 'gray';
                btn.classList.remove('button');
                btn.classList.add('button_disabled');
                btn.children[0].innerHTML = "No Next Episode";
            }
            if (!oof) 
            {
                document.getElementById("previous_ep").children[0].href = "ep" + (parseInt(episode) - 1);
                document.getElementById("next_ep").children[0].href = "ep" + (parseInt(episode) + 1);
            }

            const tagsDiv = document.getElementById('tags');
            // Create anime tags
            for (let i = 0; i < info.genre.length; i++)
            {
                const newDiv = document.createElement('div');
                tagsDiv.appendChild(newDiv);
                // Render the component into the new div
                const root = createRoot(newDiv);
                root.render(<Tag name={info.genre[i]}/>)
            }
            // Create anime episode buttons
            const epsDiv = document.getElementById('episodes');
            const hundredsDiv = document.getElementsByClassName('episode_100s')[0];
            if (info.episodes > 1)
            {
                const eps = info.episodes;
                const hundreds = Math.floor(eps / 100);
                if (hundreds > 0)
                {
                    for (let i = 0; i < hundreds; i++)
                    {

                        const newDiv = document.createElement('div');
                        hundredsDiv.appendChild(newDiv);
                        // Render the component into the new div
                        const root = createRoot(newDiv);
                        if (episode >= i * 100 + 1 && episode <= i * 100 + 100)
                        {
                            root.render(<Episodes min={i * 100 + 1} max={i * 100 + 100} active/>)
                            createEpisodes(i * 100 + 1, i * 100 + 100, episode);
                        } else
                            root.render(<Episodes min={i * 100 + 1} max={i * 100 + 100}/>)
                    }
                }
                const remaining = eps % 100;
                if (remaining > 0)
                {
                    const newDiv = document.createElement('div');
                    hundredsDiv.appendChild(newDiv);
                    // Render the component into the new div
                    const root = createRoot(newDiv);
                    if (episode >= hundreds * 100 + 1 && episode <= hundreds * 100 + remaining)
                    {
                        root.render(<Episodes min={hundreds * 100 + 1} max={hundreds * 100 + remaining} active/>)
                        createEpisodes(hundreds * 100 + 1, hundreds * 100 + remaining, episode);
                    } else
                        root.render(<Episodes min={hundreds * 100 + 1} max={hundreds * 100 + remaining}/>)
                }
            } else
                epsDiv.style.display = 'none';

    }

    function createEpisodes(min, max, episode = 1) {
        const epsDiv = document.getElementById('episodes');
        epsDiv.innerHTML = "";
        for (let i = min; i <= max; i++)
            {
                const newDiv = document.createElement('div');
                epsDiv.appendChild(newDiv);
                // Render the component into the new div
                const root = createRoot(newDiv);
                if (i == episode)
                {
                    root.render(<Button text={i} customStyle={customSelectedStyle}/>)
                }else
                    root.render(<Button text={i} link={"/watch/" + titleseg + "/ep" + i} customStyle={customStyle}/>)
            }
    }

    function setPopularAnimeTitle(props)
    {
        for (let i = 0; i < props.length; i++)
        {
            const url = "/getvideo/?id=" + props[i];
            fetch(process.env.NEXT_PUBLIC_API_URL + url)
            .then(res => res.text())
            .then(data => {
                const info = JSON.parse(data);
                const imgUrl = info.poster;
                const vname = info.name;
                const vep = info.episodes;
                const type = info.type;
                const vlink = "/watch/" + info.folder_name + "-" + info.id;
                fetch(process.env.NEXT_PUBLIC_API_URL + "/getviews/?id=" + props[i])
                .then(res => res.text())
                .then(res => {
                    const views = parseInt(res);
                    const raDiv = document.getElementsByClassName('popular_anime_div')[0];
                    const newDiv = document.createElement('div');
                    raDiv.appendChild(newDiv);
                    // Render the component into the new div
                    const root = createRoot(newDiv);
                    root.render(<PopularAnime title={vname} link={vlink} type={type} img={imgUrl} epsno={vep} views={views}/>)
                });
            })
            .catch(error => {
                console.error('Error fetching image:', error);
            });
        }
    }

    function setPopularAnime()
    {
        const url = "/getpopular/?max=6";
        fetch(process.env.NEXT_PUBLIC_API_URL + url)
        .then(res => res.text())
        .then(data => {
            const _info = JSON.parse(data);
            setPopularAnimeTitle(_info);
        });
    }

    function setRelatedAnime(other_season_folders) {
        // Change banner image
        let added = 0;
        for(let i = 0; i < other_season_folders.length; i++)
        {
            const url = "/getid/?name=" + other_season_folders[i];
            fetch(process.env.NEXT_PUBLIC_API_URL + url)
            .then(res => res.text())
            .then(data => {
                if (data == "Anime not found.") return;
                added++;
                const info = JSON.parse(data);
                const imgUrl = info.poster;
                const vname = info.name;
                const vep = info.episodes;
                const type = info.type;
                const vlink = "/watch/" + info.folder_name + "-" + info.id;
                fetch(process.env.NEXT_PUBLIC_API_URL + "/getviews/?id=" + info.id)
                .then(res => res.text())
                .then(res => {
                    const views = parseInt(res);

                    const raDiv = document.getElementsByClassName('related_anime_div')[0];
                    const newDiv = document.createElement('div');
                    raDiv.appendChild(newDiv);
                    // Render the component into the new div
                    const root = createRoot(newDiv);
                    root.render(<RelatedAnime title={vname} link={vlink} type={type} img={imgUrl} views={views} epsno={vep}/>)
                });
            })
            .catch(error => {
                console.error('Error fetching image:', error);
            });
        }
        if (added == 0)
        {
            document.getElementsByClassName('related_anime_div')[0].style.display = 'none';
        }
    }

    useEffect(() =>{
        document.getElementsByClassName('related_anime_del')[0].style.display = 'none';
        getVideoInfo();
    }, []);

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

    function PopularAnime(props) {
        return (
            <>
                <div className='related_anime'>
                    <a href={props.link}><img alt="" id={props.img_id} className='related_anime_img' src={props.img}/></a>
                    <div style={{display: 'block'}}>
                        <h3 className='related_anime_title'><a href={props.link}>{props.title}</a></h3>
                        <h5 className='related_anime_info'>{props.type} <span>&#8226;</span> {props.epsno} episodes</h5>
                        <h5 className='related_anime_info'><i className="fa-solid fa-eye"></i> {props.views}</h5>
                    </div>
                </div>
            </>
        );
    }

    function RelatedAnime(props) {
        return (
            <>
                <div className='related_anime'>
                    <a href={props.link}><img alt="" id={props.img_id} className='related_anime_img' src={props.img}/></a>
                    <div style={{display: 'block'}}>
                        <h3 className='related_anime_title'><a href={props.link}>{props.title}</a></h3>
                        <h5 className='related_anime_info'>{props.type} <span>&#8226;</span> {props.epsno} episodes</h5>
                        <h5 className='related_anime_info'><i className="fa-solid fa-eye"></i> {props.views}</h5>
                    </div>
                </div>
            </>
        );
    }

    return (
            <>
            <Head>
                <title>{`6Anime - ${title} - Episode ${episode}`}</title>
                <meta property="og:title" content={`6Anime - Watch ${title} - Episode ${episode}`} />
                <meta
                property="og:description"
                content="6Anime: Your ultimate anime destination. Enjoy free, competitive streaming with access to any anime you desire."
                />
                <meta
                name="description"
                content="6Anime: Your ultimate anime destination. Enjoy free, competitive streaming with access to any anime you desire."
                />
                <meta
                name="keywords"
                content={`anime, free anime, 6anime, 9anime, anime streaming, anime online, anime hd, anime free, anime website, anime site, anime watch, anime watch online, anime watch free, anime watch hd, anime watch online free, anime watch online hd, anime watch free online, anime watch free hd, anime watch free online hd, anime watch free online english sub, anime watch free online english dub, anime watch free online english subbed, anime watch free online english dubbed, anime watch free online english subbed and dubbed, anime watch free online english subbed hd, anime watch free online english, watch ${title} online subtitle, watch ${title} online dub, watch ${title} online english sub, watch ${title} online english dub, watch ${title} online english subbed, watch ${title} online english dubbed, watch ${title} online english subbed and dubbed, watch ${title} online english subbed hd`}
                />
            </Head>
                <div className='playerdiv'>
                    <div className='playerr'>
                        <div className='title'>
                            <h3 style={{display: 'flex'}} id='title'>{title} - Episode {episode}</h3>
                            <h5><a href='../../'>Home</a> <span>&#62;</span> <a href={type == "Movie" ? "/movies" : "/series"}>{type}</a> <span>&#62;</span> <span id="animename">{title}</span></h5>
                        </div>
                        {/* Player Section starts here */}
                        <div className="main_player">
                            {/* Video Player Starts here */}
                            <div className='player'>
                                {/* Video Player */}
                                <VideoPlayer banner={banner}/>
                            </div>
                            {/* Add our sponsor */}
                            <Sponsored />
                            {/* Rest code */}
                            <div className='separator'/>
                            <div className='pcontainer'>
                                <div id="previous_ep">
                                    <Button id="previous_ep" text="Previous Episode" customStyle={{padding: '.5em', backgroundColor: '#9b2727', color: 'white', minWidth: '45%', height: '3em', float: 'left', lineHeight: '1em'}}/>
                                </div>
                                <div id="next_ep">
                                    <Button id="next_ep" text="Next Episode" customStyle={{padding: '.5em', backgroundColor: '#9b2727', color: 'white', minWidth: '45%', height: '3em', float: 'right', lineHeight: '1em'}}/>
                                </div>
                            </div>
                            <div className='episode_100s pcontainer'>
                            </div>

                            <div id="episodes" className='pcontainer'>
                            </div>
                            <div className='separator'/>
                            <div className='pcontainer'>
                                <div style={{marginBottom: '1em'}}>
                                    <div className='infocontainer'>
                                        <img className='anime_img' alt="" src={img}/>
                                        <div style={{display: 'block'}}>
                                            <h2 id='anime_desc'>Description</h2>
                                            <div className='separator'/>
                                            <p style={{marginTop: '1em'}} id='anime_description'>{description}<loading/><loading/><loading/><loading/><loading/></p>
                                            <div id='tags' className='tags'>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='separator'/>
                                <div style={{marginTop: '1em'}}>
                                    <div className='anime_info'>
                                        <Info name='Publisher' text={studios}/>
                                        <Info name='Episodes' text={episodesno}/>
                                        <Info name='Duration' text={episodesdu}/>
                                        <Info name='Premiered' text={premiered}/>
                                        <Info name='Views' text={viewsFormatted}/>
                                    </div>
                                </div>
                                <div style={{margin:'1em'}}/>
                            </div>
                        </div>
                    </div>
                    <div className='right_side'>
                        <div className='section related_anime_div'>
                            <h3 className='section_title'>Related Anime</h3>
                            <div className='related_anime_del'>
                                {other_season_ids.map((item, index) => (
                                    <a href={"/watch/" + item}>{item}</a>
                                ))}
                            </div>

                        </div>
                        <div className='section popular_anime_div'>
                            <h3 className='section_title'>Popular Anime</h3>
                            
                        </div>
                    </div>
                </div>
            </>
    )
}

let cachedData = {};
let cachedIds = {};
export async function getServerSideProps(context) {
    // Get the segments from the context
    const { segments } = context.query;
    // Extract the last segment
    const lastSegment = segments && segments.length > 1 ? segments[1] : "ep1";
    const prelastSegment = segments && segments.length > 0 ? segments[0] : null;

    const id = prelastSegment.split("-").pop();

    let animeInfo = [];
    if (cachedData[id] !== undefined)
    {
        animeInfo = cachedData[id];
    } else {
        animeInfo = await fetch(process.env.NEXT_PUBLIC_SS_API_URL + "/getvideo/?id=" + id)
        .then(res => res.text())
        .then(res => {
            return res;
        });
        cachedData[id] = animeInfo;
    }

    let other_season_ids = [];
    const other_season_folders = JSON.parse(animeInfo).other_season_folders;
    for (let i = 0; i < other_season_folders.length; i++)
    {
        if (cachedIds[other_season_folders[i]] !== undefined)
        {
            other_season_ids.push(cachedIds[other_season_folders[i]]);
        } else {
            let data = await fetch(process.env.NEXT_PUBLIC_SS_API_URL + "/getid/?name=" + other_season_folders[i])
            .then(res => res.text())
            .then(res => {
                return res;
            });
            if (data == "Anime not found.") continue;
            data = JSON.parse(data).folder_name + "-" + JSON.parse(data).id;
            cachedIds[other_season_folders[i]] = data;
            other_season_ids.push(data);
        }
    }
  
    // Return the segment as props
    return {
      props: {
        titleseg: prelastSegment,
        epsegment: lastSegment,
        animeinfo: animeInfo,
        other_season_ids: other_season_ids
      }
    };
}