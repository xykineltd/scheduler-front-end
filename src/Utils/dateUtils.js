// src/Utils/dateUtils.js
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  addMonths,
  subMonths,
} from "date-fns";

export const generateMonthDates = (currentMonth) => {
  const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 });
  const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 });

  const dates = eachDayOfInterval({ start, end })?.map((date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    return {
      date: formattedDate,
      isCurrentMonth: isSameMonth(date, currentMonth),
      isToday: isToday(date),
      events: [],
    };
  });

  return dates;
};

export const getMonthYear = (date) => {
  console.log("==============", date);
  return format(date, "MMMM yyyy");
};

export const changeMonth = (date, offset) => {
  return addMonths(date, offset);
};
