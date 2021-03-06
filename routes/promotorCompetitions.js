import express from 'express'
const router = express.Router();
const  {ensureAuthenticated}  = require('../key/auth')

import models from '../models'
const {
    Players,
    Clubs,
    Competitions,
    ClubsCompetitions
} = models
import moment from 'moment'
// console.log(moment)

// import ensureAuthenticated from './key/auth'


router.get("/", function(req, res) {
    Competitions.findAll({
        include: [Clubs],
        order: [['id', 'ASC']]
    })
        .then(data => {
            let file = []
            let arr = data.map(el => {
                let date = moment(el.schedule).format("LL");
                file.push({
                    id: el.id,
                    competition_name: el.competition_name,
                    schedule: date
                })
            });

            // console.log(arr)
            res.render("promotorCompetitions", {
                listCompetitions: file
            });
        })
        .catch(err => {
            res.send(err.message);
        });
});


export default router