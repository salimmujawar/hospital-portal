import {check} from "express-validator";

let validateRegister = [
    check("email", "Invalid email").isEmail().trim(),
    check("password", "Invalid password. Password must be at least 2 char long").isLength({min:3}),
    check("confirmPassword", "Confirm password don't match with password").custom((value, {req}) => {
        return value === req.body.password
    })
];

module.exports = {
  validateRegister: validateRegister
}