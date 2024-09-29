import { useState } from "react";
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  format,
  isToday,
} from "date-fns";
import { ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

// Get only the days of the current month
const getDaysForMonth = (year, monthIndex) => {
  const start = startOfMonth(new Date(year, monthIndex));
  const end = endOfMonth(new Date(year, monthIndex));

  return eachDayOfInterval({ start, end }).map((date) => ({
    date: format(date, "yyyy-MM-dd"),
    isToday: isToday(date),
  }));
};

const months = [
  { name: "January", index: 0 },
  { name: "February", index: 1 },
  { name: "March", index: 2 },
  { name: "April", index: 3 },
  { name: "May", index: 4 },
  { name: "June", index: 5 },
  { name: "July", index: 6 },
  { name: "August", index: 7 },
  { name: "September", index: 8 },
  { name: "October", index: 9 },
  { name: "November", index: 10 },
  { name: "December", index: 11 },
];

// Events for the year
const events = {
  "2024-01-11": {
    title: "Breakfast with the team",
    description: "Breakfast meeting with the team to discuss workflow",
    time: "10:00 AM",
  },
  "2024-01-12": { title: "Flight to Paris", description: "Taking a flight to Paris", time: "2:00 PM" },
  "2024-02-14": { title: "Valentine's Day", description: "Having Valentine's dinner with friends", time: "12:00 PM" },
  "2024-03-24": { title: "Tech Talk Event", description: "Let's go inspire the tech industry", time: "4:00 PM" },
  "2024-04-05": { title: "Interview", description: "Interview with Microsoft", time: "1:00 PM" },
  "2024-04-17": { title: "Learning", description: "Study Data Structures and Algorithms", time: "3:00 PM" },
  "2024-05-15": { title: "Hang Out with The Family", description: "Go Unwind with the Family", time: "11:00 AM" },
  "2024-06-13": { title: "Deploy New Project", description: "Deploy project team has been working on", time: "9:00 AM" },
  "2024-07-04": { title: "Fourth Of July", description: "Watch Fireworks By the Bridge River", time: "8:00 PM" },
  "2024-08-18": { title: "Read A Novel", description: "Read the Novel It Ends With Us", time: "5:00 PM" },
  "2024-09-21": { title: "Spa Date", description: "Go relax at the spa", time: "3:00 PM" },
  "2024-10-19": { title: "Sponsor Call", description: "Call Project Sponsors", time: "10:00 AM" },
  "2024-11-09": { title: "Gym Time", description: "Get on your gym time", time: "2:00 PM" },
  "2024-12-02": { title: "Call with Design Team", description: "Ask for update from design team", time: "4:00 PM" },
};

// Adjusted start days for each month in 2024
const monthStartDayMap = {
  January: 1,   // Monday
  February: 4,  // Thursday
  March: 5,     // Friday
  April: 1,     // Monday
  May: 3,       // Wednesday
  June: 6,      // Saturday
  July: 1,      // Monday
  August: 4,    // Thursday
  September: 0, // Sunday
  October: 2,   // Tuesday
  November: 5,  // Friday
  December: 0,  // Sunday
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CalendarYearView() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handlePrevYear = () => setCurrentYear((prevYear) => prevYear - 1);
  const handleNextYear = () => setCurrentYear((prevYear) => prevYear + 1);

  return (
    <div className="bg-white py-4 relative">
      {/* Year navigation */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={handlePrevYear} className="text-gray-600 hover:text-gray-900">
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">{currentYear}</h1>
        <button onClick={handleNextYear} className="text-gray-600 hover:text-gray-900">
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-x-8 gap-y-16 px-4 sm:grid-cols-2 sm:px-6 xl:max-w-none xl:grid-cols-3 xl:px-8 2xl:grid-cols-4">
        {months.map((month) => {
          const days = getDaysForMonth(currentYear, month.index);
          const firstDayOfMonth = monthStartDayMap[month.name];

          return (
            <section key={month.name} className="text-center">
              <h2 className="text-sm font-semibold text-gray-900 mt-4">
                {month.name}
              </h2>
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
                {Array.from({ length: firstDayOfMonth }, (_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="bg-gray-50 text-gray-400 flex items-center justify-center h-12 w-full py-2"
                  />
                ))}
                {days.map((day, dayIdx) => (
                  <button
                    key={day.date}
                    type="button"
                    className={classNames(
                      "bg-white text-gray-900",
                      dayIdx === 0 && "rounded-tl-lg",
                      dayIdx === 6 && "rounded-tr-lg",
                      dayIdx === days.length - 7 && "rounded-bl-lg",
                      dayIdx === days.length - 1 && "rounded-br-lg",
                      "flex items-center justify-center h-12 w-full py-2 hover:bg-gray-100 focus:z-10",
                      events[day.date] && "bg-blue-100"
                    )}
                    onClick={() => handleOpenModal(events[day.date])}
                  >
                    <time
                      dateTime={day.date}
                      className={classNames(
                        day.isToday && "bg-indigo-600 font-semibold text-white",
                        "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                      )}
                    >
                      {format(new Date(day.date), "d")}
                    </time>
                    {events[day.date] && (
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-1"></div>
                    )}
                  </button>
                ))}
              </div>
              <div className="mb-4" />
            </section>
          );
        })}
      </div>

      {/* Modal */}
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
