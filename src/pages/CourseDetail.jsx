import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import RevealOnScroll from '../components/RevealOnScroll';
import './CourseDetail.css';

const CourseDetail = () => {
  const { id } = useParams(); 
  
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdvanced, setIsAdvanced] = useState(false);
  
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/courses/${id}`);
        if (response.ok) {
          const data = await response.json();
          setCourse(data);
        } else {
          setCourse(null);
        }
      } catch (error) {
        console.error("Failed to fetch course:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const enquiryPayload = {
      name: formData.name,
      phone: formData.phone,
      courseTitle: course.title,
      tier: course.hasTiers ? (isAdvanced ? 'Advanced' : 'Basic') : 'Standard',
      message: formData.message
    };

    try {
      const response = await fetch('http://localhost:5000/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enquiryPayload),
      });

      if (response.ok) {
        alert(`Success! We have received your enquiry for ${course.title}.`);
        setFormData({ name: '', phone: '', message: '' }); 
      } else {
        alert('Something went wrong saving to the database. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to connect to the server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="course-detail-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <h2>Loading course details...</h2>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="course-detail-page page-not-found">
        <h2>Course Not Found</h2>
        <p>The course you are looking for doesn't exist or has been removed.</p>
        <Link to="/courses" className="cta-button">Back to Courses</Link>
      </div>
    );
  }

  return (
    <div className="course-detail-page">
      <RevealOnScroll delay="0s" direction="up">
        <div className="course-banner" style={{ backgroundImage: `url(${course.image})` }}>
          <div className="banner-overlay">
            <h1>{course.title}</h1>
          </div>
        </div>
      </RevealOnScroll>

      <div className="course-content-wrapper">
        <RevealOnScroll direction="left" delay="0.2s">
          <div className="course-main-info">
            <h2>About This Course</h2>
            <p className="course-description">{course.description}</p>

            {course.hasTiers && (
              <div className="tier-toggle">
                <span className={!isAdvanced ? 'active-tier' : ''}>Basic</span>
                <label className="switch">
                  <input type="checkbox" checked={isAdvanced} onChange={() => setIsAdvanced(!isAdvanced)} />
                  <span className="slider round"></span>
                </label>
                <span className={isAdvanced ? 'active-tier' : ''}>Advanced</span>
              </div>
            )}

            <div className="curriculum-box">
              <h3>What You Will Learn:</h3>
              
              {!isAdvanced ? (
                // --- BASIC VIEW (Single Column) ---
                <ul className="curriculum-list">
                  {course.basic.items.map((item, index) => (
                    <li key={index}><span className="check-icon">✔️</span> {item}</li>
                  ))}
                </ul>
              ) : (
                // --- ADVANCED VIEW (Side-by-Side) ---
                <div className="curriculum-side-by-side">
                  <div className="curriculum-column">
                    <h4>Basic Curriculum</h4>
                    <ul className="curriculum-list">
                      {course.basic.items.map((item, index) => (
                        <li key={index}><span className="check-icon">✔️</span> {item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="curriculum-column advanced-column">
                    <h4>Advanced Additions</h4>
                    <ul className="curriculum-list">
                      {course.advanced.items.map((item, index) => (
                        <li key={index}><span className="check-icon">✨</span> {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll direction="right" delay="0.4s">
          <div className="course-sidebar">
            <div className="pricing-card">
              <h3>Course Fee</h3>
              <div className="price-tag">
                {isAdvanced ? course.advanced.price : course.basic.price}
              </div>
              <p className="tier-note">{course.hasTiers ? `Selected: ${isAdvanced ? 'Advanced' : 'Basic'} Tier` : 'Standard Tier'}</p>
            </div>

            <div className="enquiry-card">
              <h3>Enquire Now</h3>
              <form onSubmit={handleEnquirySubmit} className="enquiry-form">
                <div className="input-group">
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Full Name" />
                </div>
                <div className="input-group">
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="WhatsApp Number" />
                </div>
                <div className="input-group">
                  <textarea name="message" rows="3" value={formData.message} onChange={handleChange} placeholder="Any questions?"></textarea>
                </div>
                <button type="submit" className="cta-button full-width" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Enquiry'}
                </button>
              </form>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
};

export default CourseDetail;