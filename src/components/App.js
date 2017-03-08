require('normalize.css/normalize.css');
require('styles/App.scss');
require('styles/keyframes.css');

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreaters from '../actions';
import React, {Component, PropTypes}  from 'react';
import ReactDOM from 'react-dom';
import ImageUnit from './ImageUnitComponent';
import ControlUtil from './ControlUtilComponent';


class AppComponent extends Component {
    constructor(props) {
        super(props);
    }
    /**
     * [center description]
     * @param  {[num]} centerIndex [要居中的imageUnit编号]
     * @return {[function]}        [使centerIndex居中的函数]
     */
    center(centerIndex) {
        return ()=>{this.props.center(centerIndex)};
    }
 /**
  * [inverse ]
  * @param  {[num]} inverseIndex      [要翻转的imageUnit编号]
  * @return {[function]}              [使inverseIndex翻转的函数]
  */
    inverse(inverseIndex){
        return ()=>{
            // let newImgsArrangeArr=null;
            // newImgsArrangeArr=this.state.imgsArrangeArr;
            // newImgsArrangeArr[inverseIndex].isInverse=!newImgsArrangeArr[inverseIndex].isInverse;
            // this.setState({
            //     imgsArrangeArr:newImgsArrangeArr
            // })
            this.props.inverse(inverseIndex);
            // this.setState({});
        }
    }
    /**
     * [spin description]
     * @param  {[num]} spinIndex [要旋转的imageUnit编号]
     * @return {[type]}          [使spinIndex旋转的函数]
     */
    spin(spinIndex){
        return ()=>{
            // let newImgsArrangeArr=null;
            // newImgsArrangeArr=this.state.imgsArrangeArr;
            // newImgsArrangeArr[spinIndex].isSpin=!newImgsArrangeArr[spinIndex].isSpin;
            // this.setState({
            //     imgsArrangeArr:newImgsArrangeArr
            // })
            this.props.spin(spinIndex);
            // this.setState({});
        }
    }
    /**
     * [rearrange ]
     * @param  {[num]} centerIndex [要居中的图片编号]
     * @return null 重新设置state里的信息使centerIndex居中,
     * 并使未居中的图片isCenter为false
     */

    componentDidMount(){
    /**
     * [stageDOM 舞台大小]
     */
    let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight;    
    /**
     * [imgUnitDOM 图片大小]
     */
    let imgUnitDOM = ReactDOM.findDOMNode(this.refs.imgUnit0),
        imgW = imgUnitDOM.scrollWidth,
        imgH = imgUnitDOM.scrollHeight;

    this.props.setConstant({
        stageW:stageW,
        stageH:stageH,
        imgW:imgW,
        imgH:imgH
    })
    this.props.center(0);
    }
    // 可以筛选render的条件。
    // shouldComponentUpdate(nextProps, nextState) {
    //   console.log('shouldComponentUpdate'); 
    //   console.log(this.props.imgsArrangeArr !== nextProps.imgsArrangeArr?'true':'false');
    //   return this.props.imgsArrangeArr !== nextProps.imgsArrangeArr;
    // }
    render() {
        let imageUnits = [];
        let controlUtils = [];
        this.props.imageDatas.forEach((imageData, index) => {
            imageUnits.push( <ImageUnit data = {imageData}
            key = {index} ref={'imgUnit'+index} arrange={this.props.imgsArrangeArr[index]} index={index}
            center={this.center(index)} inverse={this.inverse(index)} spin={this.spin(index)}/>);
            controlUtils.push( <ControlUtil key = {index} arrange={this.props.imgsArrangeArr[index]}
             center={this.center(index)} inverse={this.inverse(index)} spin={this.spin(index)}/>);
        });
            return ( 
                < section className = 'stage' ref='stage'>
                    < section className = "imgs-sec" > 
                        {imageUnits} 
                    < /section> 
                    < section className = 'controller-sec' > 
                        {controlUtils} 
                    < /section> 
                < /section >
            );
    }
}

AppComponent.defaultProps = {};

//将state.counter绑定到props
function mapStateToProps(state) {
  return {imageDatas:state.imageDatas,
          imgsArrangeArr:state.layout.imgsArrangeArr,
          Constant:state.layout.layoutConstant
        };
}

//将action的所有方法绑定到props上,bindActionCreators可以批量导入actionCreater，设置键名为函数名，并在外层包裹dispatch方法
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreaters, dispatch); 
}



export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);