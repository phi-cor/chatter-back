import { promises } from "fs";
import UserRepository from "@repository/UserRepository";
import User from "@models/User";
import Profile from "@models/Profile";

interface OauthParams {
  client_id: string;
  client_secret: string;
  redirect_uri: string;
  authentication_url: string;
  grant_type: string;
}

export default class OauthService {
  static async findById(id: number):Promise<User> {
try{
  const users = await UserRepository.findById(id)
  return users[0]
}
catch(err){
  throw err
}
  }
  private static params: OauthParams;

  static async createOrFind(profile: Profile): Promise<User> {
    try {
      return await UserRepository.findOrCreate(profile);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  static async getAuthenticationOptions() {
    await OauthService.setIDPData("google");

    const { client_id, client_secret, redirect_uri, grant_type } =
      OauthService.params;
    return { client_id, client_secret, redirect_uri, grant_type };
  }

  static async setIDPData(idpName: string) {
    console.log("setIDP");

    const idpFilePath = `idp/${idpName}.json`;
    try {
      const params = await promises.readFile(idpFilePath, {
        encoding: "utf8",
      });
      OauthService.params = JSON.parse(params);
      return JSON.parse(params);
    } catch (error: any) {
      console.log(error);
    }
  }
}
