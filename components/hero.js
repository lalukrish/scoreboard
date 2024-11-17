"use client";
import React, { useState, useEffect } from "react";

const Hero = () => {
  const images = ["/m_image1.jpg", "/image2.jpg", "/empuran.jpg"]; // Add paths to your images
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [images.length]);

  return (
    <section
      id="hero"
      className="h-screen bg-cover bg-center flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${images[currentImageIndex]})`,
        transition: "background-image 1s ease-in-out",
      }}
    >
      <h1 className="text-5xl font-bold">Welcome to Writeup100</h1>
    </section>
  );
};

export default Hero;
