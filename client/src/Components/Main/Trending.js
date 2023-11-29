import {React, Component} from 'react';
import './Trending.css'

class Trending extends Component {

    constructor(props) {
        super(props);
    }

    Card(props) {
        return (
            <div className='trending_card'>
                <div className="trending_card_img">
                    <a href={props.href}>
                        <div className="trending_card_play_button">
                            <i class="fa-solid fa-play"></i>
                        </div>
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
                    <this.Card href="/watch/shit" year="2023" time="24 mins/ep" tag1="Action" tag2="Drama" img='https://www.crunchyroll.com/imgsrv/display/thumbnail/480x720/catalog/crunchyroll/323c82257b2f6567fabbb7bd55bfa753.jpe' title='Shingeki no Kyojin: The Final Season' episodes='16'/>
                </div>
            </div>
            </>
        );
    }
}

export default Trending;