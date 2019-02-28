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
    done(null, user.id);

  });


  passport.deserializeUser(function(id, done) {

    Players.findById(id)
    .then(data => {
      console.log('masuk');
      if(data){
        done(null, data)
      }
    })
    .catch(err => {
      done(err, null)
    })
  })
}
//
// module.exports = function(passport) {
//   console.log("passport is working");
//   passport.serializeUser(function(users, done) {
//     return done(null, users.id);
//     console.log("Serialize");
//
//   })
//   // function findById(id, fn) {
//   //     Users.findById(id).
//   //  }
//   //  function (err, users) {
//   //
//   //     done(err, users);
//   //   });
//   passport.deserializeUser(function(id, done) {
//     console.log("DeSerialize");
//     Players.findById(id).then((users) => {
//       console.log(users);
//       return done(null, users);
//     });
//   })
//
//   passport.use(new LocalStrategy(
//     function(username, password, done) {
//       Players.findOne({
//           where: {
//             username: username
//           }
//         },
//         function(err, users) {
//           if (err) {
//             return done(err);
//           }
//           if (!users) {
//             return done(null, false, {
//               message: 'Incorrect username.'
//             });
//           }
//           if (!users.password === password) {
//             return done(null, false, {
//               message: 'Incorrect password.'
//             });
//           }
//           return done(null, users);
//         });
//     }
//   ));
//
// }