import React from 'react';
import AnimeList from '../AnimeList/AnimeList';

class RecentlyAdded extends React.Component {

    componentDidMount()
    {
        document.getElementById("recently_added").classList.add("active");
        document.getElementById("searchanimebutton").click();
    }

    render() {
        return (
        <>
            <AnimeList startOptions="Recently-Added"/>
        </>
        );
    };
}
export default RecentlyAdded;