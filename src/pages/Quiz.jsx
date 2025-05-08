import React, { useState } from "react";
import { traits } from "../data/quizData";
import "/Users/shreyas/Desktop/TrackerProject/styles.css";


const Quiz = () => {
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const traitKeys = Object.keys(traits);
  const currentTrait = traitKeys[step];
  const currentQuestions = traits[currentTrait];

  const handleChange = (index, value) => {
    const updated = { ...answers };
    if (!updated[currentTrait]) updated[currentTrait] = {};
    updated[currentTrait][index] = Number(value);
    setAnswers(updated);
  };

  const handleNext = () => {
    if (step < traitKeys.length - 1) {
      setStep(step + 1);
    } else {
      setSubmitted(true);
      console.log("Final Stats:", calculateScores());
    }
  };

  const calculateScores = () => {
    const scores = {};
    for (let trait of traitKeys) {
      const values = Object.values(answers[trait] || {});
      const sum = values.reduce((a, b) => a + b, 0);
      scores[trait] = Math.round(sum / values.length || 0);
    }
    return scores;
  };

  if (submitted) {
    const results = calculateScores();
    return (
      <div className="quiz-results">
        <h2>Your Stats</h2>
        <ul>
          {Object.entries(results).map(([trait, score]) => (
            <li key={trait}>
              <strong>{trait}:</strong> {score}/5
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2>{currentTrait} Questions</h2>
      {currentQuestions.map((q, i) => (
        <div key={i} className="quiz-question">
          <label>{q}</label>
          <select onChange={(e) => handleChange(i, e.target.value)} required>
            <option value="">Select</option>
            <option value="1">1 - Very Poor</option>
            <option value="2">2 - Poor</option>
            <option value="3">3 - Average</option>
            <option value="4">4 - Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div>
      ))}
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Quiz;
