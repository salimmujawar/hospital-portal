import express, { Router } from "express";
import homepageController from "../controllers/homepageController";
import auth from "../validation/authValidation";

/*
  init all web routes
 */

  let router = express.Router();

  let initAllWebRoutes = (app) => {
    router.get("/", homepageController.getHomepage);
    router.get("/login", homepageController.getLoginPage);
    router.get("/register", homepageController.getRegisterPage);
    router.post("/register", auth.validateRegister ,homepageController.handleRegister);
    router.get("/new-user", homepageController.getNewUserPage);    
    router.post("/create-new-user", homepageController.createNewUser);
    return app.use("/", router);
  };

  module.exports = initAllWebRoutes;