/* eslint-disable */

"use client"
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';

interface Question {
  question: string;
  answers: string[];
  correctAnswer: string;
}

interface PopupProps {
  closePopup: () => void;
}

const Popup: React.FC<PopupProps> = ({ closePopup }) => (
  <div className="popup">
    <div className="popup-inner">
      <p>Congratulations! That's the correct answer!</p>
      <button onClick={closePopup}>Close</button>
    </div>
  </div>
);

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  onReset: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ isOpen, onClose, totalQuestions, correctAnswers, score, onReset }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    className="modal"
    style={{
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      content: {
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#fff',
        color: '#333',
        height: '45%',
      },
    }}
  >
<h2 className='text-4xl font-bold underline text-cyan-600'>Quiz Result</h2>
<p className='font-bold mt-3 text-xl'>Total Questions: {totalQuestions}</p>
<p className='font-bold mt-3 text-xl'>Correct Answers: {correctAnswers}</p>
<p className='font-bold mt-3 text-cyan-700 text-xl'>Score: {score}</p>
<button
  onClick={onReset}
  style={{
    backgroundColor: '#2ecc71',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
  }}
>
  Restart Quiz
</button>
  </Modal>
);

export default function Start() {
  const [count, setCount] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | {}>({});
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showResultModal, setShowResultModal] = useState<boolean>(false);

  useEffect(() => {
    // Fetch questions from localStorage
    const storedQuestions = localStorage.getItem('allQuestions');
    if (storedQuestions) {
      const parsedQuestions: Question[] = JSON.parse(storedQuestions);
      setQuestions(parsedQuestions);
      // Set first question
      setCurrentQuestion(parsedQuestions[0]);
    }
  }, []);

  const nextQuestion = () => {
    // Check if the selected answer is correct and update the score
    if ((currentQuestion as Question).correctAnswer === selectedAnswer) {
      setCount((prevCount) => prevCount + 1);
      setShowPopup(true);
    }

    // Increment the question index
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

    // Check if there are more questions
    if (currentQuestionIndex + 1 < questions.length) {
      // Set the next question
      setCurrentQuestion(questions[currentQuestionIndex + 1]);
    } else {
      // No more questions, show the result modal
      setShowResultModal(true);
    }

    // Reset selected answer for the new question
    setSelectedAnswer(null);
  };

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    console.log('Selected Answer:', answer);
  };

  const showToast = (message: string) => {
    toast.info(message, {
      position: "bottom-center",
      autoClose: 5000, // 5 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const resetQuiz = () => {
    setCount(0);
    setCurrentQuestionIndex(0);
    setCurrentQuestion(questions[0]);
    setShowResultModal(false);
  };

  return (
    <div>
      <section className="flex flex-col justify-center items-center p-20">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Question number <span className="text-blue-600 dark:text-blue-500">#{currentQuestionIndex + 1}</span>
        </h1>
        <p className="text-2xl">Score: {count}</p>
        <section className="shadow-2xl my-10 p-10 w-[90%] rounded-lg flex flex-col justify-center items-center shadow-blue-200">
          <h4 className="mb-4 text-sm font-extrabold leading-none tracking-tight text-blue-900 md:text-5xl lg:text-2xl dark:text-white">
            {(currentQuestion as Question).question}
          </h4>
          <div className="flex justify-evenly items-center my-20 flex-wrap w-[90%]">
            {((currentQuestion as Question).answers || []).map((alt, index) => (
              <button
                key={index}
                type="button"
                className="w-[33%] py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border hover:bg-yellow-300 border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700
                    dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={() => handleAnswerClick(alt)}
              >
                {alt}
              </button>
            ))}
          </div>
          <button
            className="bg-white hover:bg-green-400 text-gray-800 font-semibold py-2 px-10 border border-gray-400 rounded shadow"
            onClick={nextQuestion}
          >
            Next
          </button>
        </section>
      </section>
      {showPopup && <Popup closePopup={() => setShowPopup(false)} />}
      <ToastContainer />

      <ResultModal
        isOpen={showResultModal}
        onClose={() => setShowResultModal(false)}
        totalQuestions={questions.length}
        correctAnswers={count}
        score={count}
        onReset={resetQuiz}
      />
    </div>
  );
}
/* eslint-enable */