const expressAsyncHandler = require("express-async-handler");
const club=require("../models/club");
const {validateLoginForm}=require("../validationduform/validationClub");
const {hashpass}=require("../authentication/hashpassword");


const login =expressAsyncHandler(async(req,res)=>{

    const forminfo=req.body;
    try{
        if(validateLoginForm(forminfo)){
            const existingclub = await club.findOne({ email: forminfo.email });
            if (!existingclub){
                
                return res.status(404).json('An account with this email does not exist.');

            }else{
                hashedPassword=hashpass(forminfo.password);
                const isclub = await club.findOne({email: forminfo.email},{password: hashedPassword});
                try{
                if(isclub){
                    res.status(200).json('login successfully');







                }else{

                    res.status(400).json('invalid credentials');
                
                }}catch{
                    res.status(500).json({
                    message: error.message,
                });}

            }

        }else{
            res.status(400).json({ message: errorMessage() });

        }

    }
    catch{
        
        res.status(500).json({ message: error.message });
    }








});
module.exports= {login}