import React from 'react';
import './AnimeList.css'

class AnimeList extends React.Component {

    constructor(proms)
    {
        super(proms);
    }

    filter(props)
    {
        return(
        <>
            <div className='anime-list-filter'>
                <button onClick={() => {
                    document.querySelector("#" + props.id).classList.toggle('anime-list-filter-item-active');
                }}>
                    {props.name}
                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                </button>
                <div className='anime-list-filter-item' id={props.id}>
                    <div className='anime-list-filter-item-option'>
                        <input type='checkbox' id='anime-list-filter-item-1' name='anime-list-filter-item-1' value='anime-list-filter-item-1'/>
                        <label for='anime-list-filter-item-1'>Filter 1</label>
                    </div>
                    <div className='anime-list-filter-item-option'>
                        <input type='checkbox' id='anime-list-filter-item-1' name='anime-list-filter-item-1' value='anime-list-filter-item-1'/>
                        <label for='anime-list-filter-item-1'>Filter 1</label>
                    </div>
                    <div className='anime-list-filter-item-option'>
                        <input type='checkbox' id='anime-list-filter-item-1' name='anime-list-filter-item-1' value='anime-list-filter-item-1'/>
                        <label for='anime-list-filter-item-1'>Filter 1</label>
                    </div>
                </div>
            </div>
        </>
        );
    }

    render() {
        return (
        <>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <div className='anime-list'>
                <div className='anime-list-header'>
                    <this.filter name="Type" id="typefilter"/>
                    <this.filter name="Genre" id="genrefilter"/>
                </div>
                <div className='anime-list-container'>
                    <div className='anime-list-item'>
                        <img src='https://cdn.myanimelist.net/images/anime/9/9453.jpg' alt='anime'/>
                        <h3>Movie 1</h3>
                    </div>
                    <div className='anime-list-item'>
                        <img src='https://cdn.myanimelist.net/images/anime/9/9453.jpg' alt='anime'/>
                        <h3>Movie 2</h3>
                    </div>
                    <div className='anime-list-item'>
                        <img src='https://cdn.myanimelist.net/images/anime/9/9453.jpg' alt='anime'/>
                        <h3>Movie 3</h3>
                    </div>
                    <div className='anime-list-item'>
                        <img src='https://cdn.myanimelist.net/images/anime/9/9453.jpg' alt='anime'/>
                        <h3>Movie 4</h3>
                    </div>
                    <div className='anime-list-item'>
                        <img src='https://cdn.myanimelist.net/images/anime/9/9453.jpg' alt='anime'/>
                        <h3>Movie 5</h3>
                    </div>
                    <div className='anime-list-item'>
                        <img src='https://cdn.myanimelist.net/images/anime/9/9453.jpg' alt='anime'/>
                        <h3>Movie 6</h3>
                    </div>
                    <div className='anime-list-item'>
                        <img src='https://cdn.myanimelist.net/images/anime/9/9453.jpg' alt='anime'/>
                        <h3>Movie 7</h3>
                    </div>
                    <div className='anime-list-item'>
                        <img src='https://cdn.myanimelist.net/images/anime/9/9453.jpg' alt='anime'/>
                        <h3>Movie 8</h3>
                    </div>
                </div>
            </div>
        </>
    );
    };
}
export default AnimeList;