import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import oauthRouter from './api/oauthRouter.js';
import passportGoogleOAuth from 'passport-google-oauth2';
import User from './models/User.js';
import passport from 'passport';


const app = express();

// morgan used for logging HTTP requests to the console
app.use(morgan('dev'));

// bodyParser used for resolving the req and res body objects (urlEncoded and json formats)
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((obj, done) => {

    done(null, obj);
});
const GoogleStrategy = passportGoogleOAuth.Strategy;


// allow passportGoogleOAuth middleware to use the Google OAuth strategy
passport.use(new GoogleStrategy(
    {
        clientID: "GOOGLE_CLIENT_ID", // TODO: get client id from dummy account
        clientSecret: "GOOGLE_CLIENT_SECRET",
        callbackURL: "localhost:5000/api/oauth2/callback",
        passReqToCallback: true
    },
    (request, accessToken, refreshToken, profile, done) => {
        User.findOneOrCreate({googleId: profile.id}, (err, user) => {
            return done(err, user);
        })
    }
));

// passport middleware
app.use(passport.initialize());

app.use('/api/oauth2', oauthRouter);

app.listen(5000, () => console.log('Server is running.'));
