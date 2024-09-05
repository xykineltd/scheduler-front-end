import React from "react";
import { useScheduleContext } from "./schedule-context";

export default function ScheduleHeader() {
  const { handleModal } = useScheduleContext();
  return (
    <div className="lg:flex lg:h-full lg:flex-col">
      <header className="flex items-center justify-end border-b border-gray-200 px-6 py-4 lg:flex-none">
        <div className="flex items-center">
          <div className="hidden md:ml-4 md:flex md:items-center">
            <button
              onClick={() => handleModal("addSchedule")}
              type="button"
              className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create intenary
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
