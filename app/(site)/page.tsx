import { Application } from "@/components/site/Application";
import { Contact } from "@/components/site/Contact";
import { EventCameraPanel } from "@/components/site/EventCameraPanel";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Problem } from "@/components/site/Problem";
import { Progress } from "@/components/site/Progress";
import { Proof } from "@/components/site/Proof";
import { siteCopy as copy } from "@/content/site.en";

export default function Home() {
  return (
    <>
      <Header nav={copy.nav} />
      <main>
        <Hero copy={copy.hero} />
        <EventCameraPanel copy={copy.hero} />
        <Problem copy={copy.problem} />
        <HowItWorks copy={copy.how} />
        <Proof copy={copy.proof} />
        <Application copy={copy.application} />
        <Progress copy={copy.progress} />
        <Contact copy={copy.contact} />
      </main>
      <Footer nav={copy.nav} small={copy.footer} />
    </>
  );
}
