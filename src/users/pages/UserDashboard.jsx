import { faCircleQuestion, faClipboard, faClockRotateLeft, faListUl, faPenToSquare, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../../components/Footer";

const UserDashboard = () => {
    const cards = [
        { title: "Attempt Quiz", desc: "Start topic-wise or mixed quizzes", path: "/user/quiz", color: "bg-blue-100", icon: <FontAwesomeIcon icon={faCircleQuestion} /> },
        { title: "Add Question", desc: "Contribute your own questions", path: "/user/addQuestion", color: "bg-green-100", icon: <FontAwesomeIcon icon={faPenToSquare} /> },
        { title: "My Questions", desc: "View and manage your added questions", path: "/user/myQuestions", color: "bg-yellow-100", icon: <FontAwesomeIcon icon={faListUl} /> },
        { title: "Quiz History", desc: "Track your quiz progress", path: "/user/quizHistory", color: "bg-purple-100", icon: <FontAwesomeIcon icon={faClockRotateLeft} /> },
        { title: "Upload Notes", desc: "Save and manage your PDF notes", path: "/user/Addnotes", color: "bg-pink-100", icon: <FontAwesomeIcon icon={faUpload} /> },
        { title: "Study Notes", desc: "View notes to study", path: "/user/allNotes", color: "bg-red-100", icon: <FontAwesomeIcon icon={faClipboard} /> },
    ];

    return (
        <>
            <Header />
            <div className="min-h-screen bg-[#b3d8e6cc]">
                <h1 className="text-4xl font-bold text-left py-6 px-20 heading">Welcome <span className="text-[#008080]">User</span> </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6 max-w-5xl mx-auto px-4  mt-9 ">
                    {cards.map((card, index) => (
                        <Link key={index} to={card.path}>
                            <div className={`block p-6 rounded-2xl shadow lg:h-[180px] hover:shadow-lg lg:flex flex-col justify-center items-center border border-[#fafafa] transition-all ${card.color}`}>
                                <div className="flex items-center gap-3 mb-2">
                                    {card.icon}
                                    <h2 className="text-teal-800 text-2xl font-bold text">{card.title}</h2>
                                </div>
                                <p className="text-gray-600 text-lg text-center">{card.desc}</p>
                            </div>
                        </Link>

                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UserDashboard;
