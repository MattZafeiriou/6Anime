import React from 'react';
import AnimeList from '../AnimeList/AnimeList';

class Series extends React.Component {

    componentDidMount()
    {
        document.getElementById("series").classList.add("active");
        document.getElementById("searchanimebutton").click();
    }

    render() {
        return (
        <>
            <AnimeList startOptions="Series"/>
        </>
        );
    };
}
export default Series;