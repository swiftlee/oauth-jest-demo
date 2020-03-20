import express from 'express';

const oauthRouter = express.Router();
import passport from 'passport';

// This is going to be fired whenever we get a response from Google regarding auth status
oauthRouter.get('/callback', passport.authenticate('google', {
    failureRedirect: '/'
}), (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.redirect('/account')
});

oauthRouter.get('/', passport.authenticate('google', {scope: ['email', 'profile']}, () => {
}));

export default oauthRouter;
