import { injectable } from "inversify";
import bcrypt from "bcrypt";
import { HashProvider } from "../../../../contracts/HashProvider";

@injectable()
export class BcryptProvider implements HashProvider {
  private readonly DEFAULT_ROUNDS = 10;

  encrypt(text: string, saltRounds = this.DEFAULT_ROUNDS): string {
    const hash = bcrypt.hashSync(text, saltRounds);

    return hash;
  }

  compare(hashedText: string, text: string): boolean {
    return bcrypt.compareSync(text, hashedText);
  }
}
