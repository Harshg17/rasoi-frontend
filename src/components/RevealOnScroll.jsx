import React, { useState, useEffect, useRef } from 'react';

const RevealOnScroll = ({ children, delay = "0s", direction = "up" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 } // Triggers when 10% visible
    );

    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.disconnect(); };
  }, []);

  // Determine starting transform based on direction
  const getTransform = () => {
    if (direction === "up") return "translateY(40px)";
    if (direction === "left") return "translateX(-40px)";
    if (direction === "right") return "translateX(40px)";
    return "translateY(0)";
  };

  const style = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translate(0)" : getTransform(),
    transition: `opacity 0.8s ease, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
    transitionDelay: delay,
    willChange: "opacity, transform"
  };

  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  );
};

export default RevealOnScroll;