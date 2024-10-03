import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
import {
  format,
  addMonths,
  subMonths,
  addDays,
  subDays,
  addWeeks,
  subWeeks,
  addYears,
  subYears,
  isValid,
} from "date-fns";
import { useCalendarContext } from "./calendar-context";

const calendarViewMenu = [
  { label: "Day view", value: "day" },
  { label: "Week view", value: "week" },
  { label: "Month view", value: "month" },
  { label: "Year view", value: "year" },
];

const getCalendarViewLabel = (x = "month") => {
  return calendarViewMenu.find(({ value }) => value === x)?.label;
};

export default function CalendarHeader() {
  const {
    calendarView,
    setCalendarView,
    currentDate,
    setCurrentDate,
    currentMonth,
    setCurrentMonth,
  } = useCalendarContext();

  const validCurrentDate =
    currentDate && isValid(currentDate) ? currentDate : new Date();

  const validCurrentMonth =
    currentMonth && isValid(currentMonth) ? currentMonth : new Date();

  const formattedDisplay = () => {
    switch (calendarView) {
      case "month":
        return format(validCurrentMonth, "MMMM yyyy");
      case "week":
        return `Week ${Math.ceil(validCurrentDate.getDate() / 7)} of ${format(validCurrentDate, "MMMM yyyy")}`;
      case "day":
        return format(validCurrentDate, "EEEE, MMMM d, yyyy");
      case "year":
        return format(validCurrentDate, "yyyy"); // Display only the year in "Year View"
      default:
        return "";
    }
  };

  const handlePrev = () => {
    switch (calendarView) {
      case "month":
        setCurrentMonth(subMonths(validCurrentMonth, 1));
        break;
      case "week":
        setCurrentDate(subWeeks(validCurrentDate, 1));
        break;
      case "day":
        setCurrentDate(subDays(validCurrentDate, 1));
        break;
      case "year":
        // Move back by one year
        setCurrentDate(subYears(validCurrentDate, 1)); // Now updating the year view properly
        break;
      default:
        break;
    }
  };

  const handleNext = () => {
    switch (calendarView) {
      case "month":
        setCurrentMonth(addMonths(validCurrentMonth, 1));
        break;
      case "week":
        setCurrentDate(addWeeks(validCurrentDate, 1));
        break;
      case "day":
        setCurrentDate(addDays(validCurrentDate, 1));
        break;
      case "year":
        // Move forward by one year
        setCurrentDate(addYears(validCurrentDate, 1)); // Now updating the year view properly
        break;
      default:
        break;
    }
  };

  return (
    <div className="lg:flex lg:h-full lg:flex-col">
      <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
        <h1 className="text-base font-semibold leading-6 text-gray-900">
          <time>{formattedDisplay()}</time>
        </h1>
        <div className="flex items-center">
          <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
            <button
              type="button"
              className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
              onClick={handlePrev}
            >
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
            >
              {formattedDisplay()}
            </button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button
              type="button"
              className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
              onClick={handleNext}
            >
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden md:ml-4 md:flex md:items-center">
            <Menu as="div" className="relative">
              <MenuButton
                type="button"
                className="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                {getCalendarViewLabel(calendarView)}
                <ChevronDownIcon
                  className="-mr-1 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="py-1">
                  {calendarViewMenu.map(({ label, value }) => (
                    <MenuItem
                      key={label}
                      onClick={() => setCalendarView(value)}
                    >
                      <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        {label}
                      </span>
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Menu>
            <div className="ml-6 h-6 w-px bg-gray-300" />
          </div>
          <Menu as="div" className="relative ml-6 md:hidden">
            <MenuButton className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Open menu</span>
              <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
            </MenuButton>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="py-1">
                ...
              </div>
            </MenuItems>
          </Menu>
        </div>
      </header>
    </div>
  );
}
