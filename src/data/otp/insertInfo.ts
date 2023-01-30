import type { OTPInfo } from "./types";

export function insertInfo(info: OTPInfo) {
  localStorage.setItem(
    `authenticator:otp:item:${info.id}`,
    JSON.stringify(info)
  );

  return;
}
