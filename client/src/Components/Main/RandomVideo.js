import {React, Component} from 'react';
import './RandomVideo.css'

class RandomVideo extends Component {

    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
        
        this.state = {
            shown: false
        }
    }

    handleScroll() {
        let windowBottom = document.documentElement.scrollTop + window.innerHeight;
        let sectionTop = document.getElementsByClassName("random_video_span")[0].offsetTop;
        if (windowBottom > sectionTop) {
            document.getElementsByClassName("random_video")[0].classList.add("video_headtitle_shown");
        }
        sectionTop = document.getElementsByClassName("random_video_trailer")[0].offsetTop;
        if (windowBottom > sectionTop) {
            document.getElementsByClassName("random_video_trailer")[0].classList.add("random_video_trailer_shown");
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    render() {
        return (
            <>
            <div className='random_video'>
                <h1>Don't know what to watch?</h1>
                <h3>Let us help you!</h3>
                <span className='random_video_span'/>
                <div className='random_video_trailer'>
                    <iframe src="https://www.youtube.com/embed/Q6iK6DjV_iE?autoplay=1&mute=1" style={{
                        width: '60%',
                        aspectRatio: '16 / 9'
                    }} title="Weathering With You [Official Subtitled Trailer, GKIDS]" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
            </div>
            </>
        );
    }
}

export default RandomVideo;