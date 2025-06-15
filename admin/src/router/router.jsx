import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import App from '../App.jsx'
import Home from '../pages/Home/Home.jsx'
import SignIn from '../pages/SignIn/SignIn.jsx'
import ProtectedRoute from "./ProtectedRoute.jsx";
import DashBoardOption from '../pages/DashBoardOption/DashBoardOption.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="SignIn" element={<SignIn />} />
      <Route
        path="DashBoard"
        element={
          <ProtectedRoute>
            <DashBoardOption />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

export default router;
