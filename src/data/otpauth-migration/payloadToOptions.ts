import { migration } from "@/proto/migration.proto.js";

export function payloadToOptions(payloads: migration.Payload.IOtpParameters[]) {
  const options = payloads.map((payload) => ({
    type: parseType(payload),
    label: parseName(payload),
    issuer: parseIssuer(payload),
    algorithm: parseAlgorithm(payload),
    digits: parseDigits(payload),
    secret: parseSecret(payload),
    counter: parseCounter(payload),
  }));

  return options;
}

function parseType(payload: migration.Payload.IOtpParameters): "totp" | "hotp" {
  if (payload.type === migration.Payload.OtpType.OTP_TYPE_HOTP) {
    return "hotp";
  }

  if (payload.type === migration.Payload.OtpType.OTP_TYPE_TOTP) {
    return "totp";
  }

  throw new Error("Unknown type");
}

function parseName(payload: migration.Payload.IOtpParameters) {
  if (payload.name) {
    return payload.name;
  } else {
    return "";
  }
}

function parseIssuer(payload: migration.Payload.IOtpParameters) {
  if (payload.issuer) {
    return payload.issuer;
  } else {
    return "";
  }
}

function parseAlgorithm(payload: migration.Payload.IOtpParameters) {
  if (payload.algorithm === migration.Payload.Algorithm.ALGORITHM_SHA1) {
    return "SHA1";
  }

  if (payload.algorithm === migration.Payload.Algorithm.ALGORITHM_SHA256) {
    return "SHA256";
  }

  if (payload.algorithm === migration.Payload.Algorithm.ALGORITHM_SHA512) {
    return "SHA512";
  }

  if (payload.algorithm === migration.Payload.Algorithm.ALGORITHM_MD5) {
    return "MD5";
  }

  throw new Error("Unknown algorithm");
}

function parseDigits(payload: migration.Payload.IOtpParameters) {
  if (payload.digits === migration.Payload.DigitCount.DIGIT_COUNT_SIX) {
    return 6;
  }

  if (payload.digits === migration.Payload.DigitCount.DIGIT_COUNT_EIGHT) {
    return 8;
  }

  throw new Error("Unknown digits");
}

function parseCounter(payload: migration.Payload.IOtpParameters) {
  if (typeof payload.counter === "number") {
    return payload.counter;
  } else if (payload.counter === undefined || payload.counter === null) {
    return 0;
  } else {
    return payload.counter.toNumber();
  }
}

function parseSecret(payload: migration.Payload.IOtpParameters) {
  // base32
  if (payload.secret) {
    return base32Encode(payload.secret);
  } else {
    throw new Error("Missing secret");
  }
}

const base32Encode = (data: Uint8Array) => {
  const base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let base32 = "";

  let i = 0;
  let value = 0;
  let digit = 0;
  while (i < data.length) {
    value = (value << 8) | data[i++];
    digit += 8;
    while (digit >= 5) {
      base32 += base32chars[(value >>> (digit - 5)) & 31];
      digit -= 5;
    }
  }

  if (digit > 0) {
    base32 += base32chars[(value << (5 - digit)) & 31];
  }

  return base32;
};
