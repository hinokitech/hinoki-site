import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const PITCH_HUB_COOKIE = "pitch-hub-auth";

export function pitchHubAuthToken(password: string): string {
  return createHash("sha256")
    .update(`hinoki-pitch-hub:${password}`)
    .digest("hex");
}

export function getExpectedHubToken(): string | null {
  const password = process.env.PITCH_HUB_PASSWORD;
  if (!password) return null;
  return pitchHubAuthToken(password);
}

function tokensMatch(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a, "hex");
    const bufB = Buffer.from(b, "hex");
    if (bufA.length !== bufB.length) return false;
    return timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

export function verifyPitchHubPassword(password: string): boolean {
  const expected = getExpectedHubToken();
  if (!expected) return false;
  return tokensMatch(pitchHubAuthToken(password), expected);
}

export async function isPitchHubAuthenticated(): Promise<boolean> {
  const expected = getExpectedHubToken();
  if (!expected) {
    return process.env.NODE_ENV === "development";
  }
  const cookieStore = await cookies();
  const token = cookieStore.get(PITCH_HUB_COOKIE)?.value;
  if (!token) return false;
  return tokensMatch(token, expected);
}

export function isPitchHubPasswordConfigured(): boolean {
  return Boolean(process.env.PITCH_HUB_PASSWORD);
}
