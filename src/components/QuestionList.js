import React from 'react';
import { Link } from 'react-router-dom';
import questionsData from '../questionsData';
  
const QuestionList = () => {
  // Format the number in a simple way
  const formatNumber = (num) => {
    return `${num}`;
  };
  
  return (
    <div className="question-list">
      <div className="list-header">
        <h2>FSD ASSIGNMENT II</h2>
        <p className="subtitle">A collection of practical React code questions and solutions</p>
      </div>
      
      <ul className="examples-grid">
        {questionsData.map((question) => (
          <li key={question.id} className="question-item">
            <Link to={`/question/${question.id}`}>
              <div className="question-card">
                <div className="card-number">{formatNumber(question.id)}</div>
                <h3>{question.question}</h3>
                <div className="view-solution">View Solution →</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;