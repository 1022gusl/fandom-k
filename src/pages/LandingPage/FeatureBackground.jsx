import React from 'react';
import './FeatureBackground.scss';

const FeatureBackground = ({ className, backgroundImage }) => (
    <div className={className === 'monthlyArtistIntro' ? 'backgroundGradiExcept' : 'linearGradient'}>
      <img src={backgroundImage} className="ra" alt="background gradient" />
    </div>
  );

export default FeatureBackground;