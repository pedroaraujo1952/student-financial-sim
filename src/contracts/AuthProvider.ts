export abstract class AuthProvider {
  abstract generateToken(userId: number): string;

  // abstract getUser(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<interfaces.Principal>;
}
