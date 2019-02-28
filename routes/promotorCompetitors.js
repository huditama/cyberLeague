import express from 'express'
const router = express.Router();
import models from '../models'
const {
    Players,
    Clubs,
    Competitions,
    ClubsCompetitions
} = models

router.get('/:id', function (req, res) {
    Competitions.findOne({
        where: {
            id: req.params.id
        },
        include: [Clubs]
    })
        .then(data => {
            res.render('promotorCompetitors', {
                registeredTeam: data
            })
        })
        .catch(err => {
            res.send(err.message)
        })
})

export default router