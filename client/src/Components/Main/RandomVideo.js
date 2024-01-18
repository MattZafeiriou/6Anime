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
            document.getElementsByClassName("random_video_trailer_info")[0].classList.add("random_video_trailer_info_shown");
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
                    <div className='random_video_trailer_vid'>
                        <iframe id="random_video_trailer" src="https://www.youtube.com/embed/Q6iK6DjV_iE" title="Weathering With You [Official Subtitled Trailer, GKIDS]" frameBorder="0" allowFullScreen></iframe>
                    </div>
                    <div className='random_video_trailer_info'>
                        <h1 className='random_video_trailer_title'>Weathering With You</h1>
                        <p className='random_video_trailer_desc'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <div className='random_video_trailer_tags'>
                            <a href="/search?genre=Action">
                                <p>Action</p>
                            </a>
                            <a href="/search?genre=Adventure">
                                <p>Adventure</p>
                            </a>
                            <a href="/search?genre=Drama">
                                <p>Drama</p>
                            </a>
                        </div>
                        <a href="/watch/Tenki_No_Ko-1"><button className='random_video_trailer_button'>Watch Now!</button></a>
                        <button className='add_to_list_button'>Add to my list</button>
                    </div>
                </div>
            </div>
            </>
        );
    }
}

export default RandomVideo;