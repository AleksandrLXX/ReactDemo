require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ImageUnitComponent from './ImageUnitComponent';
import ControlUtilComponent from './ControlUtilComponent';

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
        <ControlUtilComponent />
        <ImageUnitComponent />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
