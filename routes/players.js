const express = require("express");
const router = express.Router()
const Model = require("../models");

//Show List of Players by Club Name
router.get("/", function (req, res) {
  Model.Players.findAll({
    include: [Model.Clubs],
    order: [['role', 'ASC']]
  })
    .then(data => {
      res.render("players/players", {
        listPlayers: data
      })
    })

    .catch(err => {
      res.send(err.message);
    })
})

//Register Players
router.get("/register", function (req, res) {
  res.render("players/register");
}).post("/register", function (req, res) {
  Model.Players.create(req.body)
    .then(() => {
      res.redirect("/players");
    })
    .catch(err => {
      res.send(err.message);
    })
})

//Edit Players
router.get("/editPlayers/:id", function (req, res) {
  let playerData = null
  Model.Players.findByPk(req.params.id)
    .then(data => {
      playerData = data
      return Model.Clubs.findAll()
    })
    .then(clubs => {
      res.render("players/editPlayers", {
        player: playerData, clubs
      })
    })
    .catch(err => {
      res.send(err.message)
    })
})
  .post("/editPlayers/:id", function (req, res) {
    Model.Players.update({
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
        res.redirect("/players");
      })
      .catch(err => {
        res.send(err.message);
      })
  })

//Delete Players
router.get("/deletePlayers/:id", function (req, res) {
  Model.Players.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.redirect("/players");
    })
    .catch(err => {
      res.send(err.message);
    })
})

module.exports = router;