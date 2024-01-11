import React from 'react';
import AnimeList from '../AnimeList/AnimeList';

class Trending extends React.Component {

    componentDidMount()
    {
        document.getElementById("searchanimebutton").click();
    }

    render() {
        return (
        <>
            <AnimeList startOptions="Most-Watched"/>
        </>
        );
    };
}
export default Trending;