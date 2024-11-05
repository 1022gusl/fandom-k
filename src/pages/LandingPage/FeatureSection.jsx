import React from 'react';
import './FeatureSection.scss';
import FeatureTitle from './FeatureTitle';
import FeaturePhone from './FeaturePhone';
import FeatureBackground from './FeatureBackground';

const FeatureSection = (props) => {
  return (
    <section className={props.className}>
      <div className="background">
        <FeatureTitle {...props} />
        <FeatureBackground {...props} />
        <FeaturePhone {...props} />
        {props.hasNavyStripe && <div className="navyStripe"></div>}
      </div>
    </section>
  );
};

export default FeatureSection;