
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const GoogleOAuth2Credentials = require('../config').GoogleOAuth2Credentials
const User = require('../models/user')
const Guide = require('../models/guide')

module.exports = (passport) => {
    passport.serializeUser(function(user, done) {
        done(null, user.id)
    })
      
    passport.deserializeUser(function(id, done) {
        User.findOne({id: id}, function(err, user) {
          done(err, user)
        })
    })
    passport.use('googleUser', new GoogleStrategy({
        clientID: GoogleOAuth2Credentials.client_id,
        clientSecret: GoogleOAuth2Credentials.client_secret,
        callbackURL: GoogleOAuth2Credentials.redirect_uris[0] ,
        passReqToCallback   : true 
        },
        function(req, accessToken, refreshToken, profile, done) {

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
    ))

    passport.use('googleGuide', new GoogleStrategy({
        clientID: GoogleOAuth2Credentials.client_id,
        clientSecret: GoogleOAuth2Credentials.client_secret,
        callbackURL: GoogleOAuth2Credentials.redirect_uris[1] ,
        passReqToCallback   : true 
        },
        function(req, accessToken, refreshToken, profile, done) {

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
            
        }
    ))
}
