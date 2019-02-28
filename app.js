const express = require("express");
const app = express();
const port = 3000;


app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use('/players', require('./routes/players'))
app.use('/clubs', require('./routes/clubs'))
app.use('/competitions', require('./routes/competitions'))


app.get("/", (req, res) => {
  res.render('homepage')
})

app.listen(port, () => {
  console.log(`LISTENING ON PORT ${port}`);
})