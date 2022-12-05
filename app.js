const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')

// Load modules
const home = require('./assets/routes/home');
const auth = require('./assets/routes/auth');
//const orgs = require('./assets/routes/orgs');
//const artifacts = require('./assets/routes/artifacts');
const api = require('./assets/routes/api');

// Load environment variables
dotenv.config({
  path: './config.env',
});

// Create the Express app
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "assets/views"));
app.use(express.static('assets'));
app.use("jquery", express.static('./node_modules/jquery/dist'));
app.use("bootstrap", express.static('./node_modules/bootstrap/dist'));

app.use(cookieParser());
app.use(bodyParser.json())

// Rate limit
var limiter = rateLimit({
  windowMs: 60*60*1000, // 1 hour
  max: 1000 // https://docs.github.com/en/rest/overview/resources-in-the-rest-api?apiVersion=2022-11-28#rate-limiting
});
app.use('/', limiter)

// Routes
app.use('/', home);
app.use('/', auth);
//app.use('/', orgs);
//app.use('/', artifacts);
app.use('/api', api);

// Start the server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
