import LandingCard from "@/commons/components/landing-card";
import { siteConfig } from "@/commons/config";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center px-12 pt-36 xs:p-36 space-y-2">
      <LandingCard title={siteConfig.title} desc={siteConfig.desc} />
      <div className="bg-slate-500 font-mono text-sm text-gray-200 p-3 shadow rounded-md flex flex-col">
        <span className="flex flex-col">
          {"Auth/Register is working, via Supabase/Prisma/Iron-Session"}{" "}
          <span>{"- Create/Update Orders in Courier View"}</span>
          <span>{"- View/Recieve Orders in User View"}</span>
        </span>
        <div className="flex flex-col text-gray-300/70">
          <span>{"//note: Registerd User Credentials"} </span>
          <span>{"//email: dinogomez17@noovid.com"} </span>
          <span>{"//pass: power123"}</span>
        </div>
      </div>
    </main>
  );
}
