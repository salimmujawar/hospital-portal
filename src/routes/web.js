import express, { Router } from "express";
import homepageController from "../controllers/homepageController";
import auth from "../validation/authValidation";
import initPassportLocal from "../controllers/passport/passportLocal";
import passport from "passport";
import authController from "../controllers/authController";


//init passport-local
initPassportLocal();

/*
  init all web routes
 */

  let router = express.Router();

  let initAllWebRoutes = (app) => {
    router.get("/", authController.checkLoggedIn, homepageController.getHomepage);
    router.get("/login", authController.checkLoggedOut, homepageController.getLoginPage);
    router.get("/register", homepageController.getRegisterPage);
    router.post("/register", auth.validateRegister ,homepageController.handleRegister);
    router.post("/login", passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      successFlash: true,
      failureFlash: true
    }));
    router.get("/new-user", homepageController.getNewUserPage);    
    router.post("/create-new-user", homepageController.createNewUser);
    router.post("/log-out", authController.postLogOut);
    return app.use("/", router);
  };

  module.exports = initAllWebRoutes;