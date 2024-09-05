import React, { useState } from "react";
import ScheduleList from "./widgets/schedule-list";
import ScheduleSideBar from "./schedule-side-bar";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import AppDrawer from "../private-page/drawer";
import AppModal from "../private-page/modal";
import { useScheduleContext } from "./schedule-context";
import ScheduleHeader from "./calendar-header";

export default function ScheduleBody() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { modalDetail, drawerTitle } = useScheduleContext();

  return (
    <div className="flex">
      {/* Sidebar on the left side */}
      <div
        className={`fixed inset-0 z-40 flex-shrink-0 w-45 lg:static lg:w-1/4 lg:block ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        <ScheduleSideBar />

        {/* Close button for the sidebar in mobile view */}
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 p-2 text-gray-700 lg:hidden"
        >
          <XMarkIcon aria-hidden="true" className="h-6 w-6" />
        </button>
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-grow">
        {/* <ScheduleHeader /> */}
        <ScheduleList />
      </div>

      {/* Hamburger button for opening the sidebar in mobile view */}
      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="fixed bottom-4 right-4 p-2.5 text-gray-700 bg-white rounded-full shadow-lg lg:hidden"
      >
        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
      </button>
      <AppDrawer title={drawerTitle}>{"Hello"}</AppDrawer>
      <AppModal title={modalDetail?.title}>{modalDetail?.component}</AppModal>
    </div>
  );
}
