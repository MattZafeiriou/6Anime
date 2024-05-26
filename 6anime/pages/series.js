import AnimeList from '../components/AnimeList';
import { useEffect } from 'react';

export default function Series({ data }) {

    useEffect(() => {
        document.getElementById("series").classList.add("active");
        document.getElementById("searchanimebutton").click();
    }, []);
    return (
        <>
            <AnimeList startOptions="Series" />
        </>
    );
}