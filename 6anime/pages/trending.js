import AnimeList from '../components/AnimeList';
import { useEffect } from 'react';

export default function Trending({ data }) {

    useEffect(() => {
        document.getElementById("searchanimebutton").click();
    }, []);
    return (
        <>
            <AnimeList startOptions="Most-Watched" />
        </>
    );
}