// module.exports = {
//     ensureAuthenticated function (req, res, next) {
//         if (req.isAuthenticated()) {
//             return next()
//         }
//         res.redirect('/login')
//     }
// }

// function ensureAuthenticated function (req, res, next) {
//     if (req.isAuthenticated()) {
//         return next()
//     }
//     res.redirect('/login')
// }
const ensureAuthenticated = (req, res, next) => {
 
    if (req.isAuthenticated()) {
        return next()
    }
    
  }

module.exports = ensureAuthenticated