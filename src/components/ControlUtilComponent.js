'use strict';

import React from 'react';

require('styles//ControlUtil.scss');

class ControlUtilComponent extends React.Component {
  render() {
    return (
      <span className="controller-unit is-center"></span>
    )
  }
}

ControlUtilComponent.displayName = 'ControlUtilComponent';

// Uncomment properties you need
// ControlUtilComponent.propTypes = {};
// ControlUtilComponent.defaultProps = {};

export default ControlUtilComponent;
