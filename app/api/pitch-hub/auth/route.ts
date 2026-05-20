import { NextResponse } from "next/server";
import {
  getExpectedHubToken,
  isPitchHubPasswordConfigured,
  PITCH_HUB_COOKIE,
  verifyPitchHubPassword,
} from "@/lib/pitch-hub-auth";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function POST(request: Request) {
  if (!isPitchHubPasswordConfigured()) {
    return NextResponse.json(
      { error: "Hub password is not configured on the server." },
      { status: 503 },
    );
  }

  let password = "";
  try {
    const body = (await request.json()) as { password?: string };
    password = body.password ?? "";
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!verifyPitchHubPassword(password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const token = getExpectedHubToken();
  if (!token) {
    return NextResponse.json({ error: "Auth misconfigured." }, { status: 503 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(PITCH_HUB_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(PITCH_HUB_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
