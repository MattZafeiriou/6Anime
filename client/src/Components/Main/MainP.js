import {React, Component} from 'react';
import './MainP.css'
import Trending from './Trending.js';
import { Carousel, Image } from 'react-bootstrap';

class MainP extends Component {

    constructor(props) {
        super(props);

        document.body.classList.add('main');
        this.CarouselImg = this.CarouselImg.bind(this);
    }

    componentDidMount() {
        document.getElementById("home").classList.add("active");
    }

    Tag(props) {
        return (
            <div className='anime_tag'>
                <p>{props.name}</p>
            </div>
        );
    }

    CarouselImg(props) {
        return (
            <>
                <Image id="top_img" src={props.srcImg} fluid/>
                <Carousel.Caption>
                    <div className='carouselCaption'>
                        <div className='anime_tags'>
                            <this.Tag name={props.tag1}/>
                            <this.Tag name={props.tag2}/>
                            <this.Tag name={props.tag3}/>
                        </div>
                        <h1>{props.name}</h1>
                        <h3>{props.description}</h3>
                        <this.WatchButton href={props.href}/>
                    </div>
                </Carousel.Caption>
            </>
        );
    }

    WatchButton(props) {
        return (
            <a href={props.href}><button className='watch_button'>Watch Now!</button></a>
        );
    }

    render() {
        return (
            <>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <div className='main_page'>
                <div className='main_page_content'>
                    <Carousel className='carouselItems'>
                        <Carousel.Item>
                            <this.CarouselImg href="/oof" tag1="Action" tag2="Adventure" tag3="Drama" srcImg="https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p186423_b_h10_ad.jpg" name="One Piece" description="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <this.CarouselImg href="/oof1" tag1="Action" tag2="Adventure" tag3="Drama" srcImg="https://img.kyodonews.net/english/public/images/posts/3d70ea3a401fc8a38977c6275476b8f3/photo_l.jpg" name="Weathering With You" description="Test"/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <this.CarouselImg href="/oof2" tag1="Action" tag2="Adventure" tag3="Drama" srcImg="https://www.anmosugoi.com/wp-content/uploads/2022/06/Shingeki-no-Kyojin-The-Final-Season-vol-3-Blu-Ray-DVD-min.jpg" name="Attack On Titan" description="Test"/>
                        </Carousel.Item>
                    </Carousel>
                </div>
                <Trending/>
            </div>
            </>
        );
    }
}

export default MainP