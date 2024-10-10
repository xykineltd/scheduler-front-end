import {
  BrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import PublicPage from "./components/public-page";
import LandingPage from "./components/public-page/landing-page";
import LoginPage from "./components/public-page/login-page";
import TrainingPage from "./components/public-page/training-page";
import HelpPage from "./components/public-page/help-page";
import PrivatePage from "./components/private-page";
import Calendar from "./components/calendar";
import ScheduleBody from "./components/schedule/schedule-body";
import FlightBooking from "./components/flight-booking";
import FlightBookingBody from "./components/flight-booking/flight-booking-body";
import NotificationBody from "./components/notification/notification-body";
import Dashboard from "./components/dashboard";
import DashboardBody from "./components/dashboard/dashboard-body";
import CalendarBody from "./components/calendar/calendar-body";
import Schedule from "./components/schedule";
import Notification from "./components/notification";
import CreateItenary from "./components/create-itenary";
import CreateItenaryBody from "./components/create-itenary/create-itenary-body";
import SignupPage from "./components/public-page/signup-page";
import { AuthContextProvider } from "./contexts/AuthContext";
import ApplicationContextProvider from "./contexts/ApplicationContext";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <ApplicationContextProvider>
          <Routes>
            <Route element={<PublicPage />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/logout" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/training" element={<TrainingPage />} />
              <Route path="/help" element={<HelpPage />} />
            </Route>
            <Route element={<PrivatePage />}>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="" element={<DashboardBody />} />
              </Route>
              <Route path="/calendar" element={<Calendar />}>
                <Route path="" element={<CalendarBody />} />
              </Route>
              <Route path="/my-itenary" element={<Schedule />}>
                <Route path="" element={<ScheduleBody />} />
              </Route>

              <Route path="/create-itenary" element={<CreateItenary />}>
                <Route path="" element={<CreateItenaryBody />} />
              </Route>

              <Route path="/book-flight" element={<FlightBooking />}>
                <Route path="" element={<FlightBookingBody />} />
              </Route>
              {/* <Route path="/notification" element={<Notification />}>
            <Route path="" element={<NotificationBody />} />
          </Route> */}
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ApplicationContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
