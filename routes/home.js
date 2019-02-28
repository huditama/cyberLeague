import express from 'express'
const router = express.Router();
import models from '../models'
const { Players, Clubs, Competetions } = models
import bcrypt from 'bcryptjs'


router.get('/', (req, res) => {

  res.render('home')
})

export default router