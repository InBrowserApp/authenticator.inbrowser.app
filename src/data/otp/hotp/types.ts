export interface HOTPOptions {
  type: "hotp";
  secret: string;
  issuer?: string;
  label?: string;
  algorithm?: "SHA1" | "SHA256" | "SHA512";
  digits?: 6 | 8;
  counter: number;
}
