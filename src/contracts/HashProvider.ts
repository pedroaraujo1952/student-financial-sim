export abstract class HashProvider {
  abstract encrypt(data: string, saltRounds?: number): string;
  abstract compare(data: string, encryptedData: string): boolean;
}

export const HashProviderToken = Symbol.for("HashProvider");
