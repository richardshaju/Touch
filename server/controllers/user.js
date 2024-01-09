import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import user from '../models/user.js'

export const signin = async(req, res) =>{
    const {email, password} = req.body;

    try {
        const exisitingUser = await user.findOne({email})
        if(!exisitingUser) return res.status(404).json({message: "user not exist"})

        const isPasswordCorrect = await bcrypt.compare(password, exisitingUser.password)
        if(!isPasswordCorrect) return res.status(400).json({message:"invalid"})

        const token = jwt.sign({email: exisitingUser.email, id :exisitingUser._id}, 'test', {expiresIn:'1h'})
        res.status(200).json({result:exisitingUser, token})
    } catch (error) {
        console.log(error);
    }
}
export const signup = async(req, res) =>{
    const {email, password, confirmPassword, firstName, lastName} = req.body;

    try {
        const exisitingUser = await user.findOne({email})
        if(exisitingUser) return res.status(400).json({message: "user alerady exist"})

        if(password !== confirmPassword ) return res.status(400).json({message:"Password dosen't match"})
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await user.create({email, password:hashedPassword, name: `${firstName} ${lastName}`})

        const token = jwt.sign({email: result.email, id :result._id}, 'test', {expiresIn:'1h'})
        res.status(200).json({result:result, token})

    } catch (error) {
        console.log(error);
        
    }
}