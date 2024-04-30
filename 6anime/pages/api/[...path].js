const getvideo = require('../../lib/routes/getvideo');
const addvideo = require('../../lib/routes/addvideo');
const search = require('../../lib/routes/search');
const recommendations = require('../../lib/routes/recommendations');
const getviews = require('../../lib/routes/getViews');
const getpopular = require('../../lib/routes/getPopular');
const getfeatured = require('../../lib/routes/getFeatured');
const getanimeurl = require('../../lib/routes/getAnimeURL');
const getid = require('../../lib/routes/get_id');
const addview = require('../../lib/routes/addView');
const addepisode = require('../../lib/routes/addepisode');
const sendform = require('../../lib/routes/sendForm');

export default function handler(req, res) {
    const { path } = req.query;
    const apiPath = Array.isArray(path) ? path.join('/') : path;
  
    // Handle case insensitivity by converting the path to lowercase
    const request = apiPath.toLowerCase();
  
    if (req.method === 'GET')
    {
      if (request === 'testapi') {
        res.status(200).send('Hello World!');
      } else if (request === 'getvideo') {
        getvideo(req, res);
      } else if (request === 'search') {
        search(req, res);
      } else if (request === 'getrecommendations') {
        recommendations(req, res);
      } else if (request === 'getviews') {
        getviews(req, res);
      } else if (request === 'getpopular') {
        getpopular(req, res);
      } else if (request === 'getfeatured') {
        getfeatured(req, res);
      } else if (request === 'getanimeurl') {
        getanimeurl(req, res);
      } else if (request === 'getid') {
        getid(req, res);
      } else if (request === 'addview') {
        addview(req, res);
      } else if (request === 'addepisode') {
        addepisode(req, res);
      } else {
        res.status(404).json({ message: 'API route not found.' });
      }
    } else if (req.method === 'POST') {
      if (request === 'addvideo') {
        addvideo(req, res);
      } else if (request === "sendform") {
        sendform(req, res);
      } else {
        res.status(404).json({ message: 'API route not found.' });
      }
    }
}