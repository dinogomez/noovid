import UserNav from "@/commons/components/dashboard/user-nav";
import { getSession } from "@/commons/lib/actions/auth";
import { SessionData } from "@/commons/lib/session";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Noovid",
  description: "Track User Shipment",
};
const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  const user: SessionData = {
    username: session.username,
    email: session.email,
    isLoggedIn: session.isLoggedIn,
  };

  return (
    <div className="flex h-full max-w-screen-xl  mx-auto flex-col items-center justify-center ">
      <UserNav title="Noovid" desc="User Service" user={user} />
      {children}
    </div>
  );
};

export default DashboardLayout;
