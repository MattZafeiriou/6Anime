import {React, Component} from 'react';
import './MainP.css'
import Trending from './Trending.js';
import RandomVideo from './RandomVideo.js';
import { Carousel, Image } from 'react-bootstrap';

class MainP extends Component {

    constructor(props) {
        super(props);

        this.state = {
            carouselItem1:
            {
                    href: "",
                    tag1: "",
                    tag2: "",
                    tag3: "",
                    srcImg: "",
                    name: "",
                    description: ""
            },
            carouselItem2: 
            {
                    href: "",
                    tag1: "",
                    tag2: "",
                    tag3: "",
                    srcImg: "",
                    name: "",
                    description: ""
            },
            carouselItem3: 
            {
                    href: "",
                    tag1: "",
                    tag2: "",
                    tag3: "",
                    srcImg: "",
                    name: "",
                    description: ""
            }
        };

        document.body.classList.add('main');
        this.CarouselImg = this.CarouselImg.bind(this);
        this.loadInfo = this.loadInfo.bind(this);
        this.loadCarousel();
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

    loadInfo(recinfo)
    {
        this.setState({
            carouselItem1:
            {
                href: "/watch/" + recinfo[1].folder_name,
                tag1: recinfo[1].tags[0],
                tag2: recinfo[1].tags[1],
                tag3: recinfo[1].tags[2],
                name: recinfo[1].name,
                description: recinfo[1].description,
                srcImg: recinfo[1].img
            }
        });
        this.setState({
            carouselItem2:
            {
                href: "/watch/" + recinfo[2].folder_name,
                tag1: recinfo[2].tags[0],
                tag2: recinfo[2].tags[1],
                tag3: recinfo[2].tags[2],
                name: recinfo[2].name,
                description: recinfo[2].description,
                srcImg: recinfo[2].img
            }
        });
        this.setState({
            carouselItem3:
            {
                href: "/watch/" + recinfo[3].folder_name,
                tag1: recinfo[3].tags[0],
                tag2: recinfo[3].tags[1],
                tag3: recinfo[3].tags[2],
                name: recinfo[3].name,
                description: recinfo[3].description,
                srcImg: recinfo[3].img
            }
        });
    }

    loadCarousel() {
        let url = "recommendations";
        let data;
        fetch("http://localhost:9000/" + url)
        .then(res => res.text())
        .then(res => {
            data = res;
            let info = JSON.parse(data);
            this.loadInfo(info);
        });
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
                            <this.CarouselImg href={this.state.carouselItem1.href} tag1={this.state.carouselItem1.tag1} tag2={this.state.carouselItem1.tag2} tag3={this.state.carouselItem1.tag3} srcImg={this.state.carouselItem1.srcImg} name={this.state.carouselItem1.name} description={this.state.carouselItem1.description}/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <this.CarouselImg href={this.state.carouselItem2.href} tag1={this.state.carouselItem2.tag1} tag2={this.state.carouselItem2.tag2} tag3={this.state.carouselItem2.tag3} srcImg={this.state.carouselItem2.srcImg} name={this.state.carouselItem2.name} description={this.state.carouselItem2.description}/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <this.CarouselImg href={this.state.carouselItem3.href} tag1={this.state.carouselItem3.tag1} tag2={this.state.carouselItem3.tag2} tag3={this.state.carouselItem3.tag3} srcImg={this.state.carouselItem3.srcImg} name={this.state.carouselItem3.name} description={this.state.carouselItem3.description}/>
                        </Carousel.Item>
                    </Carousel>
                </div>
                <Trending/>
                <RandomVideo/>
            </div>
            </>
        );
    }
}

export default MainP