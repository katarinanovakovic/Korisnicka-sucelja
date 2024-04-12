import React from 'react';

const renderStars = (rating: number) => {
    const totalStars = 5;
    const yellowStars = Math.min(rating, totalStars); // Limit to totalStars
    const emptyStars = totalStars - yellowStars;
  
    const stars = [];
    
    // Add yellow stars
    for (let i = 0; i < yellowStars; i++) {
      stars.push(<span key={i} className="text-4xl text-custom-main-color">★</span>);
    }
  
    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={i + yellowStars} className="text-4xl text-font-color">☆</span>);
    }
  
    return stars;
  };

  export default renderStars;