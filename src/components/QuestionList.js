import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import questionsData from '../questionsData';

const QuestionList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState(questionsData);
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Examples' },
    { id: 'basics', name: 'React Basics', ids: [1, 2, 3, 4] },
    { id: 'hooks', name: 'Hooks', ids: [2, 9, 13, 18] },
    { id: 'components', name: 'Components', ids: [4, 5, 6, 7, 14] },
    { id: 'forms', name: 'Forms & User Input', ids: [8, 15, 20, 21, 22] },
    { id: 'state', name: 'State Management', ids: [5, 12, 16, 19, 23] },
    { id: 'effects', name: 'Effects & Lifecycle', ids: [9, 13, 17, 18] },
    { id: 'routing', name: 'Routing', ids: [10, 11] }
  ];
  
  // Filter questions based on search term and active category
  useEffect(() => {
    let results = questionsData;
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(question =>
        question.question.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (activeCategory !== 'all') {
      const categoryIds = categories.find(cat => cat.id === activeCategory)?.ids || [];
      results = results.filter(question => categoryIds.includes(question.id));
    }
    
    setFilteredQuestions(results);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, activeCategory]);
  
  // Clear search input
  const clearSearch = () => {
    setSearchTerm('');
  };
  
  return (
    <div className="question-list">
      <div className="list-header">
        <h2>FSD ASSIGNMENT II</h2>
        <p className="subtitle">A collection of practical React code examples and solutions</p>
      </div>
      
      <div className="filters-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search examples..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button className="clear-search" onClick={clearSearch}>×</button>
          )}
        </div>
        
        <div className="categories-filter">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="question-count">
        Showing {filteredQuestions.length} of {questionsData.length} examples
      </div>
      
      {filteredQuestions.length > 0 ? (
        <ul className="examples-grid">
          {filteredQuestions.map((question) => (
            <li key={question.id} className="question-item">
              <Link to={`/question/${question.id}`}>
                <div className="question-card">
                  <span className="question-number">#{question.id}</span>
                  <h3>{question.question}</h3>
                  <div className="view-solution">View Solution →</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-results">
          <p>No examples match your search criteria.</p>
          <button onClick={() => {setSearchTerm(''); setActiveCategory('all');}}>
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionList;