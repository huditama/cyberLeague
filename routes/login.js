import passport from 'passport'
import express from 'express'
// const app = expres()
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router();
import models from '../models'
const {
  Players,
  Clubs,
  Competitions,
  ClubsCompetitions
} = models

// const {ensureAuthenticated} = require('./key/outh')
const  {ensureAuthenticated}  = require('../key/auth')


import bcrypt from 'bcryptjs'


passport.use(
  new LocalStrategy({ 
    usernameField: 'email'
  }, (email, password, done) => {
    // Match user
    Players.findOne({
      where: {
        email: email
      }
    }).then(user => {
      // console.log('got it');
      // console.log(user);
      if (!user) {
        console.log('tidak ada');
        return done(null, false, {
          message: 'That email is not registered'
        });
      }
      //  else if(!user.validPassword(pasword)){
      //   return done(null, false)
      // }

      // Match password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw new Erro('something erro')
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });
  })
);


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // // console.log(`id: ${id}`);
  Players.findById(id)
    .then(user => {

      done(null, user);
    })
    .catch(error => {
      console.log(`Error: ${error}`);
    });
  // Players.findById(id, (err, user) => {
  //   done(err, user)
  // })
});


router.get('/', (req, res) => {
  // console.log(res)
  let url = null
  res.render('login', { url })
})



router.post('/', (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.redirect('/register')
    } else {
      if (user.role == 'Admin') {
        return res.redirect('/playersAdmin')
      } else if (user.role == 'Athlete') {
        return res.redirect('/players/clubs')
      } else if (user.role == 'Promotor') {
        return res.redirect('/promotor/competitions')
      }
    }
    // console.log(req.body, ';iniiiiiiiii');
    // if(req.body.password != user.password){
    //   return res.redirect('/login')

    // } else {
    //   return res.send(user.password)
    // }


    // }
  })(req, res, next);

})

export default router
