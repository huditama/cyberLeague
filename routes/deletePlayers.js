import express from 'express'
const router = express.Router();
import models from '../models'
const {
    Players,
    Clubs,
    Competitions,
    ClubsCompetitions
} = models

router.get("/:id", function (req, res) {
    Players.destroy({
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