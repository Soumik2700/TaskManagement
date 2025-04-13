import User from "../Model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function createUser(req, res){
    const {username, email, password, confirmPassword} = req.body;

    if(!username || !email || !password || !confirmPassword){
        return res.status(400).json({message: "All fields are required!"});
    }
    
    if(password !== confirmPassword){
        return res.status(400).json({message: "Password is not matching!"});
    }

    const hashedPass = bcrypt.hashSync(password, 10);

    try{
        const user = new User({
            username, email, password: hashedPass
        })

        const savedUser = await user.save();

        if(!savedUser){
            return res.status(400).json({message: "Error creating user!"});
        }else{
            res.status(201).json({message: "Registration sucessfull!"});
        }

    }catch(err){
        res.status(500).json({message: err.message});
    }
}

export async function loginUser(req, res){
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({message: "All fields are required!"});
    }

    try{
        const validUser = await User.findOne({email});
        if (!validUser){
            return res.status(404).json({message: "No user found!"});
        }

        const validPassword = bcrypt.compareSync(password, validUser.password);
        if(!validPassword){
            return res.status(403).json({message: "Wrong password entered!"});
        }

        const token = jwt.sign({id:validUser._id}, "MY_JWT_SECRET_KEY", {expiresIn: "24h"});
        res.send({
            userId: validUser._id,
            username: validUser.username,
            email: validUser.email,
            jwtToken: token
        })
    }catch(err){
        res.status(500).json({message: err.message});
    }
}