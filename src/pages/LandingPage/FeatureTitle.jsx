import React from 'react';
import './FeatureTitle.scss';

const FeatureTitle = ({ title, description, className }) => (
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
  );

  export default FeatureTitle;