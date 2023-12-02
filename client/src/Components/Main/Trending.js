import {React, Component} from 'react';
import './Trending.css'

class Trending extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstCard: 1,
            lastCard: 7,
            maxCards: 7
        }
    }

    Card(props) {
        return (
            <div id={props.id} className='trending_card'>
                <div className="trending_card_img">
                    <a href={props.href}>
                        <div className="trending_card_play_button">
                            <i class="fa-solid fa-play"></i>
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
        let lastCard = document.getElementById('card1');
        let cardWidth = lastCard.offsetWidth + 16; // 16px margin
        let listWidth = window.innerWidth * .9; // 90% of window width
        let bruh = listWidth / cardWidth;
        let next = Math.ceil(bruh);
        this.setState({lastCard: next});
    }

    render() {
        return (
            <>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"></link>
            <div className='trending_page'>
                <div className='trending_header'>
                    <h1>Trending Anime</h1>
                    <a href='/trending'>View all <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <div className='trending_list'>
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
                        <i class="fa-solid fa-less-than"></i>
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
                        <i class="fa-solid fa-greater-than"></i>
                    </div>
                </a>
                    <this.Card href="/watch/shit" id="card1" year="2023" time="24 mins/ep" tag1="Action" tag2="Drama" img='https://www.crunchyroll.com/imgsrv/display/thumbnail/480x720/catalog/crunchyroll/323c82257b2f6567fabbb7bd55bfa753.jpe' title='Shingeki no Kyojin: The Final Season' episodes='16'/>
                    <this.Card href="/watch/shit" id="card2" year="2023" time="24 mins/ep" tag1="Action" tag2="Drama" img='https://www.crunchyroll.com/imgsrv/display/thumbnail/480x720/catalog/crunchyroll/323c82257b2f6567fabbb7bd55bfa753.jpe' title='Shingeki no Kyojin: The Final Season' episodes='16'/>
                    <this.Card href="/watch/shit" id="card3" year="2023" time="24 mins/ep" tag1="Action" tag2="Drama" img='https://www.crunchyroll.com/imgsrv/display/thumbnail/480x720/catalog/crunchyroll/323c82257b2f6567fabbb7bd55bfa753.jpe' title='Shingeki no Kyojin: The Final Season' episodes='16'/>
                    <this.Card href="/watch/shit" id="card4" year="2023" time="24 mins/ep" tag1="Action" tag2="Drama" img='https://www.crunchyroll.com/imgsrv/display/thumbnail/480x720/catalog/crunchyroll/323c82257b2f6567fabbb7bd55bfa753.jpe' title='Shingeki no Kyojin: The Final Season' episodes='16'/>
                    <this.Card href="/watch/shit" id="card5" year="2023" time="24 mins/ep" tag1="Action" tag2="Drama" img='https://www.crunchyroll.com/imgsrv/display/thumbnail/480x720/catalog/crunchyroll/323c82257b2f6567fabbb7bd55bfa753.jpe' title='Shingeki no Kyojin: The Final Season' episodes='16'/>
                    <this.Card href="/watch/shit" id="card6" year="2023" time="24 mins/ep" tag1="Action" tag2="Drama" img='https://www.crunchyroll.com/imgsrv/display/thumbnail/480x720/catalog/crunchyroll/323c82257b2f6567fabbb7bd55bfa753.jpe' title='Shingeki no Kyojin: The Final Season' episodes='16'/>
                    <this.Card href="/watch/shit" id="card7" year="2023" time="24 mins/ep" tag1="Action" tag2="Drama" img='https://www.crunchyroll.com/imgsrv/display/thumbnail/480x720/catalog/crunchyroll/323c82257b2f6567fabbb7bd55bfa753.jpe' title='Shingeki no Kyojin: The Final Season' episodes='16'/>
                </div>
            </div>
            </>
        );
    }
}

export default Trending;