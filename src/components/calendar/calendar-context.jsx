import React, { createContext, useContext, useeducer, useReducer } from "react";
import ScheduleForm from "../schedule/widgets/create-schedule";
import { useApplicationContext } from "../../contexts/ApplicationContext";

const CalendarContext = createContext(null);

const initialState = {
  calendarView: "month",
  modalDetail: {
    title: "",
    component: <></>,
  },
  scheduleDetail: {},
};

const calendarActions = {
  setCalendarView: "SET_Calendar_VIEW",
  setScheduleDetail: "SET_SCHEDULE_DETAIL",
  setModalDetail: "SET_MODAL_DETAIL",
};

const calendarReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case calendarActions.setCalendarView:
      return { ...state, calendarView: payload.calendarView };
    case calendarActions.setScheduleDetail:
      return { ...state, scheduleDetail: payload.scheduleDetail };
    case calendarActions.setModalDetail:
      return { ...state, modalDetail: payload.modalDetail };
  }
};

function CalendarContextProvider({ children }) {
  const [state, dispatch] = useReducer(calendarReducer, initialState);

  const dispatchAction = (type, payload) => dispatch({ type, payload });

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
      component: <ScheduleForm handleCreateSchedule={handleCreateSchedule} />,
    },
  };

  const handleModal = (modalActivity) => {
    setModalDetail(modalDetails[modalActivity]);
    setIsModalOpen(true);
  };

  return (
    <CalendarContext.Provider
      value={{ ...state, setCalendarView, handleModal }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export default CalendarContextProvider;
export const useCalendarContext = () => useContext(CalendarContext);
