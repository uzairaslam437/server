const express = require("express");
const User = require("../modal/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register",async (req,res)=>{
    try{
        console.log('Before', req.body);
        const {username,email,password} = req.body;
        console.log("After",req.body);
        const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt);
    console.log(hashedPassword);

    const user= new User({username,email,password:hashedPassword});

    await user.save();

    res.json({message:"Registered User Successfully"})
    }
    catch(err){
        res.json({Error:err})
    }
})

userRouter.post("/login",async (req,res)=>{
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
    return res.json({ message: 'Authentication failed' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
    return res.json({message : 'Authentication failed'
     });
    }
    const token = jwt.sign({ userId: user._id }, 'SECRETKEY');
    res.status(200).json({ token,message: 'Logged In Successfully' });
    });

module.exports = userRouter;



