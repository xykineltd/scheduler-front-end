import React, { useContext, useState, useEffect, useMemo } from "react";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isToday, isSameMonth, parseISO } from "date-fns";
import { useCalendarContext } from "../calendar-context.jsx";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  ClockIcon,
} from "@heroicons/react/20/solid";

// Pool of events to randomly select from
const eventPool = [
  {
    title: "Breakfast",
    time: "6:00 AM",
    description: "Enjoy a hearty breakfast to start the day!",
  },
  {
    title: "Flight to Paris",
    time: "7:30 AM",
    description: "Catch the flight to Paris for a business trip.",
  },
  {
    title: "Sightseeing at The Eiffel Tower",
    time: "11:00 AM",
    description: "Let us go have fun at the Eiffel Tower.",
  },
  {
    title: "Lunch Meeting",
    time: "1:00 PM",
    description: "Business lunch with the team.",
  },
  {
    title: "Workout",
    time: "6:00 PM",
    description: "An evening workout session.",
  },
];

// Function to generate random events with a max of 2 per month
const generateRandomEvents = (months) => {
  const events = [];

  months.forEach((month) => {
    const availableDays = month.days.filter((day) => day.isCurrentMonth);
    const eventCount = Math.floor(Math.random() * 3); // 0, 1, or 2 events per month

    for (let i = 0; i < eventCount; i++) {
      const randomDayIndex = Math.floor(Math.random() * availableDays.length);
      const randomDay = availableDays[randomDayIndex];
      const randomEvent = eventPool[Math.floor(Math.random() * eventPool.length)];

      events.push({
        date: randomDay.date,
        ...randomEvent,
      });

      availableDays.splice(randomDayIndex, 1);
    }
  });

  return events;
};

// Generates the structure for the year calendar
const generateYearCalendar = (year) => {
  const months = [];
  for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
    const start = startOfMonth(new Date(year, monthIndex));
    const end = endOfMonth(start);
    const startDate = startOfWeek(start, { weekStartsOn: 1 });
    const endDate = endOfWeek(end, { weekStartsOn: 1 });

    const days = eachDayOfInterval({ start: startDate, end: endDate }).map(
      (date) => ({
        date: format(date, "yyyy-MM-dd"),
        isCurrentMonth: isSameMonth(date, start),
        isToday: isToday(date),
      })
    );

    months.push({
      name: format(start, "MMMM"),
      days: days,
    });
  }
  return months;
};

// Classnames utility
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CalendarYearView() {
  const { currentDate, setCurrentDate, selectedDate, setSelectedDate } = useCalendarContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const selectedYear = currentDate.getFullYear();
  const months = generateYearCalendar(selectedYear);
  const events = useMemo(() => generateRandomEvents(months), [months]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const eventsForDay = (date) => {
    return events.filter((event) => event.date === date);
  };

  const handleDateClick = (date) => {
    const eventForDate = eventsForDay(date);
    if (eventForDate.length) {
      handleEventClick(eventForDate[0]);
    }
    setSelectedDate(date);
  };

  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-x-8 gap-y-16 px-4 py-4 sm:grid-cols-2 sm:px-2 xl:max-w-none xl:grid-cols-3 xl:px-8 2xl:grid-cols-4">
          {months.map((month) => (
            <section key={month.name} className="text-center">
              <h2 className="text-sm font-semibold text-gray-900">{month.name}</h2>
              <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
                <div>S</div>
              </div>
              <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
                {month.days.map((day, dayIdx) => {
                  const dayEvents = eventsForDay(day.date);
                  return (
                    <button
                      key={day.date}
                      type="button"
                      onClick={() => handleDateClick(day.date)}
                      className={classNames(
                        day.isCurrentMonth ? "bg-white text-gray-900" : "bg-gray-50 text-gray-400",
                        dayEvents.length > 0 && "bg-green-200",
                        dayIdx === 0 && "rounded-tl-lg",
                        dayIdx === 6 && "rounded-tr-lg",
                        dayIdx === month.days.length - 7 && "rounded-bl-lg",
                        dayIdx === month.days.length - 1 && "rounded-br-lg",
                        "py-1.5 hover:bg-gray-100 focus:z-10"
                      )}
                    >
                      <time
                        dateTime={day.date}
                        className={classNames(
                          day.isToday && "bg-indigo-600 font-semibold text-white",
                          selectedDate === day.date && "bg-black text-white",
                          "mx-auto flex h-7 w-7 items-center justify-center rounded-full"
                        )}
                      >
                        {parseISO(day.date).getDate()}
                      </time>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Modal for displaying event details */}
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
                      {/* Add any other content here */}
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
