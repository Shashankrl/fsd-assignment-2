import React from 'react';
import { useParams, Link } from 'react-router-dom';
import questionsData from '../questionsData';

// Categories for tagging
const categories = [
  { id: 'basics', name: 'React Basics', tag: 'Basics', ids: [1, 2, 3, 4] },
  { id: 'hooks', name: 'Hooks', tag: 'Hooks', ids: [2, 9, 13, 18] },
  { id: 'components', name: 'Components', tag: 'Component', ids: [4, 5, 6, 7, 14] },
  { id: 'forms', name: 'Forms & User Input', tag: 'Form', ids: [8, 15, 20, 21, 22] },
  { id: 'state', name: 'State Management', tag: 'State', ids: [5, 12, 16, 19, 23] },
  { id: 'effects', name: 'Effects & Lifecycle', tag: 'Effect', ids: [9, 13, 17, 18] },
  { id: 'routing', name: 'Routing', tag: 'Router', ids: [10, 11] }
];

const QuestionDetail = () => {
  const { id } = useParams();
  const questionId = parseInt(id);
  
  // Find the question with the matching ID
  const question = questionsData.find(q => q.id === questionId);
  
  // Get category tags for a question
  const getCategoryTags = (id) => {
    // Find which categories this question belongs to
    return categories
      .filter(cat => cat.ids && cat.ids.includes(id))
      .map(cat => cat.tag);
  };
  
  // Format the number in a more elegant way
  const formatNumber = (num) => {
    // Convert to padded string with leading zeros
    return `EX-${String(num).padStart(2, '0')}`;
  };
  
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
        <div className="detail-number">{formatNumber(question.id)}</div>
        <div className="tag-container">
          {getCategoryTags(question.id).map((tag, index) => (
            <span key={index} className="detail-tag">{tag}</span>
          ))}
        </div>
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