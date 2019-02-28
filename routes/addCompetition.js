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
    res.render('addCompetition');
  }).post("/", function (req, res) {
    Competitions.create(
      // competition_name: req.body.competition_name,
      // // schedule: 
      req.body
    )
      .then(() => {
        res.redirect("/playersAdmin/listCompetitions");
      })
      .catch(err => {
        res.send(err.message);
      })
  })


export default router