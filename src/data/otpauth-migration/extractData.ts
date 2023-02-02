export async function extractData(uri: string): Promise<Uint8Array> {
  const url = new URL(uri);
  if (url.protocol !== "otpauth-migration:") {
    throw new Error("Invalid protocol");
  }

  if (url.pathname !== "//offline") {
    throw new Error("Invalid path");
  }

  const parsed = url.searchParams;
  const base64 = parsed.get("data");
  const type = "application/protobuf";
  const response = await fetch(`data:${type};base64,${base64}`);
  const buffer = await response.arrayBuffer();
  const uint8 = new Uint8Array(buffer);
  return uint8;
}
