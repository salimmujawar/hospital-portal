import passport from "passport";
import passportLocal from "passport-local";
import loginService from "../../services/loginService";

let LocalStrategy = passportLocal.Strategy;

//init the passport-local
let initPassportLocal = () => {
  //check login with email and password
  passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  }, async (req, email, password, done) => {
      try {
        //find user by email
        await loginService.findUserByEmail(email)
        //had a user ?
        .then(async (user) => {
          if(!user) return done(null, false, req.flash("errors","User not found!"));
          //compare the user's password 
          let message = await loginService.comparePassword(password, user);
          //the password is match?
          if (message === true) {
              return done(null, user, null);
          }else {
            //return false with error msg
            return done(null, false, req.flash("errors", message));
          }
        }).catch(err => {
          console.log(err);
          return done(null, false, err);
        });
      } catch(error) {
        console.log(error);
        return done(null, false, error);
      } 
  }
  ));
};

passport.serializeUser((user, done) => {
    return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  await loginService.findUserById(id).then(user => {
    return done(null, user);
  }).catch(error => {
    console.log(error);
    return done(error, null);
  })
});

module.exports = initPassportLocal;