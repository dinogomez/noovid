import CourierNav from "@/commons/components/courier/courier-nav";
import { courierConfig } from "@/commons/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nootrack",
  description: "Shipment Delivery Tracking",
};
const CourierLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full max-w-screen-xl  mx-auto flex-col items-center justify-center ">
      <CourierNav title={courierConfig.title} desc={courierConfig.desc} />
      {children}
    </div>
  );
};

export default CourierLayout;
