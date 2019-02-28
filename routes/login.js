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
      console.log('got it');
      console.log(user);
      if (!user) {
        console.log('tidak ada');
        return done(null, false, {
          message: 'That email is not registered'
        });
      }


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
  // console.log(`id: ${id}`);
  Players.findById(id)
    .then(user => {

      done(null, user);
    })
    .catch(error => {
      console.log(`Error: ${error}`);
    });
});


router.get('/', (req, res) => {
  res.render('login')
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
        res.redirect('/playersAdmin')
      } else if (user.role == 'Athlete') {
        res.redirect('/players/clubs')
      } else if (user.role == 'Promotor') {
        res.redirect('/promotor/competitions')
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
