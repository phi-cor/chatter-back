import express from "express";
import dbConnection  from "./database";
import "reflect-metadata";
import authRoutes from "@routes/auth";
import cookieSession from "cookie-session";
import passport from "passport";
import cors, { CorsOptions } from 'cors'

const port = 3002;
const app = express();
const corsOptions:CorsOptions = {
origin: ['localhost:3000'],
methods: ['GET', 'POST'],
credentials:true,
} 
app.use(cors(corsOptions))

const cookieKey = process.env.COOKIE_KEY
if (!cookieKey) {throw new Error('no Cookie Key')}

app.use(cookieSession({
  maxAge: 1000 * 60 * 60 * 24, // 1 day
  keys: [cookieKey]
}))

app.use(passport.initialize())
app.use(passport.session())


dbConnection.then(async () => {
    console.log("Connection to Database successful");
    
    app.use('/auth',authRoutes)
   
    app.listen(port, () => {
      console.log(`Serve at http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));

export default app;
