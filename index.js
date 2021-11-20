require("dotenv").config();
const express = require("express");

const connectDB = require("./database/db")
const route = require("./router/signUp");
const logInRoute = require("./router/login.router");
const auth = require("./middleware/token.middleware");

const app = express();
app.use(express.json());

app.get("/", async(req, res) => {
    try {
        await res.status(200).send("hello world")    
    } catch (error) {
        console.log(error);
    }
})

// Sign up route
app.use("/", route);

// Login route
app.use("/", logInRoute)

// authorize page access
app.get("/auth", auth, async(req, res) =>{
    try {
        await res.status(200).send("<h1> You are authorized </h1>");
    } catch (error) {
        console.log(error);
    }
})

// PORT

const port = process.env.PORT || 3000;

const start = async() =>{
    try {
        app.listen(port, () => console.log(`Server hosted on port ${port}`));
        connectDB(process.env.DB_URL);
    } catch (error) {
        console.log(error);
    }
}

start();