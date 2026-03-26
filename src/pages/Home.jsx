import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import RevealOnScroll from '../components/RevealOnScroll';

import chefimage from '../assets/IMG_5666.png';
import slide1 from '../assets/hero1.png';
import slide2 from '../assets/hero2.png';
import slide3 from '../assets/hero3.png';

// --- Scroll Reveal Helper Component ---


const Home = () => {
  const images = [
    slide1, slide2, slide3
  ];
  
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 6000); // Slightly longer for the slow-zoom effect
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <section className="hero">
        {images.map((img, index) => (
          <div 
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}
        
        {/* Placed overlay outside the map so text animates independently */}
        <div className="hero-overlay">
          <div className="hero-content">
            <h2 className="animate-slide-down">Master the Art of Cooking</h2>
            <p className="animate-fade-in">Join Rasoi Classes for Baking, Cooking, and One-Day Workshops.</p>
            <a href='/courses'><button className="cta-button pulse-anim" >Explore Courses</button></a>
          </div>
        </div>
      </section>

      {/* ABOUT OUR CLASSES SECTION */}
      <section className="about-classes">
        <RevealOnScroll>
          <div className="section-header">
            <h2>Our Offerings</h2>
            <div className="divider animated-divider"></div>
          </div>
        </RevealOnScroll>

        <div className="classes-grid">
          <RevealOnScroll delay="0s">
            <div className="class-card">
              <div className="card-icon">🍞</div>
              <h3>Baking Basics & Pro</h3>
              <p>From fluffy bread to decadent cakes, learn the science and art of baking with hands-on practice.</p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay="0.2s">
            <div className="class-card highlight-card">
              <div className="card-icon">🥘</div>
              <h3>Culinary Masterclass</h3>
              <p>Dive deep into Indian and Continental cuisines. Perfect for beginners and aspiring chefs alike.</p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay="0.4s">
            <div className="class-card">
              <div className="card-icon">⏱️</div>
              <h3>One-Day Workshops</h3>
              <p>Short on time? Join our specialized weekend workshops for quick, fun, and delicious learning.</p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ABOUT INSTRUCTOR SECTION */}
      <section className="about-instructor">
        <RevealOnScroll delay="0s">
          <div className="instructor-content">
            <h2>Meet Your Instructor</h2>
            <div className="divider"></div>
            <p>With over 10 years of experience in the culinary & baking world, Mrs. Savita Gupta brings passion, expertise, and a pinch of love to every class. Believing that anyone can cook, the classes are designed to be approachable, fun, and highly educational.</p>
      
          </div>
        </RevealOnScroll>
        
        <RevealOnScroll delay="0.3s">
          <div className="instructor-image">
            <div className="image-backdrop"></div>
            <img src={chefimage} alt="Head Chef" />
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
};

export default Home;