"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const Map = dynamic(() => import("./map"), {
  ssr: false,
});

const SettingsPage = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Main Content */}
      <div className="flex flex-1 flex-col gap-4">
        <Suspense fallback={"Loading Map..."}>
          <Map />
        </Suspense>
      </div>
    </div>
  );
};

export default SettingsPage;
