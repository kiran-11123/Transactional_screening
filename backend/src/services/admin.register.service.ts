import admin_user_model from "../config/admin.register.js";
import logger from "../utils/logging.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const admin_registration_service = async(email :string , username :string , password : string)=>{
    
    logger.info(`Request for admin registration received in service`, { email, username });
    try{
       
        const check_user = await admin_user_model.findOne({email : email});

        if(check_user){
            logger.warn(`Attempt to register an already registered admin user`, { email });
            throw new Error('user already registred as admin')
        }

        const hash_password = await bcrypt.hash(password , 10);

        const new_admin = new admin_user_model({
            email,
            username,
            password :hash_password
        })
        
        logger.info(`Saving new admin user to the database`, { email, username });
        await new_admin.save();
        logger.info(`New admin user saved successfully`, { email, username });
        return true;
    }
    catch(er){

        throw er;

    }
}


export const admin_signin_model = async(email : string  , password  :string)=>{
    logger.info(`Request for admin sign-in received in service`, { email });
     
    try{

          const check_user = await admin_user_model.findOne({email : email});

        if(!check_user){
            logger.warn(`Attempt to sign in with an unregistered admin email`, { email });
            throw new Error('user not registred as admin')
        }

        const compare_password = await bcrypt.compare(password , check_user.password);


        if(!compare_password){
            logger.warn(`Incorrect password attempt for admin sign-in`, { email });
            throw new Error('email or password is wrong')
        }

        const token = jwt.sign({email : check_user.email , username : check_user.username} , process.env.JWT_SECRET_KEY as string , {expiresIn : '15m'})
        logger.info(`Admin sign-in successful`, { email });
        return token;



    }
    catch(er){
        throw er;
    }
}