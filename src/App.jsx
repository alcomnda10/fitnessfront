import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/PrivateRoute';

import { SignUp } from './components/Auth/SignUp';
import { Login } from './components/Auth/Login';
import Home from './components/Home';
import CourseDetails from './components/CourseDetails';
import Courses from './components/Courses';
import Store from './components/Store';
import AboutUs from './components/AboutUs';
import { Navbar } from './components/Navbar';
import { ForgetPasswordForm } from './components/Auth/ForgetPasswordForm';
import { Footer } from './components/Footer';
import Services from './components/Services';
import Profile from './components/Profile';
import ChatAI from './components/ChatAI';
import Trainers from './components/Trainers';
import NotFound from './components/NotFound';
import TrainerProfile from './components/TrainerProfile';
import Payment from './components/Payment';
import AdminDashboard from './components/Dashboard/Dashboard';
import CreatePlan from './components/admin/CreatePlan';
import EditPlan from './components/admin/EditPlan';
import CreateCourse from './components/admin/CreateCourse';
import EditCourse from './components/admin/EditCourse';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPasswordForm />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/store" element={<Store />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/trainer/:id" element={<TrainerProfile />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/components/courses/create" element={<CreateCourse />} />
        <Route path="/components/courses/edit/:id" element={<EditCourse />} />


        {/* ✅ Protected Routes (Only logged in users) */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatAI />
            </PrivateRoute>
          }
        />

        {/* ✅ Admin Only Routes */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute requireAdmin>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/components/plans/create"
          element={
            <PrivateRoute requireAdmin>
              <CreatePlan />
            </PrivateRoute>
          }
        />

        <Route
          path="/components/plans/:id/edit"
          element={
            <PrivateRoute requireAdmin>
              <EditPlan />
            </PrivateRoute>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
