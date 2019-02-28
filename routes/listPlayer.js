import express from 'express'
const router = express.Router();
import models from '../models'
const { Players, Clubs, Competitions } = models
import bcrypt from 'bcryptjs'

//LIST 
router.get("/", function (req, res) {
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