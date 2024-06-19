import React, { useState, useContext, useRef } from "react";
import axios from "axios";
import "../AdminPanel.css"; // Import CSS file
import { AppContext } from "../index.js";

const AdminPanel = () => {
  const { isLoading, setIsLoading } = useContext(AppContext);
  const custom = useRef(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: [],
    customText: false,
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const addQuestion = () => {
    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({
      question: "",
      options: [],
      customText: false,
    });
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedOptions = [...currentQuestion.options];
    updatedOptions[index] = { option_text: value }; // Update to object with 'option_text' property
    setCurrentQuestion({
      ...currentQuestion,
      options: updatedOptions,
      customText: false,
    });
  };

  const handleQuestionChange = (e) => {
    setCurrentQuestion({
      ...currentQuestion,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddOption = () => {
    if (custom.current) {
      custom.current.style.display = "none";
    }
    const updatedOptions = [...currentQuestion.options, { option_text: "" }]; // Push object with empty 'option_text'
    setCurrentQuestion({
      ...currentQuestion,
      options: updatedOptions,
    });
  };

  const handleDeleteOption = (index) => {
    const updatedOptions = [...currentQuestion.options];
    updatedOptions.splice(index, 1);
    setCurrentQuestion({
      ...currentQuestion,
      options: updatedOptions,
    });
  };

  const handleCustomTextToggle = () => {
    setCurrentQuestion({
      ...currentQuestion,
      customText: !currentQuestion.customText,
      options: [], // Clear options if custom text is selected
    });
  };

  const handleSubmit = () => {
    setIsLoading(true); // Start loading animation
    console.log(questions);
    axios
      .post(
        "https://sousa.beatsbyalif.com/question/create/newQuiz",
        {
          questions: questions,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`, // Add JWT token to the authorization header
          },
        }
      )
      .then((response) => {
        console.log(response.data); // Handle response data if needed
        setShowSuccessMessage(true); // Show success message
      })
      .catch((error) => {
        console.error("Error:", error); // Handle errors
      })
      .finally(() => {
        setIsLoading(false); // Stop loading animation
        setTimeout(() => {
          setShowSuccessMessage(false); // Hide success message after a few seconds
        }, 3000);
      });
  };

  return (
    <div className="cont-over">
      <div className="admin-panel">
        <h1 className="admin-title">Admin Panel</h1>
        <div className="question-form">
          <h2>Create New Question</h2>
          <input
            type="text"
            name="question"
            placeholder="Enter question"
            value={currentQuestion.question}
            onChange={handleQuestionChange}
          />
          <div className="options-container">
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="option-input-container">
                <input
                  type="text"
                  name={`option-${index}`}
                  placeholder={`Option ${index + 1}`}
                  value={option.option_text} // Access 'option_text' property
                  onChange={(e) => handleInputChange(e, index)}
                />
                <span
                  className="delete-option"
                  onClick={() => handleDeleteOption(index)}
                >
                  ✕
                </span>
              </div>
            ))}
            {currentQuestion.customText && (
              <input
                ref={custom}
                type="text"
                name="custom-text"
                placeholder="User will enter text"
                value=""
                onChange={handleQuestionChange}
              />
            )}
          </div>
          <div className="button-container">
            <button onClick={handleAddOption}>Add Option</button>
            <button onClick={handleCustomTextToggle}>
              {currentQuestion.customText ? "Use Options" : "User Input"}
            </button>
          </div>
          <button className="addIt" onClick={addQuestion}>
            Add Question
          </button>
        </div>
        <div className="button-container">
          <button onClick={handleSubmit}>Submit Questions</button>
        </div>
        {isLoading && <div className="loading-animation">Creating quiz...</div>}
        {showSuccessMessage && (
          <div className="success-message">Questionnaire created!</div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
