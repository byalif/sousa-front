import React, { useState, useContext, useRef } from "react";
import axios from "axios";
import "../Coaching.css"; // Import CSS file
import { AppContext } from "../index.js";

const Coaching = () => {
  const { isLoading, setIsLoading } = useContext(AppContext);
  const [questions, setQuestions] = useState([
    {
      question: "What are your fitness goals?",
      options: [
        "Increase muscle strength and size.",
        "Improve cardiovascular endurance.",
        "Lose weight and reduce body fat.",
        "Enhance flexibility and mobility.",
      ],
    },
    {
      question: "What is your current fitness level?",
      options: [
        "Sedentary lifestyle, little to no exercise.",
        "Moderate activity level, exercise occasionally.",
        "Regular exerciser, 3-4 times per week.",
        "Highly active, exercise almost daily.",
      ],
    },
    {
      question: "What type of exercise do you enjoy the most?",
      options: [
        "Strength training with weights.",
        "High-intensity interval training (HIIT).",
        "Cardio activities like running or cycling.",
        "Mind-body exercises such as yoga or Pilates.",
      ],
    },
    {
      question: "Do you have any specific dietary restrictions or preferences?",
      options: [
        "No dietary restrictions, eat a balanced diet.",
        "Follow a vegetarian or vegan diet.",
        "Gluten-free or dairy-free due to allergies.",
        "Prefer low-carb or ketogenic diet for weight loss.",
      ],
    },
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(0));
  const [email, setEmail] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [response, setResponse] = useState(null);
  const [showOptionSelectMessage, setShowOptionSelectMessage] = useState(false);

  const emailInputRef = useRef(null);
  const optionSelectMessageRef = useRef(null);

  const handleNext = () => {
    if (!showEmailInput) {
      if (currentQuestionIndex < questions.length - 1) {
        if (answers[currentQuestionIndex] !== null) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          // Show message to select an option
          setShowOptionSelectMessage(true);
        }
      } else {
        setShowEmailInput(true);
      }
    } else {
      if (!email.trim()) {
        emailInputRef.current.focus();
        emailInputRef.current.style.borderColor = "red";
        return;
      }

      if (/^\S+@\S+\.\S+$/.test(email.trim())) {
        emailInputRef.current.style.borderColor = "";
        const finalResponse = {
          email: email.trim(),
          questions: questions.map((question, index) => ({
            question: question.question,
            answer:
              answers[index] !== null ? question.options[answers[index]] : "",
          })),
        };
        setIsLoading(true);
        axios
          .post(
            "http://a6ec00542b65a4179ad8913259a961e3-956403552.us-east-2.elb.amazonaws.com/question/client/submitQuestions",
            finalResponse
          )
          .then((res) => {
            setIsLoading(false);
            setResponse(res.data);
            console.log(res.data);
            // Handle success response here
          })
          .catch((err) => {
            setIsLoading(false);
            console.error("Error:", err);
            // Handle error response here
          });
      } else {
        emailInputRef.current.focus();
        emailInputRef.current.style.borderColor = "red";
      }
    }
  };

  const handlePrevious = () => {
    setShowEmailInput(false);
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleOptionSelect = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);

    // Hide the option select message
    setShowOptionSelectMessage(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value.trim()) {
      emailInputRef.current.style.borderColor = "";
    }
  };

  return (
    <div className="full-cont">
      <div className="questionnaire-container">
        <h1 className="questionnaire-title">
          Quick Questionnaire before we get started!
        </h1>
        <div className="intro-text">
          <p>
            1:1 online coaching is designed to guide you every step of the way.
            This intake form is your passport to unlocking your full potential.
            By providing the essential information we need to ensure that I am a
            suitable coach that aligns perfectly with your aspirations. Your
            success is our top priority, and this is where it all begins. Online
            coaching with me includes; personalized training program catered to
            your fitness goals and aspirations, meal plan designed to ensure
            you're fueling your body necessary while catering to your desired
            body composition, 24/7 communication for your support and guidance
            (send video footage of lifts to correct form and technique etc.),
            and weekly check-ins to ensure the plan we curate is working
            effectively. I've been resistance training for nearly ten years and
            studied Exercise Science at The State University of New York at
            Cortland. Weightlifting has had such a positive impact on my life
            both physically and mentally. I gained the confidence to be the best
            version of myself and it all started in the gym. If you are not
            aware of my transformation I'd love to share it with you. So, let's
            dive in! Please take a few moments to complete this intake form
            truthfully and comprehensively. The more I know about you, the
            better I can tailor our guidance and support to help you reach your
            fitness goals faster and with greater precision. Remember, this is
            not just about achieving physical fitness; it's about embracing a
            healthier, happier lifestyle that lasts. Together, we will sculpt
            the best version of yourself. Let's start shaping your future today!
          </p>
        </div>
        {!showEmailInput && (
          <div className="question-container">
            <h2 className="question">
              {questions[currentQuestionIndex].question}
            </h2>
            <div className="options-grid">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <div
                  key={index}
                  className={`option-label ${
                    answers[currentQuestionIndex] === index ? "active" : ""
                  }`}
                  onClick={() => handleOptionSelect(index)}
                >
                  {option}
                </div>
              ))}
            </div>
            {showOptionSelectMessage && (
              <p
                ref={optionSelectMessageRef}
                className={`option-select-message`}
              >
                Please select an option before proceeding.
              </p>
            )}
            <div className="button-container">
              <button
                className="prev-button"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </button>
              <button className="next-button" onClick={handleNext}>
                {currentQuestionIndex === questions.length - 1
                  ? "Next"
                  : "Next"}
              </button>
            </div>
          </div>
        )}
        {!response && !isLoading && showEmailInput && (
          <div className="completion-container">
            <h2 className="completion-message">
              Please enter your email to submit the questionnaire!
            </h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              ref={emailInputRef}
              className="email-input"
            />
            <p className="email-info">* Please enter a valid email address.</p>
            <div className="button-container">
              <button
                className="prev-button"
                onClick={() => setShowEmailInput(false)}
              >
                Previous
              </button>
              <button className="next-button" onClick={handleNext}>
                Submit
              </button>
            </div>
          </div>
        )}
        {isLoading && (
          <div className="loading-container">
            <p className="loading-message">Submitting questions...</p>
            <div className="loading-animation"></div>
          </div>
        )}
        {response && !isLoading && (
          <div className="response-container">
            <h2 className="response-message">
              Thank you for completing the questionnaire!
            </h2>
            <p className="response-info">
              We will review your responses and get back to you within 2-3
              business days.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Coaching;
