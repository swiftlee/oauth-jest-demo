import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import oauthRouter from './api/oauthRouter.js';
import passportGoogleOAuth from 'passport-google-oauth2';
import User from './models/User.js';
import passport from 'passport';
import config from './config/config.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';

const MongoStore = connectMongo(session);
mongoose.connect(config.DB_URI, {
    useUnifiedTopology: true
});
const app = express();

// allows for cookie assignment
app.use(cookieParser());
// setup sessions for all requests, this is only a MemoryStore... never use this in production
// creates a session, sets the session cookie, and creates the session object attribute on the req object
app.use(session({
    secret: 'this_is_a_secret',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({mongooseConnection: mongoose.connection}) // this is used for persistent session store
}));

// morgan used for logging HTTP requests to the console
app.use(morgan('dev'));

// bodyParser used for resolving the req and res body objects (urlEncoded and json formats)
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
const GoogleStrategy = passportGoogleOAuth.Strategy;


// allow passportGoogleOAuth middleware to use the Google OAuth strategy
passport.use(new GoogleStrategy(
    {
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:5000/api/oauth2/callback",
        passReqToCallback: true
    },
    (request, accessToken, refreshToken, profile, done) => {
        User.findOneOrCreate({oauthID: profile.id, name: profile.displayName}, (err, user) => {
            return done(err, user);
        })
    }
));

app.use('/api/oauth2', oauthRouter);

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

app.get('/account', ensureAuthenticated, (req, res) => {
    console.log('USER', req.user);
    User.findOne({_id: req.user}, (err, user) => {
        console.log('whatever', {user: user});
        if (err)
            console.log(err);
        else
            res.json({user: user});
    })
});

// serializeUser is used to determine which data of the user is stored in the session
// https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
passport.serializeUser((user, done) => {
    done(null, user);
});
// done function takes care of supplying user credentials after user is authenticated successfully
// e.g. the function attaches the user object to the request object so you can do "req.user"
// more on the done function: https://stackoverflow.com/questions/32153865/what-is-done-callback-function-in-passport-strategy-configure-use-function
passport.deserializeUser((id, done) => {
    User.findOne({_id: id}, (err, user) => {
        if (!err) done(null, user);
        else done(err, null);
    });
});

app.listen(5000, () => console.log('Server is running.'));
