import express from 'express';

const oauthRouter = express.Router();
import passport from 'passport';
import cors from 'cors';

// This is going to be fired whenever we get a response from Google regarding auth status
oauthRouter.get('/callback', cors(), passport.authenticate('google', {
    failureRedirect: '/'
}), (req, res) => {
    // res.setHeader('Access-Control-Allow-Origin', '*');
    req.session.cookie.expires = new Date(Date.now() + 3600000);
    res.redirect('http://localhost:3000/account')
});

oauthRouter.get('/', cors(), passport.authenticate('google', {scope: ['email', 'profile']}, () => {
}));

oauthRouter.get('/logout', cors(), (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    req.session.destroy(() => res.redirect('http://localhost:3000/'));
});

export default oauthRouter;
