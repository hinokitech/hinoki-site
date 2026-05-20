import type { Metadata } from "next";
import {
  isPitchHubAuthenticated,
  isPitchHubPasswordConfigured,
} from "@/lib/pitch-hub-auth";
import PitchHub from "@/app/pitch/hub/PitchHub";
import PitchHubLogin from "@/app/pitch/hub/PitchHubLogin";

export const metadata: Metadata = {
  title: "Pitch hub",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default async function HubPage() {
  const passwordConfigured = isPitchHubPasswordConfigured();

  if (!passwordConfigured && process.env.NODE_ENV === "production") {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-bg-base px-5">
        <p className="max-w-md text-center text-[15px] leading-[1.6] text-fg-secondary">
          Pitch hub is not configured. Set{" "}
          <code className="font-mono text-[13px] text-fg-primary">
            PITCH_HUB_PASSWORD
          </code>{" "}
          in the deployment environment.
        </p>
      </main>
    );
  }

  const authenticated = await isPitchHubAuthenticated();

  if (!authenticated) {
    return <PitchHubLogin passwordRequired={passwordConfigured} />;
  }

  return <PitchHub passwordConfigured={passwordConfigured} />;
}
