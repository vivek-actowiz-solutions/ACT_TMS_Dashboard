import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";

import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Dashboard from "./components/ecommerce/Dashboard";
import CreateTaskUI from "./components/ecommerce/CreatTask";
import EditTaskUI from "./components/ecommerce/EditTask";
import SubmitTaskUI from "./components/ecommerce/Submit";
import TaskDetail from "./components/ecommerce/TaskDetail";
import TaskPage from "./components/ecommerce/TaskPage";
import EditSubmitPage from "./components/ecommerce/EditSubmit"

import ForgotPassword from "./components/ecommerce/ForgotPassword";

import Login from "./pages/Auth/Login";


import AdminDashboard from "./components/ecommerce/AdminDashboard";

import PrivateRoute from "./pages/Auth/PrivateRoute";
import AdminRoute from "./pages/Auth/AdminRoute";
import ReopenTask from "./components/ecommerce/ReopenTask";
import POC from "./components/ecommerce/POC";
import GeneratePOC from "./components/ecommerce/GeneratePOC";

export default function App() {
  return ( 
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/TMS-R&D/login" element={<Login />} />
          <Route path="/TMS-R&D/forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route element={<AppLayout />}>
              <Route index path="/TMS-R&D/tasks" element={<TaskPage />} />
              <Route path="/TMS-R&D/" element={<Dashboard />} />
              <Route path="/TMS-R&D/create" element={<CreateTaskUI />} />
              <Route path="/TMS-R&D/edit/:id" element={<EditTaskUI />} />
              <Route path="/TMS-R&D/submit/:id" element={<SubmitTaskUI />} />
              <Route path="/TMS-R&D/tasks/:id" element={<TaskDetail />} />
              <Route path="/TMS-R&D/tasks/:id/edit-submit" element={<EditSubmitPage />} />
              <Route path="/TMS-R&D/tasks/:id/reopen" element={<ReopenTask />} />
              <Route path="/TMS-R&D/poc/create/:taskId" element={<POC />} />
              <Route path="/TMS-R&D/generate-poc" element={<GeneratePOC />} />
              
              <Route element={<AdminRoute />}>
                <Route path="/TMS-R&D/admin" element={<AdminDashboard />} />
              </Route>
              {/* duplicate login inside protected area removed */}
            </Route>
          </Route>

         <Route path="*" element={<Navigate to="/TMS-R&D/" replace />} />
        </Routes>
      </Router>
    </>
  );
}
