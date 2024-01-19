import React from 'react';

const renderStars = (rating: number) => {
    const totalStars = 5;
    const yellowStars = Math.min(rating, totalStars); // Limit to totalStars
    const emptyStars = totalStars - yellowStars;
  
    const stars = [];
    
    // Add yellow stars
    for (let i = 0; i < yellowStars; i++) {
      stars.push(<span key={i} className="star yellow-star">★</span>);
    }
  
    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={i + yellowStars} className="star">☆</span>);
    }
  
    return stars;
  };

  export default renderStars;