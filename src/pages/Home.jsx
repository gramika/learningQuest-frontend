import { faClipboardQuestion, faDatabase, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Header from '../users/components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import homeImage from '../assets/homeImage.png'
import aboutImage from '../assets/colllegues.jpg'


const Home = () => {
    return (
        <>
            <Header />
            <div>
                {/* home entry div */}

                <section className='grid md:grid-cols-2 min-h-screen bg-[#eceae6] px-6 py-10 md:px-20'>

                    {/* text div */}
                    <div className='md:flex flex-col justify-center items-center text-center md:text-left'>
                        <h1 id='heading' className=' text-5xl font-bold text-[#008080]'>Learning Quest </h1>
                        <h5 id='homeSub' className='text-[#3D5A80] py-3 font-semibold text-2xl'>
                            Crack MEARN Interviews with Confidence.
                        </h5>
                        <p className='md:w-[50%] text-justify py-3 font-black text-[#F08080]'>Sharpen your MEARN stack skills through smart quizzes !!!</p>
                        <Link to={'/login'}>
                            <button className='bg-[#5A7D7C] text-[#FAF9F6] p-3 rounded-full text-xl mt-3 hover:text-[#5A7D7C] hover:bg-[#FAF9F6] border-2 border-[#5A7D7C] cursor-pointer'>Get started</button>

                        </Link>          
                    </div>
                    {/* image div */}
                    <div className='flex justify-center items-center'>
                        <img src={homeImage} alt="home img" />
                    </div>
                </section>

                {/* about section */}

                <section className='bg-[#FAFAFA]  px-6 md:px-20 flex flex-col justify-center items-center'>
                    <h1 className='mt-7 py-2 text-3xl font-semibold text-[#008080]'>About Learning Quest</h1>
                    <h3 className='py-2 text-2xl text'>Learning Quest is a collaborative platform designed to help you ace MEARN stack interviews with confidence and clarity.</h3>
                    <div className='w-[60%] flex justify-center items-center mt-2'>
                        <img className='w-[80%]' src={aboutImage} alt="about img" />
                    </div>

                    <p className='w-[90%] text-justify text-base md:text-lg text-[#333] p-6 md:p-10 text'>
                        Our platform brings together a growing question bank filled with real interview questions from MongoDB, Express,Angular, React, and Node.js.
                        Practice through interactive quizzes to test your understanding, contribute your own questions to help others, and stay updated with the latest trends in MEARN interview topics.

                        All user submissions are reviewed and moderated by admins, ensuring high-quality, relevant, and accurate content — so your learning journey stays focused and effective.</p>
                </section>

                {/* features */}
                <section>
                    <h1 className='text-center text-[#008080] py-7 text-3xl heading font-extrabold'>Why You’ll Love Learning Quest !</h1>
                    <div className='grid grid-cols-1 md:grid-cols-3 px-6  md:px-40 pb-20 gap-5' >
                        {/* feature 1 */}
                        <div className='mt-7 flex flex-col justify-center items-center md:border-2 border-[#008080a6] rounded-2xl bg-[#faf9f8] transform transition ease-in-out duration-500 hover:scale-105'>
                            <div className='w-[50px] h-[50px] bg-[#618080] text-3xl text-[#F08080] flex justify-center items-center rounded-full mt-7' >
                                <FontAwesomeIcon icon={faClipboardQuestion} />
                            </div>
                            <h1 className='heading text-3xl font-semibold mt-1'>Topic-wise Quizzes</h1>
                            <p className='text-justify p-3 text-[#008080] mb-7'>Sharpen your skills with focused quizzes from each MEARN topic. Identify weak areas and strengthen them through smart, targeted practice.</p>
                        </div>
                        {/* feature 2 */}
                        <div className='mt-7 flex flex-col justify-center items-center md:border-2 border-[#008080a6] rounded-2xl bg-[#faf9f8] transform transition ease-in-out duration-500 hover:scale-105'>
                            <div className='w-[50px] h-[50px] bg-[#618080] text-3xl text-[#F08080] flex justify-center items-center rounded-full mt-7' >
                                <FontAwesomeIcon icon={faDatabase} />
                            </div>
                            <h1 className='heading text-3xl font-semibold mt-1'>Shared Question Bank</h1>
                            <p className='text-justify p-3 text-[#008080] mb-7'>Access a curated collection of real interview questions contributed by learners like you. Learn from diverse experiences and expand your knowledge base.</p>
                        </div>
                        {/* feature 3 */}
                        <div className='mt-7 flex flex-col justify-center items-center md:border-2 border-[#008080a6] rounded-2xl bg-[#faf9f8] transform transition ease-in-out duration-500 hover:scale-105'>
                            <div className='w-[50px] h-[50px] bg-[#618080] text-3xl text-[#F08080] flex justify-center items-center rounded-full mt-7' >
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </div>
                            <h1 className='heading text-3xl font-semibold mt-1'>Add Your Own Questions</h1>
                            <p className='text-justify p-3 text-[#008080] mb-7'>Contribute your own interview questions to the community. Helping others learn is a great way to reinforce your own understanding.</p>
                        </div>

                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}

export default Home