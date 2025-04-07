import { injectable } from "inversify";
import jwt from "jsonwebtoken";
import { AuthProvider } from "../../../../contracts/AuthProvider";

@injectable()
export class JwtProvider implements AuthProvider {
  private readonly DEFAULT_EXPIRATION_TIME = "5m";
  private readonly authSecret;

  constructor() {
    this.authSecret = process.env.AUTH_SECRET || "";
  }

  generateToken(userId: number): string {
    const token = jwt.sign({ data: { userId } }, this.authSecret, {
      expiresIn: this.DEFAULT_EXPIRATION_TIME,
    });

    return token;
  }

  verifyToken(userId: number, token: string): boolean {
    const decoded = jwt.verify(token, this.authSecret);

    console.log(decoded);

    return true;
  }
}
