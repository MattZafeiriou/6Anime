var sqlHandler = require('./../sqlHandler');
const addEpisode = require('./../utils/addEpisode');

/* Add anime. */
function get(req, res, next) {
    const anime_id = +req.query.anime_id;
    const video_url = decodeURI(req.query.video_url);
    const tracks = req.query.tracks;
    const episode_number = +req.query.episode;
    const intro = req.query.intro;
    const outro = req.query.outro;

    if (!anime_id) {
        res.status(400).send("Missing param: anime_id");
        return;
    }
    if (isNaN(anime_id)) {
        res.status(400).send("Invalid anime_id.");
        return;
    }
    if (!video_url) {
        res.status(400).send("Missing param: video_url");
        return;
    }
    if (!tracks) {
        res.status(400).send("Missing param: tracks");
        return;
    }
    if (!episode_number) {
        res.status(400).send("Missing param: episode");
        return;
    }
    if (isNaN(episode_number)) {
        res.status(400).send("Invalid episode number.");
        return;
    }
    if (!intro) {
        res.status(400).send("Missing param: intro");
        return;
    }
    if (!outro) {
        res.status(400).send("Missing param: outro");
        return;
    }
    addEpisode(anime_id, video_url, tracks, episode_number, intro, outro, res);

};

module.exports = get;