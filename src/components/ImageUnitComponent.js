'use strict';
import React, {Component, PropTypes}  from 'react';
require('styles//ImageUnit.scss');

class ImageUnitComponent extends Component {
	constructor(props){
		super(props);
    this.timer=null;
	}
	//[danger]感觉是个回调陷阱;回调的时候this默认指向null，所以必须要把this传进来，使this指向ImageUnitComponent
  //[bug]双击时触发单击事件。[bug]图片旋转时,单击停止后，下次单击时直接旋转的bug
  //业务逻辑:单击时如果组件在旋转，那么仅停止旋转，如果未旋转，判断是否居中，如果已居中，则进行反转。
  //         双击时进行旋转或停止旋转逻辑。
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
ImageUnitComponent.propTypes = {
    arrange:PropTypes.object.isRequired,
    center:PropTypes.func.isRequired,
    inverse:PropTypes.func.isRequired,
    spin:PropTypes.func.isRequired
};
// ImageUnitComponent.defaultProps = {};

export default ImageUnitComponent;
