import express from 'express'
const router = express.Router();
import models from '../models'
const {
    Players,
    Clubs,
    Competitions,
    ClubsCompetitions
} = models

router.get("/", function (req, res) {
    Clubs.findAll({
        include: [Players],
        order: [['id', 'ASC']]
    }).then(data => {
        res.render("listClubsPlayer", {
            listClubs: data
        })
    })
        .catch(err => {
            res.send(err.message);
        })
})

export default router