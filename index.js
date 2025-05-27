import express from "express"
import config from "./config.js";
import { auth } from "./src/index.js";
const app=express()



// This middleware will only run if Content-Type is exactly application/json
app.use(express.json({ type: 'application/json',strict: false }));

// create a new login credentials for new user
app.post("/auth/register",auth.registerUser)
// GET JWT token after successfull login verification to avoid verification for all routes/API and store it in cookies
app.post("/auth/login",auth.login)

app.get("/auth/user",auth.authenticateToken,(req,res)=>{
    const header=req.headers
    console.log("verified JWT",header)
    return res.status(200).send("user successfully verified");
})


app.listen(config.PORT,()=>{
    console.log(`Express application running at port: ${config.PORT}`)
})