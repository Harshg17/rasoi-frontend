import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Courses.css';
import RevealOnScroll from '../components/RevealOnScroll';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Baking');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch courses from your Node/Express backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/courses`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setCourses(data);
        
        // Optionally, set the initial active category to the first one available
        if (data.length > 0) {
          const uniqueCategories = [...new Set(data.map(c => c.category))];
          if (!uniqueCategories.includes('Baking')) {
             setActiveCategory(uniqueCategories[0]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCourses();
  }, []);

  // Show a loading screen while waiting for the database
  if (isLoading) {
    return (
      <div className="courses-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <h2>Loading freshly baked courses...</h2>
      </div>
    );
  }

  // Extract unique categories for the tabs dynamically
  const categories = [...new Set(courses.map(course => course.category))];
  
  // Filter the courses based on the currently clicked tab
  const filteredCourses = courses.filter(course => course.category === activeCategory);

  return (
    <div className="courses-page">
      <div className="courses-header">
        <h2>Explore Our Programs</h2>
        <div className="divider"></div>
      </div>

      {/* DYNAMIC CATEGORY TABS */}
      <div className="category-tabs">
        {categories.map(category => (
          <button 
            key={category} 
            className={`tab-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* DYNAMIC COURSE GRID */}
      <div className="course-grid">
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <Link to={`/course/${course.id}`} key={course.id} className="course-card">
              <h3>{course.title}</h3>
              <p className="click-to-view">View Full Details &rarr;</p>
            </Link>
          ))
        ) : (
          <p style={{ textAlign: 'center', width: '100%', color: '#888' }}>No courses found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Courses;