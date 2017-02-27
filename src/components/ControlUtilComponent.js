'use strict';

import React from 'react';

require('styles//ControlUtil.scss');

class ControlUtilComponent extends React.Component {
	constructor(props) {
		super(props);
	}
	handleClick(e){
		this.props.arrange.isCenter?this.props.inverse():this.props.center();
		e.preventDefault();
        e.stopPropagation();
	}
  render() {
  	let controlUtilClassNames="controller-unit";
  	// 如果是居中的图片， 添加is-center样式
  	if (this.props.arrange.isCenter) {
  	 	controlUtilClassNames+=' is-center';
  	}
  	// 如果是反转的图片， 添加is-inverse样式
  	if (this.props.arrange.isInverse) {
  	 	controlUtilClassNames+=' is-inverse';
	// 如果是旋转的图片，添加is-spin的样式
	if (this.props.arrange.isSpin)
	 	controlUtilClassNames+=' is-spin';
  	}
    return (
      <span className={controlUtilClassNames} onClick={this.handleClick.bind(this)}></span>
    )
  }
}

ControlUtilComponent.displayName = 'ControlUtilComponent';

// Uncomment properties you need
// ControlUtilComponent.propTypes = {};
// ControlUtilComponent.defaultProps = {};

export default ControlUtilComponent;
