import { useState } from "react";
import { format } from "date-fns";
import { generateMonthDates, getMonthYear, changeMonth } from "../../../Utils/dateUtils.js";
import { generateRandomEventsForMonth, addEventsToDays } from "../../../Utils/addEventUtils.js";
import { ClockIcon, XMarkIcon } from "@heroicons/react/20/solid";

const CalendarMonthView = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Generating the dates for the current month
    const days = generateMonthDates(currentMonth);

    // Generate random events for August, September, and October 2024
    const augustEvents = generateRandomEventsForMonth(2024, 7, 4);
    const septemberEvents = generateRandomEventsForMonth(2024, 8, 4); 
    const octoberEvents = generateRandomEventsForMonth(2024, 9, 4);

    // Combinining all thee events and add to days
    const allEvents = [...augustEvents, ...septemberEvents, ...octoberEvents];
    const daysWithEvents = addEventsToDays(days, allEvents);

    const handleMonthChange = (offset) => {
        setCurrentMonth(changeMonth(currentMonth, offset));
    };

    const handleDateClick = (day) => {
        if (day.events.length > 0) {
            setSelectedDate(day);
            setDrawerOpen(true);
        }
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    return (
        <div className="lg:flex lg:h-full lg:flex-col">
            <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
                <div className="bg-gray-200">
                    <div className="flex justify-between items-center p-4 border-b border-gray-300">
                        <button onClick={() => handleMonthChange(-1)} className="text-gray-500 hover:text-gray-700">
                            &lt;
                        </button>
                        <span className="text-lg font-semibold">{getMonthYear(currentMonth)}</span>
                        <button onClick={() => handleMonthChange(1)} className="text-gray-500 hover:text-gray-700">
                            &gt;
                        </button>
                    </div>
                    <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
                        <div className="bg-white py-2">M<span className="sr-only sm:not-sr-only">on</span></div>
                        <div className="bg-white py-2">T<span className="sr-only sm:not-sr-only">ue</span></div>
                        <div className="bg-white py-2">W<span className="sr-only sm:not-sr-only">ed</span></div>
                        <div className="bg-white py-2">T<span className="sr-only sm:not-sr-only">hu</span></div>
                        <div className="bg-white py-2">F<span className="sr-only sm:not-sr-only">ri</span></div>
                        <div className="bg-white py-2">S<span className="sr-only sm:not-sr-only">at</span></div>
                        <div className="bg-white py-2">S<span className="sr-only sm:not-sr-only">Sun</span></div>
                    </div>
                    <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
                        <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
                            {daysWithEvents.map((day) => (
                                <div
                                    key={day.date}
                                    className={`relative flex flex-col justify-between px-2 py-1 
                                                ${day.isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-500"} 
                                                ${day.isToday ? "border-2 border-indigo-600" : "border"} 
                                                h-24 w-34 overflow-hidden`}
                                    onClick={() => handleDateClick(day)}
                                >
                                    <time
                                        dateTime={day.date}
                                        className={`text-center ${day.isToday ? "flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white mx-auto" : ""}`}
                                    >
                                        {day.date.split("-").pop().replace(/^0/, "")}
                                    </time>
                                    {day.events.length > 0 && (
                                        <ol className="mt-1 space-y-1">
                                            {day.events.slice(0, 2).map((event) => (
                                                <li key={event.id} className="truncate text-sm">
                                                    <span className="group flex">
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
                                                <li className="text-gray-500 text-xs">+ {day.events.length - 2} more</li>
                                            )}
                                        </ol>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
                            {daysWithEvents.map((day) => (
                                <button
                                    key={day.date}
                                    type="button"
                                    className={`flex h-20 flex-col px-3 py-4 ${day.isCurrentMonth ? "bg-white" : "bg-gray-50"} 
                                                ${day.isSelected || day.isToday ? "font-semibold" : ""} 
                                                ${day.isSelected ? "text-white" : ""} 
                                                ${!day.isSelected && day.isToday ? "text-indigo-600" : ""} 
                                                ${!day.isSelected && day.isCurrentMonth ? "text-gray-900" : ""} 
                                                ${!day.isSelected && !day.isCurrentMonth ? "text-gray-500" : ""} 
                                                hover:bg-gray-100 focus:z-10`}
                                    onClick={() => handleDateClick(day)}
                                >
                                    <time
                                        dateTime={day.date}
                                        className={`ml-auto ${day.isSelected ? (day.isToday ? "bg-indigo-600" : "bg-gray-900") : ""} 
                                                    ${day.isSelected ? "flex h-8 w-8 items-center justify-center rounded-full" : ""}`}
                                    >
                                        {day.date.split("-").pop().replace(/^0/, "")}
                                    </time>
                                    <span className="sr-only">{day.events.length} events</span>
                                    {day.events.length > 0 && (
                                        <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                                            {day.events.map((event) => (
                                                <span key={event.id} className="mx-0.5 mb-1 h-2 w-2 rounded-full bg-gray-400" />
                                            ))}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
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
                                                    <h2 className="text-lg font-medium text-white">{format(new Date(selectedDate.date), "MMMM dd, yyyy")}</h2>
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
                                                        <li key={event.id} className="bg-gray-100 p-4 rounded-lg shadow">
                                                            <h3 className="font-medium text-gray-900">{event.name}</h3>
                                                            <p className="mt-1 text-gray-500">{event.description}</p>
                                                            <div className="mt-4 flex items-center">
                                                                <ClockIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
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
