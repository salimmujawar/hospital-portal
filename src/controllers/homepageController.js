import userService from "../services/userService"
let getHomepage = (req, res) => {
    return res.render("homepage.ejs");
};

let getNewUserPage = (req, res) => {
  return res.render("createUser.ejs");
};

let getRegisterPage = (req, res) => {
  return res.render("auth/register.ejs");
};

let getLoginPage = (req, res) => {
  return res.render("auth/login.ejs");
};

let createNewUser = async(req, res) => {
  let user = req.body
  let message = await userService.createNewUser(user);
  console.log(message);
  return res.redirect("/");
};

let handleRegister = async(req, res) => {
  //validate user

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
    let message = await userService.createNewUser(user);
    console.log(message);
    return res.redirect("/");
  }catch(e) {
    console.log(e);
  }
  
  return res.redirect("/");
};

module.exports = {
  getHomepage: getHomepage,
  getNewUserPage: getNewUserPage,
  createNewUser: createNewUser,
  getRegisterPage: getRegisterPage,
  getLoginPage: getLoginPage,
  handleRegister: handleRegister
};