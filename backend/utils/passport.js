
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const GoogleOAuth2Credentials = require('../config').GoogleOAuth2Credentials
const User = require('../models/user')
const Guide = require('../models/guide')

module.exports = (passport) => {
    passport.serializeUser(function(user, done) {
        console.log('serializeUser 호출')
        done(null, user.id)
    })
      
    passport.deserializeUser(function(id, done) {
        console.log('deserializeUser 호출')
        User.findOne({id: id}, function(err, user) {
          done(err, user)
        })
    })
    passport.use(new GoogleStrategy({
        clientID: GoogleOAuth2Credentials.client_id,
        clientSecret: GoogleOAuth2Credentials.client_secret,
        callbackURL: GoogleOAuth2Credentials.callbackURL ,
        passReqToCallback   : true 
        },
        function(req, accessToken, refreshToken, profile, done) {
            console.log('isGuide: ', req.isGuide)
            console.log(req)
            console.log('')
            if (req.isGuide) {
                Guide.findOrCreate(
                    { 
                        id: profile.id,
                        nickname : profile.displayName,
                        profileImageUrl : profile.photos[0].value,
                        email : profile.emails[0].value
                    },
                    function (err, user) {
                        user.token = accessToken
                        return done(err, user)
                    }
                )
            } else {
                User.findOrCreate(
                    { 
                        id: profile.id,
                        nickname : profile.displayName,
                        profileImageUrl : profile.photos[0].value,
                        email : profile.emails[0].value
                    },
                    function (err, user) {
                        user.token = accessToken
                        return done(err, user)
                    }
                )
            }
        }))
}
