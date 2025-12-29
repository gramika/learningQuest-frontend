import { serverURL } from "./serverURL";
import { commonAPI } from "./commonAPI";

// api to register 
    // here the type of the req body will be application/json . 
export const registerAPI = async(reqBody) =>{
    return await commonAPI('POST',`${serverURL}/register`,reqBody)
}

// api to login
export const loginAPI = async(reqBody) =>{
    return await commonAPI('POST',`${serverURL}/login`,reqBody)
}

// api to google login
export const googleLoginAPI = async(reqBody) =>{
    return await commonAPI('POST',`${serverURL}/google-login`,reqBody)
}

// api to add question
export const addQuestionAPI = async(reqBody,reqHeader) =>{
    return await commonAPI('POST',`${serverURL}/add-question`,reqBody,reqHeader)
}

// get questions by topic (quiz)
export const getQuestionsByTopicAPI = async (topic) => {
  return await commonAPI("GET",`${serverURL}/questions?topic=${topic}`);
};


// get logged-in user's questions
export const getMyQuestionsAPI = async (reqHeader) => {
  return await commonAPI("GET",`${serverURL}/my-questions`,"",reqHeader);
};

// delete question
export const deleteQuestionAPI = async (id, reqHeader) => {
  return await commonAPI("DELETE",`${serverURL}/question/${id}`,"",reqHeader);
};
// get single question
export const getQuestionByIdAPI = async (id, reqHeader) => {
  return await commonAPI("GET",`${serverURL}/question/${id}`,"",reqHeader);
};


// notes -USER

// add notes
export const addNotesAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST",`${serverURL}/add-notes`,reqBody,reqHeader);
};
// get notes
export const getAllNotesAPI = async (reqHeader) => {
  return await commonAPI("GET", `${serverURL}/all-notes`, "", reqHeader);
};
// report notes-USER
export const reportNoteAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST",`${serverURL}/report-note`,reqBody,reqHeader);
};
// get notes of a user
export const getMyNotesAPI = async (reqHeader) => {
  return await commonAPI("GET",`${serverURL}/my-notes`,"",reqHeader);
};
// delete notes-own
export const deleteNoteUserAPI = async (id, reqHeader) => {
  return await commonAPI("DELETE",`${serverURL}/user/delete-note/${id}`,"",reqHeader);
};

// ===========USER COURSES=======================
// get the courses to display
export const getUserCoursesAPI = async () => {
  return await commonAPI("GET",`${serverURL}/courses`);
};

// get single course (user – protected)
export const getSingleCourseAPI = async (id, reqHeader) => {
  return await commonAPI("GET",`${serverURL}/course/${id}`,"",reqHeader);
};

// purchased courses
export const getMyCoursesAPI = async (reqHeader) => {
  return await commonAPI("GET",`${serverURL}/payment/my-courses`,null,reqHeader);
};


// ----------------ADMIN SIDE---------------
// REPORTS
// to get all reports
export const getAllReportsAPI = async (reqHeader) => {
  return await commonAPI("GET",`${serverURL}/admin/reports`,"",reqHeader);
};
// to resolve reports
export const resolveReportAPI = async (id, reqHeader) => {
  return await commonAPI("PUT",`${serverURL}/admin/resolve-report/${id}`,"",reqHeader);
};
// for deleting reports
export const deleteReportAPI = async (id, reqHeader) => {
  return await commonAPI("DELETE",`${serverURL}/admin/delete-report/${id}`,"",reqHeader);
};

// ================= ADMIN NOTES APIs =================
// to delete notes-admin
export const deleteNoteAPI = async (id, reqHeader) => {
  return await commonAPI("DELETE",`${serverURL}/admin/delete-note/${id}`,"",reqHeader);
};
// ADMIN – get all notes
export const getAllNotesForAdminAPI = async (reqHeader) => {
  return await commonAPI("GET",`${serverURL}/admin/all-notes`,"",reqHeader);
};

// ADMIN – approve / reject
export const updateNoteStatusAPI = async (id, status, reqHeader) => {
  return await commonAPI("PUT",`${serverURL}/admin/update-note-status/${id}`,{ status },reqHeader);
};

// get all notes (admin)
export const getAllNotesAdminAPI = async (reqHeader) => {
  return await commonAPI("GET",`${serverURL}/admin/all-notes`,"",reqHeader);
};

// delete note
export const deleteNoteAdminAPI = async (id, reqHeader) => {
  return await commonAPI("DELETE",`${serverURL}/admin/delete-note/${id}`,"",reqHeader);
};

// ================= ADMIN USERS APIs =================

// get all users
export const getAllUsersAPI = async (reqHeader) => {
  return await commonAPI("GET",`${serverURL}/admin/all-users`,"",reqHeader);
};

// delete user
export const deleteUserAPI = async (id, reqHeader) => {
  return await commonAPI("DELETE",`${serverURL}/admin/delete-user/${id}`,"",reqHeader);
};

// ================= ADMIN DASHBOARD =================
export const getAdminDashboardStatsAPI = async (reqHeader) => {
  return await commonAPI("GET",`${serverURL}/admin/dashboard-stats`,"",reqHeader);
};


// QUESTIONS

// ADMIN – get all questions
export const getAllQuestionsAdminAPI = async (reqHeader) => {
  return await commonAPI("GET",`${serverURL}/admin/questions`,"",reqHeader);
};

// ADMIN – update question status
export const updateQuestionStatusAPI = async (id, status, reqHeader) => {
  return await commonAPI("PUT",`${serverURL}/admin/update-question-status/${id}`,{ status },reqHeader);
};

// edit question
export const editQuestionAPI = async (id, reqBody, reqHeader) => {
  return await commonAPI("PUT",`${serverURL}/edit-question/${id}`,reqBody,reqHeader);
};
// =============quiz===============
// save quiz
export const saveQuizAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST",`${serverURL}/save-quiz`,reqBody,reqHeader);
};

// get quiz history
export const getQuizHistoryAPI = async (reqHeader) => {
  return await commonAPI("GET",`${serverURL}/quiz-history`,"",reqHeader);
};

// ======================ADMIN COURSES=============================
// get all courses
export const getAdminCoursesAPI = async (reqHeader) => {
  return await commonAPI("GET",`${serverURL}/admin/courses`,"",reqHeader);
};
// delete course by admin
export const deleteCourseAdminAPI = async (id, reqHeader) => {
  return await commonAPI("DELETE",`${serverURL}/admin/course/${id}`,"",reqHeader);
};
// add course by admin
export const addCourseAdminAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST",`${serverURL}/admin/add-course`,reqBody,reqHeader);
};

// get single course (admin)
export const getSingleCourseAdminAPI = async (id, reqHeader) => {
  return await commonAPI("GET",`${serverURL}/course/${id}`,"",reqHeader);
};

// update existing course
export const updateCourseAdminAPI = async (id, reqBody, reqHeader) => {
  return await commonAPI("PUT",`${serverURL}/admin/course/${id}`,reqBody,reqHeader);
};

// ===========STRIPE PAYMENT SETUP==================

// create stripe checkout session
export const createCheckoutSessionAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST",`${serverURL}/create-checkout-session`,reqBody,reqHeader);
};

// to confirm payment
export const confirmPaymentAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST",`${serverURL}/payment/confirm`,reqBody,reqHeader);
};

// ============CERTIFICATES=====================
export const getMyCertificatesAPI = async (reqHeader) => {
  return await commonAPI("GET",`${serverURL}/my-certificates`,"",reqHeader);
};

export const issueCertificateAPI = async (reqBody, reqHeader) => {
  return await commonAPI("POST",`${serverURL}/issue-certificate`,reqBody,reqHeader);
};

// =======CONTACT SECTION=======
// USER SIDE
// send msg-user
export const sendContactAPI = async (reqBody) => {
  return await commonAPI("POST",`${serverURL}/contact`,reqBody);
};

// ADMIN SIDE
//  show msgs-admin
export const getAdminMessagesAPI = async (reqHeader) => {
  return await commonAPI("GET",`${serverURL}/admin/messages`,"",reqHeader);
};
  // delete msg -admin
export const deleteMessageAPI = async (id, reqHeader) => {
  return await commonAPI("DELETE",`${serverURL}/admin/message/${id}`,"",reqHeader);
};



