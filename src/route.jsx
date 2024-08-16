import { createBrowserRouter } from "react-router-dom";
import NoMatch from "./components/ nomatch/nomatch";
import LoginPage from "./components/public-page/login-page";
import HelpPage from "./components/public-page/help-page";
import PublicPage from "./components/public-page";
import PrivatePage from "./components/private-page";
import Calender from "./components/calendar";
import CalenderBody from "./components/calendar/calendar-body";
import FlightBooking from "./components/flight-booking";
import FlightBookingBody from "./components/flight-booking/flight-booking-body";
import Schedule from "./components/schedule";
import ScheduleBody from "./components/schedule/schedule-body";
import LandingPage from "./components/public-page/landing-page";
import TrainingPage from "./components/public-page/training-page";
import NotificationBody from "./components/notification/notification-body";
import Notification from "./components/notification";
import Dashboard from "./components/dashboard";
import DashboardBody from "./components/dashboard/dashboard-body";

const router = createBrowserRouter([
  {
    element: <PublicPage />,
    children: [
      {
        path: "/",
        Component: LandingPage,
      },
      {
        path: "/login",
        Component: LoginPage,
      },
      {
        path: "/logout",
        Component: LoginPage,
      },
      {
        path: "/training",
        Component: TrainingPage,
      },
      {
        path: "/help",
        Component: HelpPage,
      },
    ],
  },
  {
    element: <PrivatePage />,
    children: [
      {
        path: "calendar",
        element: <Calender />,
        children: [
          {
            path: "",
            Component: CalenderBody,
          },
        ],
      },
      {
        path: "schedule",
        element: <Schedule />,
        children: [
          {
            path: "",
            Component: ScheduleBody,
          },
        ],
      },
      {
        path: "book-flight",
        element: <FlightBooking />,
        children: [
          {
            path: "",
            Component: FlightBookingBody,
          },
        ],
      },
      {
        path: "notification",
        element: <Notification />,
        children: [
          {
            path: "",
            Component: NotificationBody,
          },
        ],
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "",
            Component: DashboardBody,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NoMatch />,
  },
]);

export default router;
