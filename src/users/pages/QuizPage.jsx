import { faAngular, faNode, faReact } from '@fortawesome/free-brands-svg-icons';
import { faLeaf, faServer, faShuffle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../components/Header';

const QuizPage = () => {

    const navigate = useNavigate();

    const topics = [
        { id: 1, name: "MongoDB", color: "bg-teal-100", icon: <FontAwesomeIcon icon={faLeaf} className="text-green-600 text-3xl" /> },
        { id: 2, name: "Express", color: "bg-gray-100", icon: <FontAwesomeIcon icon={faServer} className="text-gray-700 text-3xl" /> },
        { id: 3, name: "Angular", color: "bg-red-100", icon: <FontAwesomeIcon icon={faAngular} className="text-red-600 text-3xl" /> },
        { id: 4, name: "React", color: "bg-blue-100", icon: <FontAwesomeIcon icon={faReact} className="text-blue-400 text-3xl" /> },
        { id: 5, name: "Node", color: "bg-green-100", icon: <FontAwesomeIcon icon={faNode} className="text-green-600 text-3xl" /> },
        { id: 6, name: "Mixed Quiz", color: "bg-violet-100", icon: <FontAwesomeIcon icon={faShuffle} className="text-purple-500 text-3xl" /> },
    ];

    // ✅ FIXED navigation logic
    const handleTopics = (topicName) => {
        if (topicName === "Mixed Quiz") {
            navigate("/user/quiz/mixed");
        } else {
            navigate(`/user/quiz/${topicName.toLowerCase()}`);
        }
    };

    return (
        <>
            <Header />

            <div className="min-h-screen bg-[#c0e6cd] py-10 px-4">
                {/* instructions */}
                <div className='flex flex-col justify-center items-center border border-white rounded-xl bg-white/40'>
                    <h1 className='heading font-bold text-3xl text-gray-700 p-3'>INSTRUCTIONS</h1>
                    <ul className='p-3 mb-4 text-lg'>
                        <li className='pb-2 text-blue-700'>Select your required topic</li>
                        <li className='pb-2 text-blue-700'>Each quiz consists of <b>5 questions</b></li>
                        <li className='pb-2 text-blue-700'>Click the correct answer among the options</li>
                        <li className='pb-2 text-blue-700'>Click finish once you complete the quiz</li>
                        <li className='pb-2 text-blue-700'>Results will be displayed at the end</li>
                    </ul>
                </div>

                {/* topic choosing */}
                <h1 className="text-2xl font-bold text-center mb-8 mt-8">
                    Choose a Quiz Topic
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {topics.map((topic) => (
                        <div
                            key={topic.id}
                            onClick={() => handleTopics(topic.name)}
                            className={`p-6 rounded-2xl shadow-md hover:shadow-lg cursor-pointer transition-all hover:scale-105 text-center ${topic.color}`}
                        >
                            <div className="flex items-center gap-3 mb-2 justify-center">
                                {topic.icon}
                                <h2 className="text-2xl font-bold text-teal-800">
                                    {topic.name}
                                </h2>
                            </div>

                            {topic.name === "Mixed Quiz" ? (
                                <p className="text-green-600 text-sm">
                                    Attempt quiz on MERN topics
                                </p>
                            ) : (
                                <p className="text-green-600 text-sm">
                                    Attempt quiz on {topic.name}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default QuizPage;
