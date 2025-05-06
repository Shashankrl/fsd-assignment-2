import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import questionsData from '../questionsData';

// No categories needed

const QuestionDetail = () => {
  const { id } = useParams();
  const questionId = parseInt(id);
  const [copySuccess, setCopySuccess] = useState(false);
  
  // Find the question with the matching ID
  const question = questionsData.find(q => q.id === questionId);
  
  // Function to handle code copying
  const copyToClipboard = () => {
    // Extract code from the answer (between ```jsx and ```)
    const codeMatch = question.answer.match(/```jsx\n([\s\S]*?)```/);
    if (codeMatch && codeMatch[1]) {
      navigator.clipboard.writeText(codeMatch[1])
        .then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    }
  };
  
  // No category tags needed
  
  // Format the number in a simple way
  const formatNumber = (num) => {
    return `${num}`;
  };
  
  if (!question) {
    return (
      <div className="question-detail not-found">
        <div className="not-found-content">
          <h2>Question not found</h2>
          <p>The question you're looking for doesn't exist or has been moved.</p>
          <Link to="/" className="back-link">Back to Questions</Link>
        </div>
      </div>
    );
  }
  
  // Function to format code blocks in the answer
  const formatAnswer = (text) => {
    if (!text) return '';
    
    // Split by code blocks
    const parts = text.split('```');
    
    return parts.map((part, index) => {
      // Even indices are regular text, odd indices are code blocks
      if (index % 2 === 0) {
        // Regular text: split by newlines and create paragraphs
        return part.split('\n').map((line, i) => 
          line ? <p key={`text-${index}-${i}`}>{line}</p> : <br key={`br-${index}-${i}`} />
        );
      } else {
        // Code block: remove the language identifier (jsx) and format
        const code = part.replace(/^jsx\n/, '');
        return (
          <div key={`code-container-${index}`} className="code-container">
            <button 
              className={`copy-button ${copySuccess ? 'copied' : ''}`} 
              onClick={copyToClipboard}
              title={copySuccess ? 'Copied!' : 'Copy to clipboard'}
            >
              {copySuccess ? 
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : 
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path></svg>
              }
            </button>
            <pre key={`code-${index}`} className="code-block">
              <code>{code}</code>
            </pre>
          </div>
        );
      }
    });
  };
  
  // Get previous and next question IDs for navigation
  const currentIndex = questionsData.findIndex(q => q.id === questionId);
  const prevQuestion = currentIndex > 0 ? questionsData[currentIndex - 1] : null;
  const nextQuestion = currentIndex < questionsData.length - 1 ? questionsData[currentIndex + 1] : null;
  
  return (
    <div className="question-detail">
      <div className="question-header">
        <div className="detail-number">{formatNumber(question.id)}</div>
        <h2>{question.question}</h2>
      </div>
      
      <div className="answer">
        {formatAnswer(question.answer)}
      </div>
      
      <div className="navigation-controls">
        <div className="nav-buttons">
          <Link to="/" className="back-link">
            <span className="nav-icon">←</span> All Questions
          </Link>
          
          <div className="prev-next-controls">
            {prevQuestion && (
              <Link to={`/question/${prevQuestion.id}`} className="nav-link prev-link">
                <span className="nav-icon">←</span> Previous
              </Link>
            )}
            
            {nextQuestion && (
              <Link to={`/question/${nextQuestion.id}`} className="nav-link next-link">
                Next <span className="nav-icon">→</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;