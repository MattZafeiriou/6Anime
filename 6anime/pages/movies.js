import AnimeList from '../components/AnimeList';
import { useEffect } from 'react';

export default function Movies({ data }) {

    useEffect(() => {
        document.getElementById("movies").classList.add("active");
        document.getElementById("searchanimebutton").click();
    }, []);
    return (
        <>
            <AnimeList startOptions="Movie" />
        </>
    );
}