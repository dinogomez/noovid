import LandingCard from "@/commons/components/landing-card";
import { siteConfig } from "@/commons/config";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center px-12 pt-36 xs:p-36">
      <LandingCard title={siteConfig.title} desc={siteConfig.desc} />
    </main>
  );
}
