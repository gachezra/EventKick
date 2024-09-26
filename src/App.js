import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Plan from "./pages/Plan";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SetAvatar from "./pages/SetAvatar";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import EditEvent from "./pages/EditEvent";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import ForumPage from "./pages/ForumPage";
import ForumDetailsPage from "./pages/ForumDetailsPage";
import ResetPassword from "./pages/ResetPassword";
import NewPassword from "./pages/NewPassword";
import EmailVerified from "./pages/EmailVerified";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events/>} />
        <Route path="/plan" element={<Plan/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/forgot-password"  element={<ResetPassword/>} />
        <Route path="/verify/:token" element={<EmailVerified/>} />
        <Route path="/reset-password/:token" element={<NewPassword/>} />
        <Route path="/forums/:eventId" element={<ForumPage />} />
        <Route path="/forum/:threadId" element={<ForumDetailsPage/>} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/edit-event/:id" element={<EditEvent/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
