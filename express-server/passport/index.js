const local = require('./localStrategy');
const {User} = require('../models')

module.exports = passport => {
    passport.serializeUser((user,done) => {
        done(null, user.userID);
    });

    passport.deserializeUser((id, done) => {
        User.findOne({where : { userID : id }})
            .then(result => {
                console.log('deserializeUser');
                return done(null, result);
            })
            .catch(err=>{
                console.error(err);
                return done(err);
            })

    });

    local(passport);
}