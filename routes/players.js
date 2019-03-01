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
import QRcode from 'qrcode'

router.get('/', (req, res)=> {
  res.render('register')
})

router.post('/',(req, res, next) => {
  const { first_name, last_name, gender, email, password, role, ClubId } = req.body

  let obj = {
    first_name,
    last_name,
    gender,
    email,
    password,
    role,
    ClubId
  }
  Players.findOne({where: { email : obj.email }})
  .then(data => {
    if(data){
      res.send('dup')
    } else {
      bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(obj.password, salt, (err, hash) => {
            if(err) throw err
            obj.password = hash
            Players.create(obj)
            .then(data => {
              QRcode.toDataURL(`email: ${email}, password: ${password}`)
              .then(url => {
                res.render('login', { url })
              })
            })
            .catch((err) => {
              res.send(err)
            })
          })
        })
    }
  }).catch((err) => res.send(err.message))
})

export default router