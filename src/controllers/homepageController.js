import userService from "../services/userService";
import {validationResult} from "express-validator";


let getHomepage = (req, res) => {
    return res.render("homepage.ejs");
};

let getNewUserPage = (req, res) => {
  return res.render("createUser.ejs");
};

let createNewUser = async(req, res) => {
  let user = req.body
  await userService.createNewUser(user);
  return res.redirect("/");
};

let getLoginPage = (req, res) => {   
  return res.render("auth/login.ejs", {
    errors: req.flash("errors")    
  });
};

let getRegisterPage = (req, res) => {
  //Keep the old input value
  let form = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };
  return res.render("auth/register.ejs", {
    errors: req.flash("errors"),
    form: form
  });
};

let getAdminPage = (req, res) => {
  return res.render("users/main.ejs");
};

let handleRegister = async(req, res) => {
  //Keep the old input value
  let form = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };

  //validate user input fields
  //create an empty array to save validation errors
  let errorArr = [];
  let validationError = validationResult(req);
  if(!validationError.isEmpty()) {
      let errors = Object.values(validationError.mapped());
      errors.forEach((item) => {
        errorArr.push(item.msg);
      });   
      req.flash("errors", errorArr);
      return res.render("auth/register.ejs", { 
        errors: req.flash("errors"),       
        form: form
      });
  }

  //create user
  try {
    let user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      createdAt: Date.now()
    };
    await userService.createNewUser(user);   
    return res.redirect("/");
  }catch(e) {
    //showign the error msg with the flash
    req.flash("errors", e);
    return res.render("auth/register.ejs", { 
      errors: req.flash("errors"),     
      form: form
    });
  } 
  
};



module.exports = {
  getHomepage: getHomepage,
  getNewUserPage: getNewUserPage,
  createNewUser: createNewUser,
  getRegisterPage: getRegisterPage,
  getLoginPage: getLoginPage,
  handleRegister: handleRegister,
  getAdminPage: getAdminPage
};