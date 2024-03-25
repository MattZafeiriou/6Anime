import React from 'react';
import './AddVideo.css'
import { API_URL } from '../../Constants';

class AddVideo extends React.Component {

    constructor(proms)
    {
        super(proms);
        this.state = {
            episodes: 0,
            anime_id: 0
        };
        window.onbeforeunload = function() {
            return true;
        };
    }

    addEpisodes = (e) => {
        fetch(API_URL + "/get_id?name=" + document.getElementById('_episodes').value)
        .then(res => res.json())
        .then(data => {
            if (data.length == 0)
            {
                alert("No such anime");
                return;
            }

            this.setState({episodes: +JSON.stringify(data.episodes)});
            this.setState({anime_id: +JSON.stringify(data.id)});
            for (let i = 1; i <= +JSON.stringify(data.episodes); i++) {
                document.getElementsByClassName('episodes_add')[0].innerHTML += `                    <div className='new_episode'>
                <input type="text" id="url_episode_` + i + `" placeholder="Episode ` + i + ` URL" />
                <input type="text" id="tracks_episode_` + i + `" placeholder="Episode ` + i + ` Tracks" />
            </div>`;
            }
        })
        e.preventDefault();
        // const episodes = +document.getElementById('_episodes').value;
        // for (let i = 1; i <= episodes; i++) {
        //     document.getElementsByClassName('episodes_add')[0].innerHTML += `                    <div className='new_episode'>
        //     <input type="text" id="url_episode_` + i + `" placeholder="Episode ` + i + ` URL" />
        //     <input type="text" id="tracks_episode_` + i + `" placeholder="Episode ` + i + ` Tracks" />
        // </div>`;
        // }
        // e.preventDefault();
    }

    makeEpisodes = (e) => {
        const episodes = this.state.episodes;
        const anime_id = this.state.anime_id;
        const video_url = document.getElementById('url_episode_1').value;
        let tracks = JSON.stringify(document.getElementById('tracks_episode_1').value.split(',').map(function(item) {
            return item.trim();
          }));
        if (tracks == "[\"\"]")
            tracks = "[]";
        for (let i = 1; i <= episodes; i++) {
            const url = "/addepisode?anime_id=" + anime_id + "&video_url=" + video_url + "&tracks=" + tracks + "&episode=" + i;
            fetch(API_URL + url)
            .then(res => res.arrayBuffer())
            .then(data => {
                console.log("Added episode " + i + " for anime " + anime_id)
            })
        }
        e.preventDefault();
    }

    submitForm = (e) => {
        let name = document.getElementById('name').value;
        let folder = document.getElementById('folder').value;
        let nicknames = JSON.stringify(document.getElementById('nicknames').value.split(',').map(function(item) {
            return item.trim();
          }));
        if (nicknames == "[\"\"]")
            nicknames = "[]";
        let season = document.getElementById('season').value;
        let description = document.getElementById('description').value;
        let studios = JSON.stringify(document.getElementById('studios').value.split(',').map(function(item) {
            return item.trim();
          }));
        if (studios == "[\"\"]")
            studios = "[]";
        let genre = JSON.stringify(document.getElementById('genre').value.split(',').map(function(item) {
            return item.trim();
          }));
        if (genre == "[\"\"]")
            genre = "[]";
        let episodes = document.getElementById('episodes').value;
        let duration = document.getElementById('duration').value;
        let premiered = document.getElementById('premiered').value;
        let other_seasons_folders = JSON.stringify(document.getElementById('other_seasons_folders').value.split(',').map(function(item) {
            return item.trim();
          }));
        if (other_seasons_folders == "[\"\"]")
            other_seasons_folders = "[]";
        let other_seasons_names = JSON.stringify(document.getElementById('other_seasons_names').value.split(',').map(function(item) {
            return item.trim();
          }));
        if (other_seasons_names == "[\"\"]")
            other_seasons_names = "[]";
        let eh = document.getElementById("anime_type");
        let anime_type = eh.options[eh.selectedIndex].value;
        let poster = document.getElementById('poster').value;

        const url = "/addvideo?name=" + name + "&folder=" + folder + "&nicknames=" + nicknames + "&season=" + season + "&description=" + description + "&studios=" + studios + "&genre=" + genre + "&episodes=" + episodes + "&duration=" + duration + "&premiered=" + premiered + "&other_seasons_folders=" + other_seasons_folders + "&other_seasons_names=" + other_seasons_names + "&anime_type=" + anime_type + "&poster=" + poster;
        fetch(API_URL + url)
        .then(res => res.arrayBuffer())
        .then(data => {
            alert('Form submitted: ' + JSON.stringify(data))

        })
        e.preventDefault();
    }

    render() {
        return (
        <>
            <div className='add-video-container'>
                <div className='add-video'>
                    <h3>Add Anime</h3>
                    <form>
                        <input type='text' id="name" placeholder='Anime Name' />
                        <input type='text' id="folder" placeholder='Folder Name' />
                        <input type='text' id="nicknames" placeholder='Nicknames (separate with commas)' />
                        <input type='text' id="season" placeholder='Season' />
                        <textarea placeholder="Description" id="description" name="Text1" cols="40" rows="5"/>
                        <input type='text' id="studios" placeholder='Studios (separate with commas)' />
                        <input type='text' id="genre" placeholder='Genre (separate with commas)' />
                        <input type='text' id="episodes" placeholder='Episodes' />
                        <input type='text' id="duration" placeholder='Duration' />
                        <h5>Premiered:</h5>
                        <input type='date' id="premiered" />
                        <input type='text' id="other_seasons_folders" placeholder='Other Seasons Folders (separate with commas)' />
                        <input type='text' id="other_seasons_names" placeholder='Other Seasons Names (separate with commas)' />
                        <select id="anime_type">
                            <option>Series</option>
                            <option>Movie</option>
                        </select>
                        <input type='text' id="poster" placeholder='Poster' />
                        <input type="button" value="Submit" onClick={this.submitForm} />
                    </form>
                </div>
                <div className='add-video'>
                    <h3>Add Episodes</h3>
                    <form>
                        <input type='text' id="_episodes" placeholder='Enter Anime Folder Name' />
                        <input type="button" value="Add" onClick={this.addEpisodes} />
                    </form>
                    <form className='episodes_add'>
                    </form>
                    <input type="button" value="Submit" onClick={this.makeEpisodes} />

                </div>
            </div>
        </>
    );
    };
}
export default AddVideo;