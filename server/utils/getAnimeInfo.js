const { META } = require('@consumet/extensions');

async function getAnimeInfo(id) {
    const anilist = new META.Anilist();
    try {
        // Asynchronously fetch anime info using await
        const animeInfo = await anilist.fetchAnimeInfo(id);
        return animeInfo;
    } catch (error) {
        // Handle errors if the fetch operation fails
        console.error(`Error fetching anime information for ID ${id}`);
        return null;
    }
}

module.exports = getAnimeInfo;