import React from 'react';

const Card = ({ children, className = '' }) => (
  <div className={`overflow-hidden rounded-lg bg-white shadow-lg ${className}`}>
    <div className="p-5">{children}</div>
  </div>
);

export default Card;