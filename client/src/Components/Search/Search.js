import React from 'react';
import AnimeList from '../AnimeList/AnimeList';

class Search extends React.Component {

    componentDidMount()
    {
        document.getElementById("searchanimebutton").click();
    }

    render() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const search = decodeURI(urlParams.get('search'));
        return (
        <>
            <AnimeList startInput={search}/>
        </>
        );
    };
}
export default Search;