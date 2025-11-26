import { BrowserRouter as Router, Routes, Route } from "react-router";

import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Dashboard from "./components/ecommerce/Dashboard";
import CreateTaskUI from "./components/ecommerce/CreatTask";
import EditTaskUI from "./components/ecommerce/EditTask";
import SubmitTaskUI from "./components/ecommerce/Submit";
import TaskDetail from "./components/ecommerce/TaskDetail";
import TaskPage from "./components/ecommerce/TaskPage";
import EditSubmitPage from "./components/ecommerce/EditSubmit"

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
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route element={<AppLayout />}>
              <Route index path="/tasks" element={<TaskPage />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/create" element={<CreateTaskUI />} />
              <Route path="/edit/:id" element={<EditTaskUI />} />
              <Route path="/submit/:id" element={<SubmitTaskUI />} />
              <Route path="/tasks/:id" element={<TaskDetail />} />
              <Route path="/tasks/:id/edit-submit" element={<EditSubmitPage />} />
              <Route path="/tasks/:id/reopen" element={<ReopenTask />} />
              <Route path="/poc/create/:taskId" element={<POC />} />
              <Route path="/generate-poc" element={<GeneratePOC />} />
              
              
              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>
              {/* duplicate login inside protected area removed */}


              
            </Route>
          </Route>

         
        </Routes>
      </Router>
    </>
  );
}
