import { redirect } from "next/navigation";

/** Bookmarks — canonical hub is `/hub` */
export default function PitchHubRedirectPage() {
  redirect("/hub");
}
