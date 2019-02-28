const express = require("express");
const router = express.Router()
const Model = require("../models");

//Show List Clubs
router.get("/", function (req, res) {
  Model.Clubs.findAll({
    include: [Model.Players],
    order: [['id', 'ASC']]
  }).then(data => {
    res.render("clubs/clubs", {
      listClubs: data
    })
    // res.send(data)
  })
    .catch(err => {
      res.send(err.message);
    })
})

//Add Clubs
router.get("/register", function (req, res) {
  res.render("clubs/register");
}).post("/register", function (req, res) {
  Model.Clubs.create(req.body)
    .then(() => {
      res.redirect("/clubs");
    })
    .catch(err => {
      res.send(err.message);
    });
});

//Add Competition
let clubdata;
router.get("/:id/registerCompetition", function (req, res) {
  Model.Clubs.findByPk(req.params.id)
    .then(data => {
      clubdata = data
      return Model.Competitions.findAll()
    })
    .then(competition => {
      res.render("clubs/registerCompetition", {
        club: clubdata, competition
      })
    })
    .catch(err => {
      res.send(err.message)
    })
}).post("/:id/registerCompetition", function (req, res) {
  Model.Competitions.findOne({
    where: {
      competition_name: req.body.competition_name
    }
  }).then(competition => {
    return Model.ClubsCompetitions.create({
      ClubId: req.params.id,
      CompetitionId: competition.id
    })
  })
    .then(() => {
      res.redirect('/clubs')
    })
    .catch(err => {
      res.send(err.message)
    })
})



module.exports = router;