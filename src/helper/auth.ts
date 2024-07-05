//TODO check udacity

import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

dotenv.config();

export class AuthenticationHelper {
  static saltRounds: string = process.env.SALT_ROUNDS || "0";
  static pepper: string = process.env.BCRYPT_PASSWORD || "";
  static tokenSecret: string = process.env.TOKEN_SECRET || "";

  static generateToken(id: number): string {
    return jwt.sign({ id }, String(this.tokenSecret));
  }

  static decodeToken(token: string): User {
    return jwt.decode(token) as User;
  }

  static hashedPassword(password: string): string {
    return bcrypt.hashSync(password + this.pepper, Number(this.saltRounds));
  }

  static verifyPassword(
    userPasswordFromDB: string,
    providedPassword: string
  ): boolean {
    return bcrypt.compareSync(
      providedPassword + this.pepper,
      userPasswordFromDB
    );
  }

  static verifyToken(token: string): boolean {
    const payload = jwt.verify(token, String(this.tokenSecret));
    if (!payload) return false;
    return true;
  }
}
