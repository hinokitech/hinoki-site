import { redirect } from "next/navigation";

/** Bookmarks — canonical PDF is `/pitch/pdf` */
export default function PitchPreSeedPdfRedirectPage() {
  redirect("/pitch/pdf");
}
