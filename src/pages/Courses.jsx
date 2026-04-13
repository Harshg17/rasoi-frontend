import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Courses.css';
import RevealOnScroll from '../components/RevealOnScroll';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import loadingAnimation from '../assets/loading.lottie';

const Courses = () => {
  // 1. THE STICKY NOTE: Check sessionStorage first, default to 'Baking' if empty
  const [courses, setCourses] = useState([]);
  const [activeCategory, setActiveCategory] = useState(
    sessionStorage.getItem('savedCategory') || 'Baking'
  );
  const [isLoading, setIsLoading] = useState(true);

  // Fetch courses from your Node/Express backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/courses`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setCourses(data);
        
        // Safety Check: Make sure the currently active category actually exists in the database
        if (data.length > 0) {
          const uniqueCategories = [...new Set(data.map(c => c.category))];
          
          // If the saved category isn't in the database, fallback to the first one available
          if (!uniqueCategories.includes(activeCategory)) {
             setActiveCategory(uniqueCategories[0]);
             sessionStorage.setItem('savedCategory', uniqueCategories[0]);
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

  // 2. THE HANDLER: Update the UI and save to sessionStorage simultaneously
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    sessionStorage.setItem('savedCategory', category);
  };

  // Show a loading screen while waiting for the database
  if (isLoading) {
    return (
      <div className="course-detail-page" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <DotLottieReact
          src={loadingAnimation} 
          loop
          autoplay
          style={{ width: 250, height: 250 }}
        />
        <h3 style={{ marginTop: '20px', color: 'var(--text-dark)' }}>Preparing the kitchen...</h3>
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
            // 3. THE TRIGGER: Call our new handler instead of setActiveCategory directly
            onClick={() => handleCategoryChange(category)}
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
              <p className="course-price" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                {course.basic?.price 
                  ? `${course.basic.price.toLocaleString('en-IN')}` 
                  : 'Price upon enquiry'}
              </p>
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