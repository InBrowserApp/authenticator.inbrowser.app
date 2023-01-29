export interface HOTPOptions {
  type: "hotp";
  secret: string;
  issuer?: string;
  label?: string;
  algorithm?: string;
  digits?: number;
  counter: number;
}
