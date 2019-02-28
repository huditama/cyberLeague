import express from 'express'
const router = express.Router();
import models from '../models'
const { Players, Clubs, Competitions } = models
import bcrypt from 'bcryptjs'
// const {ensureAuthenticated} = require('./key/outh')
const  ensureAuthenticated  = require('../key/auth')

//LIST 
router.get("/", function ensureAuthenticated (req, res) {
    console.log(req.session ,'ini')
    Players.findAll({
        include: [Clubs],
        order: [['role', 'ASC']]
    })
        .then(data => {
            res.render("listplayers", {
                listPlayers: data
            })
        })

        .catch(err => {
            res.send(err.message);
        })
    // res.render('listplayers')
})

export default router