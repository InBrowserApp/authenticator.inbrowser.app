import { migration } from "@/proto/migration.proto.js";
import { extractData } from "./extractData";
import { payloadToOptions } from "./payloadToOptions";

export async function parseURI(uri: string) {
  const data = await extractData(uri);
  const payload = migration.Payload.decode(data);
  return payloadToOptions(payload.otpParameters);
}
