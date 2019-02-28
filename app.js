import express from "express";
const app = express();

import expressLayouts from "express-ejs-layouts";
import ejs from "ejs";

import flash from "connect-flash";
import session from "express-session";

import addPlayers from './routes/players'
import home from './routes/home'
import passport from 'passport'
import login from './routes/login'
import editPlayers from './routes/editPlayers'
import listPlayers from './routes/listPlayer'
import deletePlayers from './routes/deletePlayers'
import listClubs from './routes/listClubs'
import addClub from './routes/addClub'
import registerCompetition from './routes/registerCompetition'
import listCompetitions from './routes/listCompetitions'
import competitors from './routes/competitors'
import addCompetition from './routes/addCompetition'
import clubs from './routes/clubs'
import competitions from './routes/competitions'
import teams from './routes/teams'
import promotorCompetitions from './routes/promotorCompetitions'
import promotorCompetitors from './routes/promotorCompetitors'
import logout from './routes/logout'


// require('./key/passport')(passport);
// require('./routes/login')(app, passport);
app.use("*/css",express.static("public/css"));
app.use('*/js',express.static("public/js"));
app.use("*/images",express.static("public/images"))

app.use(passport.initialize());

app.use(passport.session());
// file script and css
app.use(express.static('public'))

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// express-session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

//middleware


// connect flash
// app.use(flash());


// global variables for flash
// app.use((req, res, next) => {
//   res.locals.success_msg = req.flash("success_msg";
//   res.locals.error_msg = req.flash("error_msg");
//   res.locals.error = req.flash("error");
//   next();
// });

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use('/register', addPlayers )
app.get('/', home)

app.use('/login', login )
app.use('/playersAdmin', listPlayers)
app.use('/playersAdmin/edit', editPlayers)
app.use('/playersAdmin/delete', deletePlayers)
app.use('/playersAdmin/listClubs', listClubs)
app.use('/playersAdmin/addClub', addClub)
app.use('/playersAdmin/registerCompetition', registerCompetition)
app.use('/playersAdmin/listCompetitions', listCompetitions)
app.use('/playersAdmin/competitors', competitors)
app.use('/playersAdmin/addCompetition', addCompetition)

app.use('/players/clubs', clubs)
app.use('/players/competitions', competitions)
app.use('/players/competitions/teams', teams)

app.use('/promotor/competitions', promotorCompetitions)
app.use('/promotor/competitions/competitors', promotorCompetitors)

app.use('/logout', logout)


const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`you are connected at port http://localhost:${PORT}`)
);


// console.log(ensureAuthenticated)