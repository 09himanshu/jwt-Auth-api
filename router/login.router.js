const express = require("express").Router;
const bcrypt = require("bcryptjs");

const schema = require("../model/user");

const logInRoute = express();

logInRoute.post("/login", async(req, res) =>{
    try {
        
        const { email, password } = req.body;

        const user = await schema.findOne({ email });
    
        if(!user) {
            res.status(404).json({msg: "User not found"});
        } 

        const isMatch = await bcrypt.compare(password, user.password);
        // console.log("bcrypt password"+ isMatch);
        const token = await user.generateAuthToken(); 

        if(!isMatch) {
            res.status(400).json({msg: "Invalid password"});
        } else{
            res.status(200).json({ token });
        }
        // console.log("login token: "+token);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
})

module.exports = logInRoute;