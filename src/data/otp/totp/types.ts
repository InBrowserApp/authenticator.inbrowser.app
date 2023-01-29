export interface TOTPOptions {
  type: "totp";
  secret: string;
  issuer?: string;
  label?: string;
  algorithm?: string;
  digits?: number;
  period?: number;
}
