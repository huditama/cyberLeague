import express from 'express'
const router = express.Router();
import models from '../models'
const {
    Players,
    Clubs,
    Competitions,
    ClubsCompetitions
} = models

router.get('/:id', (req, res) => {
    let playerData = null
    Players.findByPk(req.params.id)
        .then(data => {
            playerData = data
            return Clubs.findAll()
        })
        .then(clubs => {
            res.render("editPlayers", {
                player: playerData, clubs
            })
            // res.render("section")
        })
        .catch(err => {
            res.send(err.message)
        })
}).post("/:id", function (req, res) {
    Players.update({
        id: req.params.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        email: req.body.email,
        ClubId: req.body.ClubId,
        password: req.body.password,
        position: req.body.position,
    }, {
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.redirect("/playersAdmin");
        })
        .catch(err => {
            res.send(err.message);
        })
})

export default router