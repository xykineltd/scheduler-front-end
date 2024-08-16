import React from "react";
import NotificationList from "./widgets/notification-list";
import AppDrawer from "../private-page/drawer";
import AppModal from "../private-page/modal";
import { useNotificationContext } from "./notification-context";

export default function NotificationBody() {
  const { drawerContent, drawerTitle, modalTitle, modalContent } =
    useNotificationContext();

  return (
    <div className="flex justify-center min-w-[75%] p-4">
      {/* Notification List */}
      <div className="w-full max-w-lg">
        <NotificationList />
      </div>

      {/* Drawer Component */}
      {drawerContent && (
        <div className="fixed inset-y-0 right-0 flex flex-col max-w-xs w-full bg-white shadow-lg lg:relative lg:w-1/4">
          <AppDrawer title={drawerTitle}>{drawerContent}</AppDrawer>
        </div>
      )}

      {/* Modal Component */}
      {modalContent && <AppModal title={modalTitle}>{modalContent}</AppModal>}
    </div>
  );
}
