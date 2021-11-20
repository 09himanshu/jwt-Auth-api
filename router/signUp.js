const express = require("express").Router;
const bcrypt = require('bcryptjs');
const { check, validationResult } = require("express-validator");

const schema = require("../model/user");

const route = express();

// Sign up route
route.post("/signUp", [
    check("email", "Please provide a valid email").isEmail().normalizeEmail(),
    check("password", "Password should be greater then 6 character").isLength({min: 6}),
], async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            await res.status(400).json({errors: errors.array()});
        }

        let user = await schema.findOne({ email });
        if(user) {
            await res.status(400).json({msg: "user already exists"});
        }
        user = new schema({
            username, email, password
        })

        console.log(`username: ${username}, email: ${email}, password: ${password}`);
        let hashPassword = await bcrypt.hash(password,10);
        user.password = hashPassword;
        console.log(hashPassword);

        const token = await user.generateAuthToken();
        console.log("sign up token: "+token);

        await res.status(200).json({user});
        await user.save();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
});


module.exports = route;