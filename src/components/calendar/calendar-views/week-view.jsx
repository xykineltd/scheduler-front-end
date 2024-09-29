"use client";

import { useEffect, useRef, useState } from "react";
import { format, startOfWeek, addDays, isToday } from "date-fns";
import { ClockIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useCalendarContext } from "../calendar-context.jsx";

export default function CalendarWeekView() {
  const container = useRef(null);
  const containerNav = useRef(null);
  const containerOffset = useRef(null);

  const { currentDate } = useCalendarContext();
  const [weekDays, setWeekDays] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    generateWeekDays(currentDate);
  }, [currentDate]);

  const generateWeekDays = (startDate) => {
    const startOfWeekDate = startOfWeek(startDate, { weekStartsOn: 1 });
    const days = Array.from({ length: 7 }, (_, i) =>
      addDays(startOfWeekDate, i)
    );
    setWeekDays(days);

    const today = new Date();
    const currentMinute = today.getHours() * 60 + today.getMinutes();
    container.current.scrollTop =
      ((container.current.scrollHeight -
        containerNav.current.offsetHeight -
        containerOffset.current.offsetHeight) *
        currentMinute) /
      1440;
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="flex h-full flex-col">
      <div
        ref={container}
        className="isolate flex flex-auto flex-col overflow-auto bg-white"
      >
        <div
          style={{ width: "165%" }}
          className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
        >
          <div
            ref={containerNav}
            className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
          >
            {/* Weekday Headers */}
            <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
              <div className="col-end-1 w-14" />
              {weekDays.map((date, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center py-3"
                >
                  <span className="flex items-center">
                  <span className="mr-1 text-gray-500">{format(date, 'EEE')}</span>
                    <span
                      className={`font-semibold ${isToday(date) ? 'text-indigo-600' : 'text-gray-900'}`}
                    >
                      {/* Add circle around current day */}
                      <span
                        className={`${
                          isToday(date)
                            ? "bg-indigo-600 text-white rounded-full w-5 h-5 flex items-center justify-center"
                            : ""
                        }`}
                      >
                        {format(date, "d")}
                      </span>
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-auto">
            <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                style={{ gridTemplateRows: "repeat(48, minmax(3.5rem, 1fr))" }}
              >
                <div ref={containerOffset} className="row-end-1 h-7"></div>
                {/* Times */}
                {Array.from({ length: 24 }, (_, i) => (
                  <div key={i}>
                    <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      {i % 12 === 0
                        ? "12AM"
                        : `${i % 12} ${i < 12 ? "AM" : "PM"}`}
                    </div>
                  </div>
                ))}
              </div>
              <ol
                className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
                style={{
                  gridTemplateRows: "1.75rem repeat(288, minmax(0, 1fr)) auto",
                }}
              >
                <li
                  className="relative mt-px flex sm:col-start-3"
                  style={{ gridRow: "74 / span 12" }}
                >
                  <a
                    href="#"
                    className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100"
                    onClick={() =>
                      handleEventClick({
                        title: "Breakfast",
                        time: "6:00 AM",
                        description:
                          "Enjoy a hearty breakfast to start the day!",
                      })
                    }
                  >
                    <p className="order-1 font-semibold text-blue-700">
                      Breakfast
                    </p>
                    <p className="text-blue-500 group-hover:text-blue-700">
                      <time dateTime="2022-01-12T06:00">6:00 AM</time>
                    </p>
                  </a>
                </li>
                <li
                  className="relative mt-px flex sm:col-start-3"
                  style={{ gridRow: "92 / span 30" }}
                >
                  <a
                    href="#"
                    className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs leading-5 hover:bg-pink-100"
                    onClick={() =>
                      handleEventClick({
                        title: "Flight to Paris",
                        time: "7:30 AM",
                        description:
                          "Catch the flight to Paris for a business trip.",
                      })
                    }
                  >
                    <p className="order-1 font-semibold text-pink-700">
                      Flight to Paris
                    </p>
                    <p className="text-pink-500 group-hover:text-pink-700">
                      <time dateTime="2022-01-12T07:30">7:30 AM</time>
                    </p>
                  </a>
                </li>
                <li
                  className="relative mt-px hidden sm:col-start-6 sm:flex"
                  style={{ gridRow: "122 / span 24" }}
                >
                  <a
                    href="#"
                    className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-gray-100 p-2 text-xs leading-5 hover:bg-gray-200"
                    onClick={() =>
                      handleEventClick({
                        title: "Meeting with design team at Disney",
                        time: "10:00 AM",
                        description:
                          "Discussion on the upcoming project at Disney.",
                      })
                    }
                  >
                    <p className="order-1 font-semibold text-gray-700">
                      Meeting with design team at Disney
                    </p>
                    <p className="text-gray-500 group-hover:text-gray-700">
                      <time dateTime="2022-01-15T10:00">10:00 AM</time>
                    </p>
                  </a>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 bg-black opacity-50"
              onClick={handleCloseModal}
            />
            <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
              <div className="relative w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="bg-indigo-700 py-6 px-4 sm:px-6 relative">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-medium text-white">
                        {selectedEvent.title}
                      </h2>
                      <button
                        className="text-indigo-200 hover:text-white absolute right-4 top-4"
                        onClick={handleCloseModal}
                      >
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="relative flex-1 py-6 px-4 sm:px-6">
                  <div className="bg-gray-100 p-4 rounded-lg shadow">
                    <p className="text-gray-700">{selectedEvent.description}</p>
                    <div className="mt-4 flex items-center">
                      <ClockIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <time className="ml-2 text-sm text-gray-500">
                        {selectedEvent.time}
                      </time>
                    </div>
                    {/* Add any other content here */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}
