// import LocalStrategy from 'passport-local'
const LocalStrategy = require("passport-local").Strategy
import bcrypt from 'bcryptjs'
import models from '../models'
const {
  Players,
  Clubs,
  Competetions
} = models

module.exports= function(passport) {
  console.log('working ini passport');
  passport.use(
    new LocalStrategy(
      function(email, password, done) {
        console.log('cek login');
        Players.findOne({
            where: {
              email: email
            }
          })
          .then(data => {
            console.log('masukkkkkkkkkkkk......');
            if (!data) {
              return done(null, false, {
                message: 'That email is not registered'
              })
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, {
                  message: 'Password incorrect'
                })
              }
            })

          }).catch(err => console.log(err))
      }
    )

  )

passport.serializeUser(function(user, done) {
    console.log(user, 'ini')

    done(null, user.id);

  });


passport.deserializeUser(function(id, done) {
console.log(id, 'ini id')
    User.findById(id)
    .then(data => {
     console.log(data)
      if(data){
        done(null, data)
      }
    })
    .catch(err => {
       done(err, null)
    })
  })
}
