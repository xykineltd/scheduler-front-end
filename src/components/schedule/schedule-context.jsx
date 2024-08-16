import React, { createContext, useContext, useReducer } from "react";
import { useApplicationContext } from "../../contexts/ApplicationContext";
import ScheduleForm from "./widgets/create-schedule";

const initialState = {
  modalDetail: {
    title: "",
    component: <></>,
  },
  scheduleDetail: {},
};

const scheduleActions = {
  setModalDetail: "SET_MODAL_DETAIL",
  setScheduleDetail: "SET_SCHEDULE_DETAIL",
};

const scheduleReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case scheduleActions.setModalDetail:
      return { ...state, modalDetail: payload.modalDetail };
    case scheduleActions.setScheduleDetail:
      return { ...state, scheduleDetail: payload.scheduleDetail };
  }
};

const ScheduleContext = createContext(null);

function ScheduleContextProvider({ children }) {
  const [state, dispatch] = useReducer(scheduleReducer, initialState);

  const dispatchAction = (type, payload) => dispatch({ type, payload });

  const setModalDetail = (modalDetail) => {
    dispatchAction(scheduleActions.setModalDetail, { modalDetail });
  };

  const setScheduleDetail = (scheduleDetail) => {
    dispatchAction(scheduleActions.setScheduleDetail, { scheduleDetail });
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
    <ScheduleContext.Provider
      value={{ ...state, handleModal, setScheduleDetail }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}

export default ScheduleContextProvider;
export const useScheduleContext = () => useContext(ScheduleContext);
