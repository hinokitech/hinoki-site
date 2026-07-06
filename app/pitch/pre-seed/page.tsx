import { redirect } from "next/navigation";

/** Bookmarks — canonical English deck is `/pitch` */
export default function PitchPreSeedRedirectPage() {
  redirect("/pitch");
}
