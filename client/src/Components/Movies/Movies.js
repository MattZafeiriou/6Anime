import React from 'react';
import AnimeList from '../AnimeList/AnimeList';

class Movies extends React.Component {

    componentDidMount()
    {
        document.getElementById("movies").classList.add("active");
        document.getElementById("searchanimebutton").click();
    }

    render() {
        return (
        <>
            <AnimeList startOptions="Movie"/>
        </>
        );
    };
}
export default Movies;