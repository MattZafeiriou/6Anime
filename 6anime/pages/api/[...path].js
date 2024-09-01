const testAPI = require('../../lib/routes/testAPI');
const getvideo = require('../../lib/routes/getvideo');
const addvideo = require('../../lib/routes/addvideo');
const search = require('../../lib/routes/search');
const recommendations = require('../../lib/routes/recommendations');
const getviews = require('../../lib/routes/getViews');
const getpopular = require('../../lib/routes/getPopular');
const getprofilepic = require('../../lib/routes/Auth/getprofilepic');
const getbackground = require('../../lib/routes/Auth/getbackground');
const getfeatured = require('../../lib/routes/getFeatured');
const getanimeurl = require('../../lib/routes/getAnimeURL');
const getid = require('../../lib/routes/get_id');
const addview = require('../../lib/routes/addView');
const addepisode = require('../../lib/routes/addepisode');
const sendform = require('../../lib/routes/sendForm');
const login = require('../../lib/routes/Auth/login');
const verify = require('../../lib/routes/Auth/verify');
const register = require('../../lib/routes/Auth/register');
const passwordreset = require('../../lib/routes/Auth/passwordreset');
const getuserinfo = require('../../lib/routes/getuserinfo');
const setProfilePic = require('../../lib/routes/Auth/setProfilePic');
const setBackground = require('../../lib/routes/Auth/setBackground');
const isAdmin = require('../../lib/routes/Auth/isAdmin');
const cors = require('cors');
const crypto = require('crypto');
const sqlHandler = require('../../lib/sqlHandler');
const rateLimit = require("express-rate-limit");

// Enable CORS
const cors_ = cors({
  origin: ['https://6anime.tv', 'https://www.6anime.tv', 'https://yt2mp3.tv', 'https://www.yt2mp3.tv'],
  methods: ['GET', 'POST', 'OPTIONS'],
});

// Rate limiter for login and register routes
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

const viewlimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 1, // limit each IP to 10 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

function generateHash(input) {
  const hash = crypto.createHash('sha256'); // You can choose a different algorithm if needed
  hash.update(input);
  return hash.digest('hex'); // Get the hexadecimal digest
}

let visitors = [];

function handleVisitors(req, res) {
  const ip = req.headers['x-real-ip'] || req.socket.remoteAddress;
  if (ip === '::ffff:127.0.0.1') return;
  // hash the ip address
  const hash = generateHash(ip);

  // check if the hash is in the database
  if (visitors.includes(hash)) {
    sqlHandler.con.query(`UPDATE Visitors SET last_visit = CURRENT_DATE, requests = (requests + 1) WHERE ip = '${hash}'`, (err, result) => {
      if (err) throw err;
    });
  } else {
    sqlHandler.con.query(`SELECT * FROM Visitors WHERE ip = '${hash}'`, (err, result) => {
      if (err) throw err;
      visitors.push(hash);
      if (result.length === 0) {
        // add the hash to the database
        sqlHandler.con.query(`INSERT INTO Visitors (ip, first_visit, last_visit, requests, videos_watched) VALUES ('${hash}', CURRENT_DATE, CURRENT_DATE, 1, 0)`, (err, result) => {
          if (err) throw err;
        });
      } else {
        // update the last visit and increment the visit count
        sqlHandler.con.query(`UPDATE Visitors SET last_visit = CURRENT_DATE, requests = (requests + 1) WHERE ip = '${hash}'`, (err, result) => {
          if (err) throw err;
        });
      }
    });
  }
}

function addView(req, res) {
  const ip = req.headers['x-real-ip'] || req.socket.remoteAddress;
  //if (ip === '::ffff:127.0.0.1') return;
  // hash the ip address
  const hash = generateHash(ip);

  sqlHandler.con.query(`UPDATE Visitors SET videos_watched = (videos_watched + 1) WHERE ip = '${hash}'`, (err, result) => {
    if (err) throw err;
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors_)

  const { path } = req.query;
  const apiPath = Array.isArray(path) ? path.join('/') : path;

  // Handle case insensitivity by converting the path to lowercase
  const request = apiPath.toLowerCase();
  handleVisitors(req, res);

  if (req.method === 'GET') {
    if (request === 'testapi') {
      testAPI(req, res);
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
      addView(req, res);
      getanimeurl(req, res);
    } else if (request === 'getid') {
      getid(req, res);
    } else if (request === 'addview') {
      await runMiddleware(req, res, viewlimiter)
      addview(req, res);
    } else if (request === 'getprofilepic') {
      getprofilepic(req, res);
    } else if (request === 'getbackground') {
      getbackground(req, res);
    } else if (request === 'addepisode') {
      addepisode(req, res);
    } else if (request === 'getuserinfo') {
      getuserinfo(req, res);
    } else if (request === 'isadmin') {
      isAdmin(req, res);
    } else {
      res.status(404).send('API route not found.');
    }
  } else if (req.method === 'POST') {
    if (request === 'addvideo') {
      addvideo.post(req, res);
    } else if (request === "sendform") {
      sendform(req, res);
    } else if (request === 'setprofilepic') {
      setProfilePic(req, res);
    } else if (request === 'setbackground') {
      setBackground(req, res);
    } else if (request === 'login') {
      await runMiddleware(req, res, limiter)
      login(req, res);
    } else if (request === 'register') {
      await runMiddleware(req, res, limiter)
      register(req, res);
    } else if (request === 'verify') {
      await runMiddleware(req, res, limiter)
      verify(req, res);
    } else if (request === 'passwordreset') {
      await runMiddleware(req, res, limiter)
      passwordreset(req, res);
    } else {
      res.status(404).send('API route not found.');
    }
  }
}