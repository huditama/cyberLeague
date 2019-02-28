const express = require("express");
const router = express.Router()
const Model = require("../models");

//Show Competitions
router.get("/", function (req, res) {
    Model.Competitions.findAll({
        include: [Model.Clubs],
        order: [['id', 'ASC']]
    })
        .then(data => {
            res.render("competitions/competitions", {
                listCompetitions: data
            });
        })
        .catch(err => {
            res.send(err.message);
        });
});

//Show Clubs in Competition
router.get('/:id', function (req, res) {
    Model.Competitions.findOne({
        where: {
            id: req.params.id
        },
        include: [Model.Clubs]
    })
        .then(data => {
            res.render('competitions/listOfClubs', {
                registeredTeam: data
            })
        })
        .catch(err => {
            res.send(err.message)
        })
})



module.exports = router