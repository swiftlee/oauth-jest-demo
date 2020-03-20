# _NOTES ABOUT THE TECHNOLOGIES USED IN THIS PROJECT_

##### Authentication Refresher
> **Authentication** is the process of proving someone is who they say they are. This might be anything from a retina scanner to prove identity or username and password combination to prove identity.

#### PassportJS
- Passport is an authentication middleware used to authenticate requests. This means that we are making sure sender of requests are the person they say they are.
- Passport OAuth strategies allow us to easily make a request to 3rd party services for their "token". This token is what holds the unique identity of the user on the 3rd party service.
- I saw the serializeUser and deserializeUser... what the heck is that? 
    - serializeUser is used to save information in the "session" and is later used to retrieve the object via deserializeUser when we need it again.
    - deserializeUser is used to "deserialize" or convert back to an object and attach it to the request object.
    - Here is a great visual representation:
    ```javascript
    // credits to https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
   passport.serializeUser(function(user, done) {
       done(null, user.id);
   });             │
                    │ 
                    │
                    └─────────────────┬──→ saved to session
                                      │    req.session.passport.user = {id: '..'}
                                      │
                                      ↓           
   passport.deserializeUser(function(id, done) {
                      ┌───────────────┘
                      │
                      ↓ 
       User.findById(id, function(err, user) {
           done(err, user);
       });            └──────────────→ user object attaches to the request as req.user   
   });
    ```
    - Another great way to see what is going on is to check your MongoDB database and take a look at the sessions collection that gets generated.
