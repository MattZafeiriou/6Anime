const { META, ANIME } = require('@consumet/extensions');

async function getAnimeInfo(id) {
    let anilist = new META.Anilist();
    if (isNaN(id))
    {
        anilist = new ANIME.Gogoanime();
        console.log(id);
    }
    try {
        // Asynchronously fetch anime info using await
        anilist.fetchAnimeInfo(id).then(data => {
            console.log(data);
        }).catch(e => {
            console.log(e);
        });
    } catch (error) {
        // Handle errors if the fetch operation fails
        return null;
    }
}

module.exports = getAnimeInfo;