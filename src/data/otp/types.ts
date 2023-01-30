import type { TOTPOptions } from "./totp";
import type { HOTPOptions } from "./hotp";

export type OTPOptions = TOTPOptions | HOTPOptions;

export interface OTPInfo {
  id: string;
  options: OTPOptions;
}
