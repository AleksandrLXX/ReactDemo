'use strict';

import React from 'react';
require('styles//ImageUnit.scss');

class ImageUnitComponent extends React.Component {
	constructor(props){
		super(props);
	}
	//[danger]感觉是个回调陷阱;回调的时候this默认指向null，所以必须要把this传进来，使this指向ImageUnitComponent
	handleClick(e){
		this.props.arrange.isCenter?this.props.inverse():this.props.center();
		e.preventDefault();
        e.stopPropagation();
	}
	handleDoubleClick(e){
		this.props.spin();
		e.preventDefault();
        e.stopPropagation();
	}
  	render() {
  		let styleObj={},
  			that=this,
  			imageUnitClassNames='img-figure';
  		// 如果props属性中指定了这张图片的位置，则使用
        if (this.props.arrange.pos) {
            styleObj = this.props.arrange.pos;
        }

        // 如果图片的旋转角度有值并且不为0， 添加旋转角度
        if (this.props.arrange.rotate) {
          (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach(function (value) {
            styleObj[value] = 'rotate(' + that.props.arrange.rotate + 'deg)';
          });
        }

        // 如果是居中的图片， 添加is-center样式
        if (this.props.arrange.isCenter) {
          imageUnitClassNames+=' is-center';
        }
        // 如果是反转的图片， 添加is-inverse样式
        if (this.props.arrange.isInverse) {
          imageUnitClassNames+=' is-inverse';
        }
        // 如果是旋转的图片，添加is-spin的样式
        if (this.props.arrange.isSpin)
        imageUnitClassNames+=' is-spin';

	    return (
	      <figure className={imageUnitClassNames} style={styleObj} onClick={this.handleClick.bind(this)} onDoubleClick={this.handleDoubleClick.bind(this)}>
	      	<img src={this.props.data.imgURL} alt={this.props.data.title}/>
	      	<figcaption>
	      		<h2 className="img-title">{this.props.data.title}</h2>
	      	</figcaption>
	      	<div className='back-plain'>
	      		<p>{this.props.data.desc}</p>
	      	</div>
	      </figure>
	    );
	 }
}

ImageUnitComponent.displayName = 'ImageUnitComponent';

// Uncomment properties you need
// ImageUnitComponent.propTypes = {};
// ImageUnitComponent.defaultProps = {};

export default ImageUnitComponent;
