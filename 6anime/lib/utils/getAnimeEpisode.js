const { META } = require('@consumet/extensions');

async function getAnimeEpisode(id) {
  const anilist = new META.Anilist();
  try {
    // Asynchronously fetch anime info using await
    const episodeInfo = await anilist.fetchEpisodeSources(id);
    const sources = episodeInfo.sources;
    for (const source of sources) {
      if (source.quality === "default") {
        return source.url;
      }
    }
    return sources[0].url;
  } catch (error) {
    // Handle errors if the fetch operation fails
    console.error(`Error fetching anime information for ID ${id}:`, error);
    throw error; // Rethrow the error to propagate it
  }
}

module.exports = getAnimeEpisode;