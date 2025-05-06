import React from 'react';
import { useParams, Link } from 'react-router-dom';
import questionsData from '../questionsData';

const QuestionDetail = () => {
  const { id } = useParams();
  const questionId = parseInt(id);
  
  // Find the question with the matching ID
  const question = questionsData.find(q => q.id === questionId);
  
  if (!question) {
    return (
      <div className="question-detail not-found">
        <div className="not-found-content">
          <h2>Question not found</h2>
          <p>The example you're looking for doesn't exist or has been moved.</p>
          <Link to="/" className="back-link">Back to Examples</Link>
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
          <pre key={`code-${index}`} className="code-block">
            <code>{code}</code>
          </pre>
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
        <span className="question-number">Example #{question.id}</span>
        <h2>{question.question}</h2>
      </div>
      
      <div className="answer">
        {formatAnswer(question.answer)}
      </div>
      
      <div className="navigation-controls">
        <div className="nav-buttons">
          <Link to="/" className="back-link">
            <span className="nav-icon">←</span> All Examples
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