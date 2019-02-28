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
    res.render("addClub");
  }).post("/", function (req, res) {
    Clubs.create(req.body)
      .then(() => {
        res.redirect("/playersAdmin/listClubs");
      })
      .catch(err => {
        res.send(err.message);
      });
  });

export default router