import db from "../models";
import bcrypt from "bcryptjs/dist/bcrypt";


let createNewUser = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check users's email is exist before?
      let isEmailExist = await checkEmailUser(user); 
      if (isEmailExist) {
        reject(`This email ${user.email} already exist. Please choose another email.`);
      }else {
        //hash the user's password
        let salt = bcrypt.genSaltSync(10);
        let hashPassword = await bcrypt.hashSync(user.password, salt);
        // Store hash in your password DB.
        user.password = hashPassword;
        //create a new user
        await db.User.create(user);
        resolve("Done!");
      }
      
    }catch (e) {
      reject(e);
    }
  });
};

let checkEmailUser = (userCheck) => {
  return new Promise( async(resolve, reject) => {
    try {
      let currentUser = await db.User.findOne({
        where: {
          email: userCheck.email
        }
      });
      if(currentUser) resolve(true);
      else reject(false);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewUser: createNewUser
};