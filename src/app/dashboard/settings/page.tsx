import { Metadata } from "next";
import LocationForm from "./location-form";

export const metadata: Metadata = {
  title: "Renta | Settings | Location",
};

const SettingsPage = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Main Content */}
      <div className="flex flex-col gap-4">
        <LocationForm />
      </div>
    </div>
  );
};

export default SettingsPage;
