import {React, Component} from 'react';
import './Trending.css'
import {createRoot} from 'react-dom/client';

class Trending extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstCard: 1,
            lastCard: 7,
            maxCards: 7,
            startX: 0,
        }
        this.oof = this.oof.bind(this);
        this.setPopularAnime = this.setPopularAnime.bind(this);
        this.setPopularAnimeTitle = this.setPopularAnimeTitle.bind(this);
    }

    Card(props) {
        return (
            <div id={props.id} className='trending_card'>
                <div className="trending_card_img">
                    <a href={props.href}>
                        <div className="trending_card_play_button">
                            <i className="fa-solid fa-play"></i>
                        </div>
                        <a href='javascript:void(0)' className="trending_card_addtolist">
                            <h3>Add to my list</h3>
                        </a>
                        <img src={props.img} alt='anime poster'/>
                    </a>
                </div>
                <div className='trending_card_info'>
                    <h3><a href={props.href}>{props.title}</a></h3>
                    <p>{props.year} <span>&#183;</span> {props.time} <span>&#183;</span> {props.episodes} episodes</p>
                    <p>{props.tag1} <span>&#183;</span> {props.tag2}</p>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.setPopularAnime();
    }

    oof(event) {
        alert('oof');
        this.setState({startX: event.clientX});
        alert(event.clientX)
    }

    setPopularAnimeTitle(props, cardNo)
    {
        if (Object.keys(props).length === 0)
        {
            let lastCard = document.getElementById('card1');
            let cardWidth = lastCard.offsetWidth + 16; // 16px margin
            let listWidth = window.innerWidth * .9; // 90% of window width
            let bruh = listWidth / cardWidth;
            let next = Math.ceil(bruh);
            this.setState({lastCard: next});
            return;
        }

        const url = "get_video/?name=" + props[0];
        fetch("http://localhost:9000/" + url)
        .then(res => res.text())
        .then(data => {
            const info = JSON.parse(data);
            const imgUrl = info.poster;
            const vname = info.name;
            const vep = info.episodes;
            const premiered = info.premiered;
            const duration = info.duration;
            const genre = info.genre;
            const tag1 = genre[0];
            const tag2 = genre[1];
            const year = premiered.split(' ')[premiered.split(' ').length - 1];
            const vlink = "/watch/" + info.folder_name;
            fetch("http://localhost:9000/get_views/?name=" + props[0])
            .then(res => res.text())
            .then(res => {
                const views = parseInt(res);
                const raDiv = document.getElementsByClassName('trending_list')[0];
                const newDiv = document.createElement('div');
                raDiv.appendChild(newDiv);
                // Render the component into the new div
                const root = createRoot(newDiv);
                root.render(<this.Card href={vlink} id={"card" + cardNo} year={year} time={duration + " mins/ep"} tag1={tag1} tag2={tag2} img={imgUrl} title={vname} episodes={vep}/>)

                // Remove first element from array
                props.shift();
                // Call function again
                this.setPopularAnimeTitle(props, cardNo + 1);
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
            this.setState({maxCards: _info.length});
            this.setPopularAnimeTitle(_info, 1);
        });
    }
    render() {
        return (
            <>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"></link>
            <div className='trending_page'>
                <div className='trending_header'>
                    <h1>Trending Anime</h1>
                    <a href='/trending'>View all <i className="fa-solid fa-arrow-right"></i></a>
                </div>
                <div className='trending_list' onDragStart={this.oof}>
                    <a onClick={() => {
                        if (this.state.firstCard == 1) return;
                        document.getElementById('card' + (this.state.firstCard - 1 )).scrollIntoView({behavior: "smooth", block: "center"});
                        document.getElementsByClassName('trending_next')[0].style.visibility = 'visible';
                        this.setState({firstCard: this.state.firstCard - 1}, () => {
                            if (this.state.firstCard == 1)
                                document.getElementsByClassName('trending_back')[0].style.visibility = 'hidden';
                        });
                        this.setState({lastCard: this.state.lastCard - 1});
                    }}
                    href='javascript:void(0)'>
                        <div className='trending_back'>
                            <i className="fa-solid fa-less-than"></i>
                        </div>
                    </a>
                    <a onClick={() => {
                        let card = document.getElementById('card' + this.state.lastCard);
                        if (card == null) return;
                        card.scrollIntoView({behavior: "smooth", block: "center"});
                        document.getElementsByClassName('trending_back')[0].style.visibility = 'visible';
                        this.setState({firstCard: this.state.firstCard + 1});
                        this.setState({lastCard: this.state.lastCard + 1}, () => {
                            if (this.state.lastCard > this.state.maxCards)
                                document.getElementsByClassName('trending_next')[0].style.visibility = 'hidden';
                        });
                    }} 
                    href='javascript:void(0)'>
                        <div className='trending_next'>
                            <i className="fa-solid fa-greater-than"></i>
                        </div>
                    </a>
                </div>
            </div>
            </>
        );
    }
}

export default Trending;