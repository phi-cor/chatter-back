import OauthService from "@services/OauthService";
import passport, { Passport } from "passport";
import User from "@models/User";
import { Strategy, StrategyOptionsWithRequest } from "passport-google-oauth2";
import Profile from "@models/Profile";
declare global {
  namespace Express {
    interface User {
      id?: number;
    }
  }
}

export default class GooglePassFactory {
  
  static async create() {
    const { client_id, client_secret, redirect_uri } =
      await OauthService.getAuthenticationOptions();
    const strategyOptions: StrategyOptionsWithRequest = {
      clientID: client_id,
      clientSecret: client_secret,
      callbackURL: redirect_uri,
      passReqToCallback: true
    };
    const strat = new Strategy(
      strategyOptions,
      async (
        req: any,
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: any
      ) => {
        try {
          const user: User = await OauthService.createOrFind(profile);
          done(null, user);
        } catch (error: any) {
          done(error, null);
        }
      }
    );

    passport.serializeUser(async (user,done)=>done(null,user.id))

    passport.deserializeUser(async(id:number,done)=> {
      try{
        const user= await OauthService.findById(id)
        
        done(null,user)

      }
      catch(err){
        done(err,null)

      }
    })
    passport.use(strat);
    return passport;
  }
}
