import React from 'react';
import './FeaturePhone.scss';

const FeaturePhone = ({ className, phoneImage }) => (
    <div className={className.replace('Intro', '')}>
      <img src={phoneImage} className="phoneImage" alt={`phone screen ${className}`} />
    </div>
  );

  export default FeaturePhone;