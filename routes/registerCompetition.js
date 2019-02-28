import express from 'express'
const router = express.Router();
import models from '../models'
const {
    Players,
    Clubs,
    Competitions,
    ClubsCompetitions
} = models

let clubdata;
router.get("/:id", function (req, res) {
  Clubs.findByPk(req.params.id)
    .then(data => {
      clubdata = data
      return Competitions.findAll()
    })
    .then(competition => {
      res.render("registerCompetition", {
        club: clubdata, competition
      })
    })
    .catch(err => {
      res.send(err.message)
    })
}).post("/:id", function (req, res) {
  Competitions.findOne({
    where: {
      competition_name: req.body.competition_name
    }
  }).then(competition => {
    return ClubsCompetitions.create({
      ClubId: req.params.id,
      CompetitionId: competition.id
    })
  })
    .then(() => {
      res.redirect('/playersAdmin/listClubs')
    })
    .catch(err => {
      res.send(err.message)
    })
})

export default router