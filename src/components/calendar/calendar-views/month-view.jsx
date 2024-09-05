import { useEffect, useState } from "react";
import { format } from "date-fns";
import { generateMonthDates } from "../../../Utils/dateUtils.js";
import {
  generateRandomEventsForMonth,
  addEventsToDays,
} from "../../../Utils/addEventUtils.js";
import { ClockIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useApplicationContext } from "../../../contexts/ApplicationContext.jsx";
import { useCalendarContext } from "../calendar-context.jsx";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Generate random events for August, September, and October 2024
const augustEvents = generateRandomEventsForMonth(2024, 7, 4);
const septemberEvents = generateRandomEventsForMonth(2024, 8, 4);
const octoberEvents = generateRandomEventsForMonth(2024, 9, 4);

const CalendarMonthView = () => {
  const { currentMonth, selectedDate, setSelectedDate, setDays, days } =
    useCalendarContext();

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!currentMonth) {
      setDays(generateMonthDates(new Date()));
    } else {
      setDays(generateMonthDates(currentMonth));
    }
  }, [currentMonth]);

  const selectedDay = days?.find((day) => day.isSelected);

  // Combinining all thee events and add to days
  const allEvents = [...augustEvents, ...septemberEvents, ...octoberEvents];
  const daysWithEvents = addEventsToDays(days, allEvents);

  const handleDateClick = (day) => {
    if (day.events.length > 0) {
      setSelectedDate(day);
      setDrawerOpen(true);
    }
  };

  const handleDoubleClick = (day) => {
    setSelectedDate(day);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const handleEventAction = (day, event) => {
    if (day.events.length > 0) {
      const dayHolder = { ...day, events: [event] };
      setSelectedDate(dayHolder);
      setDrawerOpen(true);
    }
  };

  return (
    <div>
      <div className="lg:flex lg:h-full lg:flex-col">
        <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
          <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
            <div className="bg-white py-2">
              M<span className="sr-only sm:not-sr-only">on</span>
            </div>
            <div className="bg-white py-2">
              T<span className="sr-only sm:not-sr-only">ue</span>
            </div>
            <div className="bg-white py-2">
              W<span className="sr-only sm:not-sr-only">ed</span>
            </div>
            <div className="bg-white py-2">
              T<span className="sr-only sm:not-sr-only">hu</span>
            </div>
            <div className="bg-white py-2">
              F<span className="sr-only sm:not-sr-only">ri</span>
            </div>
            <div className="bg-white py-2">
              S<span className="sr-only sm:not-sr-only">at</span>
            </div>
            <div className="bg-white py-2">
              S<span className="sr-only sm:not-sr-only">un</span>
            </div>
          </div>
          <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
            <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
              {days?.map((day) => (
                <div
                  key={day.date}
                  className={classNames(
                    day.isCurrentMonth
                      ? "bg-white"
                      : "bg-gray-50 text-gray-500",
                    "relative px-3 py-2"
                  )}
                  onDoubleClick={() => handleDoubleClick(day)}
                >
                  <time
                    dateTime={day.date}
                    className={
                      day.isToday
                        ? "flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white"
                        : undefined
                    }
                  >
                    {day.date.split("-").pop().replace(/^0/, "")}
                  </time>
                  {day.events.length > 0 && (
                    <ol className="mt-2">
                      {day.events.slice(0, 2)?.map((event) => (
                        <li
                          onClick={() => handleEventAction(day, event)}
                          key={event.id}
                        >
                          <span
                            onClick={() => handleEventAction(event.id)}
                            className="group flex"
                          >
                            <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                              {event.name}
                            </p>
                            <time
                              dateTime={event.datetime}
                              className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                            >
                              {event.time}
                            </time>
                          </span>
                        </li>
                      ))}
                      {day.events.length > 2 && (
                        <li
                          onClick={() => handleDateClick(day)}
                          className="text-gray-500"
                        >
                          + {day.events.length - 2} more
                        </li>
                      )}
                    </ol>
                  )}
                </div>
              ))}
            </div>
            <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
              {days?.map((day) => (
                <button
                  key={day.date}
                  type="button"
                  className={classNames(
                    day.isCurrentMonth ? "bg-white" : "bg-gray-50",
                    (day.isSelected || day.isToday) && "font-semibold",
                    day.isSelected && "text-white",
                    !day.isSelected && day.isToday && "text-indigo-600",
                    !day.isSelected &&
                      day.isCurrentMonth &&
                      !day.isToday &&
                      "text-gray-900",
                    !day.isSelected &&
                      !day.isCurrentMonth &&
                      !day.isToday &&
                      "text-gray-500",
                    "flex h-14 flex-col px-3 py-2 hover:bg-gray-100 focus:z-10"
                  )}
                >
                  <time
                    dateTime={day.date}
                    className={classNames(
                      day.isSelected &&
                        "flex h-6 w-6 items-center justify-center rounded-full",
                      day.isSelected && day.isToday && "bg-indigo-600",
                      day.isSelected && !day.isToday && "bg-gray-900",
                      "ml-auto"
                    )}
                  >
                    {day.date.split("-").pop().replace(/^0/, "")}
                  </time>
                  <span className="sr-only">{day.events.length} events</span>
                  {day.events.length > 0 && (
                    <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                      {day?.events?.map((event) => (
                        <span
                          key={event.id}
                          className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
                        />
                      ))}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
        {selectedDay?.events.length > 0 && (
          <div className="px-4 py-10 sm:px-6 lg:hidden">
            <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
              {selectedDay?.events?.map((event) => (
                <li
                  key={event.id}
                  className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50"
                >
                  <div className="flex-auto">
                    <p className="font-semibold text-gray-900">{event.name}</p>
                    <time
                      dateTime={event.datetime}
                      className="mt-2 flex items-center text-gray-700"
                    >
                      <ClockIcon
                        className="mr-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      {event.time}
                    </time>
                  </div>
                  <a
                    href={event.href}
                    className="ml-6 flex-none self-center rounded-md bg-white px-3 py-2 font-semibold text-gray-900 opacity-0 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:opacity-100 group-hover:opacity-100"
                  >
                    Edit<span className="sr-only">, {event.name}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        )}

        {drawerOpen && selectedDate && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute inset-0 bg-black opacity-50"
                onClick={closeDrawer}
              />
              <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
                <div className="relative w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1">
                      <div className="bg-indigo-700 py-6 px-4 sm:px-6 relative">
                        <div className="flex items-center justify-between">
                          <h2 className="text-lg font-medium text-white">
                            {format(
                              new Date(selectedDate.date),
                              "MMMM dd, yyyy"
                            )}
                          </h2>
                          <button
                            className="text-indigo-200 hover:text-white absolute right-4 top-4"
                            onClick={closeDrawer}
                          >
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="relative flex-1 py-6 px-4 sm:px-6">
                        <ul className="space-y-4">
                          {selectedDate.events.map((event) => (
                            <li
                              key={event.id}
                              className="bg-gray-100 p-4 rounded-lg shadow"
                            >
                              <h3 className="font-medium text-gray-900">
                                {event.name}
                              </h3>
                              <p className="mt-1 text-gray-500">
                                {event.description}
                              </p>
                              <div className="mt-4 flex items-center">
                                <ClockIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                <time className="ml-2 text-sm text-gray-500">
                                  {event.time}
                                </time>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarMonthView;
