'use strict';

import React, {Component, PropTypes} from 'react';

require('styles//ControlUtil.scss');

class ControlUtilComponent extends Component {
	constructor(props) {
		super(props);
    this.timer=null;
	}

  //[bug]双击时触发单击事件。[bug]图片旋转时,单击停止后，下次单击时直接旋转的bug
    handleClick(e){
      clearTimeout(this.timer);
      this.timer=setTimeout(()=>{
        if(this.props.arrange.isSpin){this.props.spin();}
        else this.props.arrange.isCenter?this.props.inverse():this.props.center();
      },200);
      e.stopPropagation();
      e.preventDefault();
    }
    handleDoubleClick(e){
      clearTimeout(this.timer);
      this.props.spin();
      e.stopPropagation();
      e.preventDefault();
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
     }

	// 如果是旋转的图片，添加is-spin的样式
	if (this.props.arrange.isSpin){
	 	controlUtilClassNames+=' is-spin';
  	}
    return (
      <span className={controlUtilClassNames} onClick={this.handleClick.bind(this)} onDoubleClick={this.handleDoubleClick.bind(this)}>
      </span>
    )
  }
}

ControlUtilComponent.displayName = 'ControlUtilComponent';

// Uncomment properties you need
  ControlUtilComponent.propTypes = {
    arrange:PropTypes.object.isRequired,
    center:PropTypes.func.isRequired,
    inverse:PropTypes.func.isRequired,
    spin:PropTypes.func.isRequired
  };
// ControlUtilComponent.defaultProps = {};

export default ControlUtilComponent;