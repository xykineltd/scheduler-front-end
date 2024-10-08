import React, { createContext, useContext, useReducer, useState } from "react";
import { useApplicationContext } from "../../contexts/ApplicationContext";
import { changeMonth } from "../../Utils/dateUtils";
import {getQueryMethod} from "../../Utils/common";
import { useMutation, useQuery } from "@tanstack/react-query";

const CalendarContext = createContext(null);

const initialState = {
  calendarView: "month",
  modalDetail: {
    title: "",
    component: <></>,
  },
  scheduleDetail: {},
  currentMonth: null,
  selectedDate: null,
  days: [],
};

const calendarActions = {
  setCalendarView: "SET_CALENDAR_VIEW",
  setScheduleDetail: "SET_SCHEDULE_DETAIL",
  setModalDetail: "SET_MODAL_DETAIL",
  setCurrentMonth: "SET_CURRENT_MONTH",
  setSelectedDate: "SET_SELECTED_DATE",
  setDays: "SET_DAYS",
};

const calendarReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case calendarActions.setDays:
      return { ...state, days: payload.days };
    case calendarActions.setCurrentMonth:
      return { ...state, currentMonth: payload.currentMonth };
    case calendarActions.setSelectedDate:
      return { ...state, selectedDate: payload.selectedDate };
    case calendarActions.setCalendarView:
      return { ...state, calendarView: payload.calendarView };
    case calendarActions.setScheduleDetail:
      return { ...state, scheduleDetail: payload.scheduleDetail };
    case calendarActions.setModalDetail:
      return { ...state, modalDetail: payload.modalDetail };
    default:
      return state;
  }
};

function CalendarContextProvider({ children }) {
  const [state, dispatch] = useReducer(calendarReducer, initialState);
  const [currentDate, setCurrentDate] = useState(new Date());

  const dispatchAction = (type, payload) => dispatch({ type, payload });

  const setDays = (days) => {
    dispatchAction(calendarActions.setDays, { days });
  };

  const setCurrentMonth = (currentMonth) => {
    dispatchAction(calendarActions.setCurrentMonth, { currentMonth });
  };

  const setSelectedDate = (selectedDate) => {
    dispatchAction(calendarActions.setSelectedDate, { selectedDate });
  };

  const setCalendarView = (calendarView) => {
    dispatchAction(calendarActions.setCalendarView, { calendarView });
  };

  const setModalDetail = (modalDetail) => {
    dispatchAction(calendarActions.setModalDetail, { modalDetail });
  };

  const { setIsModalOpen } = useApplicationContext();

  const handleCreateSchedule = (newSchedule) => {
    console.log("------------NEW----SECHEDULE------", newSchedule);
  };

  const modalDetails = {
    addSchedule: {
      title: "Create Schedule",
      component: <div handleCreateSchedule={handleCreateSchedule} />,
    },
  };

  const handleModal = (modalActivity) => {
    setModalDetail(modalDetails[modalActivity]);
    setIsModalOpen(true);
  };

  const handleMonthChange = (offset) => {
    setCurrentMonth(changeMonth(state.currentMonth, offset));
  };

  const {
    data: events,
    error: errorGettingPaymentinfos,
    isLoading: loadingPaymentinfos,
    refetch: refetchPaymentinfos,
    isFetching: isFetchingPaymentinfos,
  } = useQuery({
    queryKey: ["events"],
    queryFn: () => getQueryMethod("get-users-for-event/66ef7f393f934778f3b97d8b"),
  });

  return (
    <CalendarContext.Provider
      value={{
        ...state,
        currentDate,
        setCurrentDate,
        events,
        setCalendarView,
        handleModal,
        handleMonthChange,
        setCurrentMonth,
        setSelectedDate,
        setDays,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export default CalendarContextProvider;
export const useCalendarContext = () => useContext(CalendarContext);
