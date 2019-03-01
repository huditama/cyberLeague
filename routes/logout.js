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

router.get('/', function(req, res, next) {
  // console.log(req.session)
    req.logout()
    req.session.destroy( (err ) => {

      res.redirect('/login')
    })
    
})

export default router