import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminLayout from "./components/layout/AdminLayout";
import Home from "./pages/Home";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ProjectsList from "./pages/admin/ProjectsList";
import ProjectForm from "./pages/admin/ProjectForm";
import SkillsList from "./pages/admin/SkillsList";
import SkillForm from "./pages/admin/SkillForm";
import ExperienceList from "./pages/admin/ExperienceList";
import ExperienceForm from "./pages/admin/ExperienceForm";
import EducationList from "./pages/admin/EducationList";
import EducationForm from "./pages/admin/EducationForm";
import MessagesList from "./pages/admin/MessagesList";
import ProfileForm from "./pages/admin/ProfileForm";
import CertificatesList from "./pages/admin/CertificatesList";
import CertificateForm from "./pages/admin/CertificateForm";
import LearningList from "./pages/admin/LearningList";
import LearningForm from "./pages/admin/LearningForm";
import NotFound from "./pages/NotFound";
import CustomCursor from "./components/ui/CustomCursor";

// ==================== PAGE WRAPPER ====================
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// ==================== ANIMATED ROUTES ====================
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public */}
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={
            <PageWrapper>
              <Login />
            </PageWrapper>
          }
        />

        {/* Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />

          {/* Projects */}
          <Route path="projects" element={<ProjectsList />} />
          <Route path="projects/new" element={<ProjectForm />} />
          <Route path="projects/:id/edit" element={<ProjectForm />} />

          {/* Skills */}
          <Route path="skills" element={<SkillsList />} />
          <Route path="skills/new" element={<SkillForm />} />
          <Route path="skills/:id/edit" element={<SkillForm />} />

          {/* Experiences */}
          <Route path="experiences" element={<ExperienceList />} />
          <Route path="experiences/new" element={<ExperienceForm />} />
          <Route path="experiences/:id/edit" element={<ExperienceForm />} />

          {/* Education */}
          <Route path="education" element={<EducationList />} />
          <Route path="education/new" element={<EducationForm />} />
          <Route path="education/:id/edit" element={<EducationForm />} />

          {/* Certificates */}
          <Route path="certificates" element={<CertificatesList />} />
          <Route path="certificates/new" element={<CertificateForm />} />
          <Route path="certificates/:id/edit" element={<CertificateForm />} />

          {/* Learning */}
          <Route path="learnings" element={<LearningList />} />
          <Route path="learnings/new" element={<LearningForm />} />
          <Route path="learnings/:id/edit" element={<LearningForm />} />

          {/* Messages & Profile */}
          <Route path="messages" element={<MessagesList />} />
          <Route path="profile" element={<ProfileForm />} />
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={
            <PageWrapper>
              <NotFound />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

// ==================== MAIN APP ====================
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <CustomCursor />
          <AnimatedRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
