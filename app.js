const express = require('express');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');

// Load modules
const home = require('./assets/routes/home');
const auth = require('./assets/routes/auth');
const orgs = require('./assets/routes/orgs');

// Load environment variables
dotenv.config({
  path: './config.env',
});

// Create the Express app
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "assets/views"));
app.use(express.static('assets'))
app.use(session({secret:process.env.APP_SESSION_SECRET}));

// Routes
app.use('/', home);
app.use('/', auth);
app.use('/', orgs);

// Start the server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
