const expressAsyncHandler = require("express-async-handler");
const session = require("express-session")
const club=require("../models/club");
const {validateLoginForm}=require("../validationduform/validationClub");
const bcrypt = require('bcrypt');


const login =expressAsyncHandler(async(req,res)=>{

    const {email,password}=req.body;
    try{
        if(validateLoginForm(req.body)){
            const existingclub = await club.findOne({ email: email });
            
            if (!existingclub){
                
                return res.status(404).json('An account with this email does not exist.');

            }else{
                
                const comparepass=await bcrypt.compare(password,existingclub.password);
                
                if(comparepass){//login successfully:
                    if(existingclub.email === 'admin@gmail.com'){
                        req.session.isadmin= true;
                        req.session.name ='admin';
                        req.session.email=email;
                        res.status(200).json('Admin login successfully');
                    }else{
                         req.session.clubid=existingclub._id;
                        req.session.name=existingclub.name;
                        req.session.email=email;
                        res.status(200).json('login successfully');
                    }
                    
                }else{

                    res.status(400).json('invalid credentials');
                
                }
            }

        }else{
            res.status(400).json({ message: errorMessage() });

        }

    }
    catch(error){
        
        res.status(500).json({ message: error.message });
    }

});
/*
const whoisloggedin= expressAsyncHandler(async(req,res,next)=>{
    if (req.session.isadmin){
        next();
    }else if(!req.session.id){
        return res.status(400).send('you must be logged in to access this route');
    }else{
        try{
            const club = await club.findById(req.session.id); 
            if (!club) {
              return res.status(401).json({ error: 'Invalid session' }); 
            }
            req.club = club; 
            next();
          } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
          }
    }
});

/*ajout de la fonction whoisloggedin to the arguments of the endpoints :
app.get('/protected', isLoggedIn, (req, res) => {}
 */
/*
const logout= expressAsyncHandler(async(req,res)=>{
    req.session.destroy((err) => { 
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Logout failed!' });
        } else {
          res.clearCookie('session-id');
          res.json({ message: 'Logged out successfully!' });
}})});*/

module.exports= { login }