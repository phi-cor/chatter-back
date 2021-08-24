import User from "@models/User";
import { Repository, getRepository } from "typeorm";
import Profile from "@models/Profile";
export default class UserRepository {
  private static instance: Repository<User>;

  static async findOrCreate(profile:Profile): Promise<User> {
    let user = await UserRepository.findByMail(profile.email);
    if (user.length === 0)
      return UserRepository.createUser({
        name:profile.displayName,
        email: profile.email,
        photo: profile.picture,
      });
    return user[0];
  }
  static async findByMail(email: string):Promise<User[]> {
    return getRepository<User>("User", "AppConnection").find({
      email: email
    });
  }
  static async findById(id: number):Promise<User[]> {
    return getRepository<User>("User", "AppConnection").find({
      id: id
    });
  }
  static async createUser(userInfo: { name:string ,email: string; photo: string }) {
    const user = getRepository<User>("User", "AppConnection").create(userInfo);
    await getRepository<User>("User", "AppConnection").insert(user);
    return user;
  }
}
