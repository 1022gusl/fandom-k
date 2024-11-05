import React from 'react';
import './FeatureSection.scss';

const FeatureSection = ({ 
  title, 
  description, 
  backgroundImage, 
  phoneImage, 
  className,
  hasNavyStripe = false 
}) => {
  return (
    <section className={className}>
      <div className="background">
        <div className={`${className}Text`}>
          <span className="nolang">{title}</span>
          <h2 className="heading2">
            {description.split('<br>').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < description.split('<br>').length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>
        </div>

        <div className={className === 'monthlyArtistIntro' ? 'backgroundGradiExcept' : 'linearGradient'}>
          <img src={backgroundImage} className="ra" alt="background gradient" />
        </div>

        <div className={className.replace('Intro', '')}>
          <img src={phoneImage} className="phoneImage" alt={`phone screen ${className}`} />
        </div>

        {hasNavyStripe && <div className="navyStripe"></div>}
      </div>
    </section>
  );
}

export default FeatureSection;