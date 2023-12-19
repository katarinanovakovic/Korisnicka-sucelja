import React from 'react';


interface BackgroundProps {
  imageUrl: string;
  children: React.ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ imageUrl, children }) => (
  <div
    style={{
      position: 'relative',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff', // Set text color to contrast with the background
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    >
      <img
        src={imageUrl}
        alt="Background Image"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
    {children}
  </div>
);

export default Background;
