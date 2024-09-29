"use client";

import { Menu, MenuButton, MenuItem, MenuItems, Transition  } from "@headlessui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  ClockIcon,
} from "@heroicons/react/20/solid";
import {  useEffect, useRef, useState } from "react";
import {
  format,
  startOfMonth,
  getDaysInMonth,
  addDays,
  subDays,
  endOfMonth,
  isToday,
  isSameDay,
  startOfWeek,
  endOfWeek,
  addMonths, 
  subMonths,  
} from "date-fns";
import { useCalendarContext } from "../calendar-context.jsx";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CalendarDayView() {
  const container = useRef(null);
  const containerNav = useRef(null);
  const containerOffset = useRef(null);

  const { currentDate, selectedDate, setSelectedDate, setCurrentDate } = useCalendarContext();  
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    // Set the container scroll position based on the current time.
    const currentMinute = new Date().getHours() * 60;
    container.current.scrollTop =
      ((container.current.scrollHeight -
        containerNav.current.offsetHeight -
        containerOffset.current.offsetHeight) *
        currentMinute) /
      1440;
  }, []);

  // Function to generate all days for the calendar, including previous and next month's days
const generateDaysInMonth = (date) => {
  const days = [];
  const startDay = startOfMonth(date);
  const endDay = endOfMonth(date);
 
  const firstDayOfWeek = startOfWeek(startDay);
  const lastDayOfWeek = endOfWeek(endDay);
  // Fill the days from the previous month
  let currentDay = firstDayOfWeek;
  while (currentDay <= lastDayOfWeek) {
    days.push({
      date: currentDay,
      isToday: isToday(currentDay),
      isSelected: isSameDay(currentDay, selectedDate),
      isCurrentMonth: currentDay.getMonth() === date.getMonth(),
    });
    currentDay = addDays(currentDay, 1);
  }
  return days;
};
  const days = generateDaysInMonth(currentDate); 
  const handlePreviousMonth = () => {
    const newDate = subMonths(currentDate, 1);
    console.log("Navigating to previous month:", newDate); 
    setCurrentDate(newDate);
  };
  const handleNextMonth = () => {
    const newDate = addMonths(currentDate, 1);
    console.log("Navigating to next month:", newDate); 
    setCurrentDate(newDate);
  };
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };
  const handleDayClick = (day) => {
    setSelectedDate(day.date); 
  };

  return (
    <div className="flex h-full flex-col">
      <div className="isolate flex flex-auto overflow-hidden bg-white">
        <div ref={container} className="flex flex-auto flex-col overflow-auto">
          <div
            ref={containerNav}
            className="sticky top-0 z-10 grid flex-none grid-cols-7 bg-white text-xs text-gray-500 shadow ring-1 ring-black ring-opacity-5 md:hidden"
          >
            {/* Rendering weekday headers with dynamic classes */}
           {["W", "T", "F", "S", "S", "M", "T"].map((dayLabel, index) => (
              <button
                key={index}
                type="button"
                className="flex flex-col items-center pb-1.5 pt-3"
              >
                <span>{dayLabel}</span>
                <span
                  className={classNames(
                    "mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold",
                    index === 1 ? "text-indigo-600" : "text-gray-900",
                    index === 3 && "bg-gray-900 text-white"
                  )}
                >
                  {19 + index}
                </span>
              </button>
            ))} 
          </div>
          
          <div className="flex w-full flex-auto">
            <div className="w-14 flex-none bg-white ring-1 ring-gray-100" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines */}
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                style={{ gridTemplateRows: "repeat(48, minmax(3.5rem, 1fr))" }}
              >
                <div ref={containerOffset} className="row-end-1 h-7"></div>
                {/* Times */}
                {Array.from({ length: 24 }, (_, i) => (
                  <div key={i}>
                    <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      {i % 12 === 0 ? '12AM' : `${i % 12} ${i < 12 ? 'AM' : 'PM'}`}
                    </div>
                    </div>
                   ))}
                   </div>

              {/* Events */}
              <ol
                className="col-start-1 col-end-2 row-start-1 grid grid-cols-1"
                style={{
                  gridTemplateRows: "1.75rem repeat(288, minmax(0, 1fr)) auto",
                }}
              >
                <li
                  className="relative mt-px flex"
                  style={{ gridRow: "74 / span 12" }}
                >
                  <a
                    className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100"
                     onClick={() => handleEventClick({ title: 'Breakfast', time: '6:00 AM', description: 'Enjoy a hearty breakfast to start the day!' })}
                  >
                    <p className="order-1 font-semibold text-blue-700">
                      Breakfast
                    </p>
                    <p className="text-blue-500 group-hover:text-blue-700">
                      <time dateTime="2022-01-22T06:00">6:00 AM</time>
                    </p>
                  </a>
                </li>
                <li
                  className="relative mt-px flex"
                  style={{ gridRow: "92 / span 30" }}
                >
                  <a
                    
                    className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs leading-5 hover:bg-pink-100"
                    onClick={() => handleEventClick({ title: 'Flight to Paris', time: '7:30 AM', description: 'Catch the flight to Paris for a business trip.' })}
                  >
                    <p className="order-1 font-semibold text-pink-700">
                      Flight to Paris
                    </p>
                    <p className="order-1 text-pink-500 group-hover:text-pink-700">
                      John F. Kennedy International Airport
                    </p>
                    <p className="text-pink-500 group-hover:text-pink-700">
                      <time dateTime="2022-01-22T07:30">7:30 AM</time>
                    </p>
                  </a>
                </li>
                <li
                  className="relative mt-px flex"
                  style={{ gridRow: "134 / span 18" }}
                >
                  <a
                  
                    className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-indigo-50 p-2 text-xs leading-5 hover:bg-indigo-100"
                    onClick={() => handleEventClick({ title: 'Sight Seeing at The Eiffel Tower', time: '11:00 AM', description: 'Let us go have fun at the Eiffel Tower.' })}
                  >
                    <p className="order-1 font-semibold text-indigo-700">
                      Sightseeing
                    </p>
                    <p className="order-1 text-indigo-500 group-hover:text-indigo-700">
                      Eiffel Tower
                    </p>
                    <p className="text-indigo-500 group-hover:text-indigo-700">
                      <time dateTime="2022-01-22T11:00">11:00 AM</time>
                    </p>
                  </a>
                </li>
              </ol>
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
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


        <div className="hidden w-1/2 max-w-md flex-none border-l border-gray-100 px-8 py-10 md:block">
          <div className="flex items-center text-center text-gray-900">
          <button type="button" className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500" onClick={handlePreviousMonth}>
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="flex-auto text-sm font-semibold">{format(currentDate, 'MMMM yyyy')}</div>
            <button type="button" className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500" onClick={handleNextMonth}>
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
            <div>S</div>
          </div>
          <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
            {days.map((day, dayIdx) => (
              <button
                key={day.date}
                type="button"
                className={classNames(
                  "py-1.5 hover:bg-gray-100 focus:z-10",
                  day.isCurrentMonth ? "bg-white" : "bg-gray-50",
                  (day.isSelected || day.isToday) && "font-semibold",
                  day.isSelected && "text-white",
                  !day.isSelected &&
                    day.isCurrentMonth &&
                    !day.isToday &&
                    "text-gray-900",
                    !day.isSelected &&
                    !day.isCurrentMonth &&
                    !day.isToday &&
                    "text-gray-400",
                    day.isToday && !day.isSelected && "text-indigo-600",
                    dayIdx === 0 && "rounded-tl-lg",
                    dayIdx === 6 && "rounded-tr-lg",
                    dayIdx === days.length - 7 && "rounded-bl-lg",
                    dayIdx === days.length - 1 && "rounded-br-lg"
                     )}
                    onClick={() => handleDayClick(day)} 
                     >
                    <time
                  dateTime={day.date}
                  className={classNames(
                    "mx-auto flex h-7 w-7 items-center justify-center rounded-full",
                    day.isSelected && day.isToday && "bg-indigo-600",
                    day.isSelected && !day.isToday && "bg-gray-900"
                  )}
                >
                  {format(day.date, 'd')}
                </time>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
