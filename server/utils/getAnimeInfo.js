const { META, ANIME} = require('@consumet/extensions');

async function getAnimeInfo(id) {
    let anilist = new META.Anilist();
    if (!(typeof id === 'number'))
        anilist = new ANIME.Gogoanime();
    try {
        // Asynchronously fetch anime info using await
        const animeInfo = await anilist.fetchAnimeInfo(id);
        return animeInfo;
    } catch (error) {
        // Handle errors if the fetch operation fails
        return null;
    }
}

module.exports = getAnimeInfo;