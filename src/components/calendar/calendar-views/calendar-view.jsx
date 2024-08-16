import React from "react";
import { useCalendarContext } from "../calendar-context";
import CalendarMonthView from "./month-view";
import CalendarWeekView from "./week-view";
import CalendarDayView from "./day-view";
import CalendarYearView from "./year-view";

export default function CalendarView() {
  const { calendarView } = useCalendarContext();
  return (
    <>
      {calendarView === "year" && <CalendarYearView />}
      {calendarView === "month" && <CalendarMonthView />}
      {calendarView === "week" && <CalendarWeekView />}
      {calendarView === "day" && <CalendarDayView />}
    </>
  );
}
