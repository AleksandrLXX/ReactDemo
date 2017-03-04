require('normalize.css/normalize.css');
require('styles/App.scss');
require('styles/keyframes.css')

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreaters from '../actions'
import React, {Component, PropTypes}  from 'react';
import ReactDOM from 'react-dom';
import ImageUnit from './ImageUnitComponent';
import ControlUtil from './ControlUtilComponent';

/**
 * [getRangeRandom 获取区间内的一个随机值]
 * @param  {[num]} low  [小值]
 * @param  {[num]} high [大值]
 * @return {[num]}      [中间值]
 */
function getRangeRandom(low, high) {
    return Math.ceil(Math.random() * (high - low) + low);
}

/**
 * [get30DegRandom description]
 * @return {[string]} [0-30°之间一个任意正负值]
 */
function get30DegRandom() {
  return ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30));
}


/**
 *由于没有redux，所有数据和action都由AppComponent管理，分发.
 *Constant 图片的取值范围,
 *图片排布后有四个位置区域 center leftSec rightSec topSec
 */
class AppComponent extends Component {
    constructor(props) {
        super(props);
        this.Constant = {
            centerPos: {
              left: 0,
              top: 0
            },
            /**
             * [hPosRange 水平方向取值范围]
             */
            hPosRange: {
              leftSec: [0, 0],
              rightSec: [0, 0],
              topSec: [0, 0]
            },
            /**
             * [vPosRange 垂直方向取值范围]
             */
            vPosRange: {
              leftSec: [0, 0],
              rightSec: [0, 0],
              topSec: [0, 0]
            }
        };
    }
    /**
     * [center description]
     * @param  {[num]} centerIndex [要居中的imageUnit编号]
     * @return {[function]}        [使centerIndex居中的函数]
     */
    center(centerIndex){
        return ()=>{this.rearrange(centerIndex)}
        //相当于
        //let that=this;
        // return function(){
        //    that.rearrange(centerIndex);
        // }
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
    rearrange(centerIndex){
        let imgsArrangeArr = this.props.imgsArrangeArr,
            Constant = this.Constant,
            centerPos = Constant.centerPos,
            hPosRange = Constant.hPosRange,
            vPosRange = Constant.vPosRange,
            hPosRangeLeftSec = hPosRange.leftSec,
            hPosRangeRightSec = hPosRange.rightSec,
            hPosRangeTopSec = hPosRange.topSec,
            vPosRangeLeftSec = vPosRange.leftSec,
            vPosRangeRightSec = vPosRange.rightSec,
            vPosRangeTopSec = vPosRange.topSec;
        /**
         * [center图片处理]
         */
        let imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);
        imgsArrangeCenterArr[0] = {
          pos: centerPos,
          rotate: 0,
          isCenter: true
        };
        /**
         * [topSec图片处理]
         * [topImgNum bug]
         * topImgNum 在topSec上的图片数量，在图片数量大于0时可取1。
         * [topImgSpliceIndex bug]
         * topImgSpliceIndex应该取floor,而不是ceil
         */
        let imgsArrangeTopArr = [],
            topImgNum = imgsArrangeArr.length>0?Math.floor(Math.random() * 2):0, 
            topImgSpliceIndex = 0;

        topImgSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

        imgsArrangeTopArr.forEach((value, index) => {
            imgsArrangeTopArr[index] = {
              pos: {
                  top: getRangeRandom(vPosRangeTopSec[0], vPosRangeTopSec[1]),
                  left: getRangeRandom(hPosRangeTopSec[0], hPosRangeTopSec[1])
              },
              rotate: get30DegRandom(),
              isCenter: false
            };
        });
        /**
         * [leftSec、rightSec图片处理]
         */
        for (let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
            let hPosRangeLOR = null,
                vPosRangeLOR = null;

            // 前半部分布局左边， 右半部分布局右边
            if (i < k) {
                hPosRangeLOR = hPosRangeLeftSec;
                vPosRangeLOR = vPosRangeLeftSec;
            } else {
                hPosRangeLOR = hPosRangeRightSec;
                vPosRangeLOR = vPosRangeRightSec;
            }
            // leftSec、rightSec赋值处理
            imgsArrangeArr[i] = {
              pos: {
                  top: getRangeRandom(vPosRangeLOR[0], vPosRangeLOR[1]),
                  left: getRangeRandom(hPosRangeLOR[0], hPosRangeLOR[1])
              },
              rotate: get30DegRandom(),
              isCenter: false
            };
        }

        //将裁剪下来的imgsArrangeTopArr和imgsArrangeCenterArr按顺序拼接回去
        if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
            imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
        }

        imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

        this.props.center(imgsArrangeArr);
        // this.setState({});
    }
    /**
     * [bug]getInitialState已经被禁用  在constructor函数中设置this.state
     * getInitialState [返回state]
     * @imgsArrangeArr  [图片数组的排布信息]
     * {
            pos: {
                left: '0',
                top: '0'
            },
            rotate: 0,              // 旋转角度
            isInverse: false,       // 图片是否反转
            isCenter: false,        // 图片是否居中
        }
     */
    // getInitialState() {
    //   return {
    //       imgsArrangeArr:[]
    //   }
    // }
    /**
     * [componentDidMount 组件加载后用每张图片的大小设置Constant]
     * @Constant {
        centerPos: {
          left: 0,
          top: 0
        },
        hPosRange: {
          leftSec: [0, 0],
          rightSec: [0, 0],
          topSec: [0, 0]
        },
        vPosRange: {
          leftSec: [0, 0],
          rightSec: [0, 0],
          topSec: [0, 0]
        }
      }
     */
    componentDidMount(){
    /**
     * [stageDOM 舞台大小]
     */
    let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageW = Math.ceil(stageW / 2),
        halfStageH = Math.ceil(stageH / 2);
    /**
     * [imgUnitDOM 图片大小]
     */
    let imgUnitDOM = ReactDOM.findDOMNode(this.refs.imgUnit0),
        imgW = imgUnitDOM.scrollWidth,
        imgH = imgUnitDOM.scrollHeight,
        halfImgW = Math.ceil(imgW / 2),
        halfImgH = Math.ceil(imgH / 2);
    /**
     * 计算四个部分的位置区间
     */
    //计算center位置
    this.Constant.centerPos = {
        left: halfStageW - halfImgW,
        top: halfStageH - halfImgH
    };
    //计算leftSec、rightSec、topSec水平方向位置区间
    this.Constant.hPosRange.leftSec[0] = -halfImgW;
    this.Constant.hPosRange.leftSec[1] = halfStageW - halfImgW * 3;
    this.Constant.hPosRange.rightSec[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSec[1] = stageW - halfImgW;
    this.Constant.hPosRange.topSec[0] = halfStageW - imgW;
    this.Constant.hPosRange.topSec[1] = halfStageW;
    //计算leftSec、rightSec、topSec垂直方向位置区间
    this.Constant.vPosRange.leftSec[0] = -halfImgH;
    this.Constant.vPosRange.leftSec[1] = stageH - halfImgH;
    this.Constant.vPosRange.rightSec[0] = -halfImgH;
    this.Constant.vPosRange.rightSec[1] = stageH - halfImgH;
    this.Constant.vPosRange.topSec[0] = -halfImgH;
    this.Constant.vPosRange.topSec[1] = halfStageH - halfImgH * 3;
    this.rearrange(0);
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
  return {...state}
}

//将action的所有方法绑定到props上,bindActionCreators可以批量导入actionCreater，设置键名为函数名，并在外层包裹dispatch方法
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreaters, dispatch); 
}



export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);