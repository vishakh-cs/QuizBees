// master.jsx
"use client"
import React, { useState, useEffect } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, 
DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';
export default function Master() {


    const backgroundImageUrl =
    'https://img.freepik.com/premium-photo/fantasy-forest-landscape-created-with-generative-ai-technology_134032-2127.jpg';

    const containerStyle: React.CSSProperties = {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        overflow: "hidden",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    };
    const modalStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    };
    const allQuestionsStyle: React.CSSProperties = {
        maxHeight: '200px', 
        overflowY: 'auto',
    };

    // State variables
    const [allQuestions, setAllQuestions] = useState([]);
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');

    // State variables for modal
    const [showLoginModal, setShowLoginModal] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);


    const handleLogin = () => {
        
        if (username === process.env.NEXT_PUBLIC_USERNAME && password ===process.env.NEXT_PUBLIC_PASSWORD) {
            setLoggedIn(true);
            setShowLoginModal(false);
            // store the master info in local storage 
            localStorage.setItem('logged in ','true')
        } else {
            alert('Invalid username or password. Please try again.');
        }
    };

    const handleCloseModal = () => {
        setShowLoginModal(false);
    };

    useEffect(() => {

      // Check if the user was logged in before refreshing
      const storedLoginState = localStorage.getItem('loggedIn');
      if (storedLoginState === 'true') {
         setLoggedIn(true);
         setShowLoginModal(false);
     }

        const storedQuestions = localStorage.getItem('allQuestions');
        if (storedQuestions) {
            setAllQuestions(JSON.parse(storedQuestions));
        }
    }, []);

    const handleSubmitClick = (e) => {
       e.preventDefault()
        if (!question.trim() || answers.some(answer => !answer.trim())) {
           
            alert("Please fill out both the question and all answers.");
            return;
        }

        const newQuestion = {
            question,
            answers,
            correctAnswer,
        };

        setAllQuestions([...allQuestions, newQuestion]);
        localStorage.setItem('allQuestions', JSON.stringify([...allQuestions, newQuestion]));

        setQuestion('');
        setAnswers(['', '', '', '']);
        setCorrectAnswer('');
    };

    const handleDeleteClick = (index) => {
        const updatedQuestions = allQuestions.filter((_, i) => i !== index);
        setAllQuestions(updatedQuestions);
        localStorage.setItem('allQuestions', JSON.stringify(updatedQuestions));
    };



     useEffect(() => {
     localStorage.setItem('loggedIn', loggedIn.toString());
    }, [loggedIn]);

    function handleLogout(e){
        e.preventDefault();
        localStorage.setItem('loggedIn','false');
        window.location.href="/"
        
    }

    if (!loggedIn) {
        return (
            <div style={modalStyle}>
                <div className="bg-white p-8 rounded-lg">
                    <label htmlFor="username" className="block mb-2 text-lg font-semibold text-gray-800">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mb-4 w-full p-3 border border-gray-300 rounded-lg"
                    />

                    <label htmlFor="password" className="block mb-2 text-lg font-semibold text-gray-800">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mb-4 w-full p-3 border border-gray-300 rounded-lg"
                    />

                    <button
                        onClick={handleLogin}
                        className="bg-green-700 hover:bg-green-400 text-white border-none font-semibold py-2 px-4 rounded"
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }


    return (
        <div style={containerStyle}>
            <form className="max-w-md mt-5 mx-auto text-white">
                <div className="mb-6 bg-green-900 p-4 rounded" style={allQuestionsStyle}>
                    <label htmlFor="base-input" className="block mb-2 text-lg font-semibold text-white">
                        All Questions
                    </label>
                    <ul>
                        {allQuestions.map((q, index) => (
                            <li className="bg-yellow-300 text-black p-2 mb-2 rounded" key={index}>
                                <span className="font-bold">Question {index + 1}: </span>
                                {q.question}
                                <button
                                    className="ml-2 text-red-600 hover:text-red-800"
                                    onClick={() => handleDeleteClick(index)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>


                <div className="mb-6">
                    <label htmlFor="base-input" className="block mb-2 text-lg font-semibold text-white">
                        Write the Question
                    </label>
                    <input
                        type="text"
                        id="base-input"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="bg-gray-50 border h-28 border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <div className="flex justify-evenly items-center my-20 flex-wrap w-[90%]">
                    {[1, 2, 3, 4].map((index) => (
                        <input
                            key={index}
                            type="text"
                            value={answers[index - 1]}
                            onChange={(e) => setAnswers([...answers.slice(0, index - 1), e.target.value, ...answers.slice(index)])}
                            className="w-[33%] py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border hover:bg-yellow-300 border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700
                            dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            placeholder={`Answer ${index}`}
                        />
                    ))}
                </div>
                <div className="mb-10">
                    <label htmlFor="correct-answer" className="block mb-2 text-lg font-semibold text-white">
                        Select Correct Answer
                    </label>
                    <select
                        id="correct-answer"
                        value={correctAnswer}
                        onChange={(e) => setCorrectAnswer(e.target.value)}
                        className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="" disabled>
                            Select Correct Answer
                        </option>
                        {answers.map((answer, index) => (
                            <option key={index} value={answer}>
                                {answer}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={handleSubmitClick}
                    className="bg-green-700 hover:bg-green-400 mb-6 text-white border-none font-semibold py-2 px-10 border border-gray-400 rounded shadow"
                >
                    Submit
                </button>
                <button
                    onClick={handleLogout}
                    className="bg-red-700 hover:bg-orange-400 ml-6 mb-6 text-white border-none font-semibold py-2 px-10 border border-gray-400 rounded shadow"
                >
                    logout
                </button>

            </form>
        </div>
    );
}
