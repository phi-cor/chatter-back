import GooglePassFactory from "@middleware/GooglePassF";
import { Router } from "express";
import cors from 'cors'
const router: Router = Router();
const appHost = `http://${process.env.APP_HOST}`
GooglePassFactory.create().then((pass) => {
  router.get(
    "/login/google",
    pass.authenticate("google", {
      scope: ['https://www.googleapis.com/auth/userinfo.profile','email'],
    })
  );


  router.get(
    "/google/cb",
    pass.authenticate("google",
   {successRedirect:`${appHost}/rooms`,
   failureRedirect:`${appHost}/login`
  }
  ));
  router.get(
    "/user",
    (req,res)=> {
      console.log('req',req.user);  
      res.header("Access-Control-Allow-Origin", "http://localhost:3000");   
      res.jsonp(req.user)}
  )

 
  
});

export default router;
