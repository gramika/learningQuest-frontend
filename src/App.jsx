import { Route, Routes } from "react-router-dom"
import PageNotFound from "./pages/PageNotFound"
import Auth from "./pages/Auth"
import Register from "./pages/Register"
import Contact from "./pages/Contact"
import Preloader from "./components/Preloader"
import { useEffect, useState } from "react"
import Home from "./pages/Home"
import UserDashboard from "./users/pages/UserDashboard"
import QuizPage from "./users/pages/QuizPage"
import QuizAttempPage from "./users/pages/QuizAttempPage"
import QuizHistoryPage from "./users/pages/QuizHistoryPage"
import AddQuestionPage from "./users/pages/AddQuestionPage"
import EditQuestionPage from "./users/pages/EditQuestionPage"
import MyQuestionsPage from "./users/pages/MyQuestionsPage"
import NotesUploadPage from "./users/pages/NotesUploadPage"
import AllNotes from "./users/pages/AllNotes"
import AdminDashboard from "./admin/pages/AdminDashboard"
import AdminUSersPage from "./admin/pages/AdminUSersPage"
import AdminNotesPage from "./admin/pages/AdminNotesPage"
import AdminReportsPage from "./admin/pages/AdminReportsPage"
import Profile from "./users/pages/Profile"
import CourseDetailPage from "./users/pages/CourseDetailsPage"
import CoursesPage from "./users/pages/CoursesPage"
import ManageCoursesPage from "./admin/pages/ManageCoursesPage"
import AddCoursePage from "./admin/pages/AddCoursePage"
import AdminQuestionsPage from "./admin/pages/AdminQuestionsPage"
import PaymentSuccess from "./users/pages/PaymentSuccess";
import PaymentFailed from "./users/pages/PaymentFailed";
import MyCoursesPage from "./users/pages/MyCoursesPage";

import AdminMessagesPage from "./admin/pages/AdminMessagesPage"

function App() {
  const [isLoading, setIsLoading] = useState(true)

  // for showing preloader initially -( only at the first loading)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 4000)
  }, [])
  return (
    <>

      <Routes>
        {/* if it is loading, show preloader else show home screen */}
        <Route path="/" element={isLoading ? <Preloader /> : <Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/user/quiz" element={<QuizPage />} />
        <Route path="/user/quiz/:topic" element={<QuizAttempPage />} />
        <Route path="/user/quizHistory" element={<QuizHistoryPage />} />
        <Route path="/user/addQuestion" element={<AddQuestionPage />} />
        <Route path="/user/editQuestion/:id" element={<AddQuestionPage />} />
        <Route path="/user/myQuestions" element={<MyQuestionsPage />} />
        <Route path="/user/addNotes" element={<NotesUploadPage />} />
        <Route path="/user/allNotes" element={<AllNotes />} />
        <Route path="/user/courses" element={<CoursesPage />} />
        <Route path="/user/course/:id" element={<CourseDetailPage />} />
        <Route path="/user/edit-question/:id" element={<EditQuestionPage />} />
        <Route path="/user/my-courses" element={<MyCoursesPage />} />
        <Route path="/user/payment-success" element={<PaymentSuccess />} />
        <Route path="/user/payment-cancel" element={<PaymentFailed />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/manageUsers" element={<AdminUSersPage />} />
        <Route path="/admin/manageNotes" element={<AdminNotesPage />} />
        <Route path="/admin/manageReports" element={<AdminReportsPage />} />
        <Route path="/admin/manageQuestions" element={<AdminQuestionsPage />} />
        <Route path="/admin/manageCourses" element={<ManageCoursesPage />} />
        <Route path="/admin/addCourse" element={<AddCoursePage />} />
        <Route path="/admin/editCourse/:id" element={<AddCoursePage />} />
        <Route path="/admin/messages" element={<AdminMessagesPage />} />



      </Routes>

    </>
  )
}

export default App
