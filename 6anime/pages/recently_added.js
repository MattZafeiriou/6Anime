import AnimeList from '../components/AnimeList';
import { useEffect } from 'react';

export default function RecentlyAdded({ data }) {

    useEffect(() => {
        document.getElementById("searchanimebutton").click();
    }, []);
    return (
        <>
            <AnimeList startOptions="Recently-Added" />
        </>
    );
}