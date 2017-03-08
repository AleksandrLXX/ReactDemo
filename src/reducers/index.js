import {CENTER,INVERSE,SPIN,SELECT,SETCONSTANT} from '../types';
import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux'
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
 
let initialImageDatas = require('../data/morassImageDatas.json');
let initialImgsArrangeArr=[];
let initialLayoutConstant={
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
/**
 * imageDatas 处理后结构为 [{imgURL,fileName,title,desc},{}]
 */
initialImageDatas = initialImageDatas.map((imageData) => {
	imageData.imgURL = require('../images/' + imageData.fileName);
	initialImgsArrangeArr.push({
	    pos: {
	        left: 0,
	        top: 0
	    },
	    rotate: 0,
	    isInverse: false,
	    isCenter: false,
	    isSpin:false
	});
  	return imageData;
});

function imageDatas(state=initialImageDatas,action){
	switch(action.type){
		case SELECT:
			return state;
		default:
			return state; 
	}
}
    /**
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
     * @layoutConstant        [各图片区的分布范围] 
	 *图片排布后有四个位置区域 center leftSec rightSec topSec
     * {
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

function layout(state={imgsArrangeArr:initialImgsArrangeArr,layoutConstant:initialLayoutConstant},action){
	switch(action.type){
		case SETCONSTANT:
			/**
			 * [stageDOM 舞台大小]
			 */
			let stageW = action.data.stageW,
			    stageH = action.data.stageH,
			    halfStageW = Math.ceil(stageW / 2),
			    halfStageH = Math.ceil(stageH / 2);
			/**
			 * [imgUnitDOM 图片大小]
			 */
			let imgW = action.data.imgW,
			    imgH = action.data.imgH,
			    halfImgW = Math.ceil(imgW / 2),
			    halfImgH = Math.ceil(imgH / 2);

			    Constant=state.layoutConstant;
			/**
			 * 计算四个部分的位置区间
			 */
			//计算center位置
			Constant.centerPos = {
			    left: halfStageW - halfImgW,
			    top: halfStageH - halfImgH
			};
			//计算leftSec、rightSec、topSec水平方向位置区间
			Constant.hPosRange.leftSec[0] = -halfImgW;
			Constant.hPosRange.leftSec[1] = halfStageW - halfImgW * 3;
			Constant.hPosRange.rightSec[0] = halfStageW + halfImgW;
			Constant.hPosRange.rightSec[1] = stageW - halfImgW;
			Constant.hPosRange.topSec[0] = halfStageW - imgW;
			Constant.hPosRange.topSec[1] = halfStageW;
			//计算leftSec、rightSec、topSec垂直方向位置区间
			Constant.vPosRange.leftSec[0] = -halfImgH;
			Constant.vPosRange.leftSec[1] = stageH - halfImgH;
			Constant.vPosRange.rightSec[0] = -halfImgH;
			Constant.vPosRange.rightSec[1] = stageH - halfImgH;
			Constant.vPosRange.topSec[0] = -halfImgH;
			Constant.vPosRange.topSec[1] = halfStageH - halfImgH * 3;
			return {
				imgsArrangeArr:state.imgsArrangeArr,
				layoutConstant:Constant
			}
		case CENTER:
	        let imgsArrangeArr = state.imgsArrangeArr,
	            Constant = state.layoutConstant,
	            centerPos = Constant.centerPos,
	            hPosRange = Constant.hPosRange,
	            vPosRange = Constant.vPosRange,
	            hPosRangeLeftSec = hPosRange.leftSec,
	            hPosRangeRightSec = hPosRange.rightSec,
	            hPosRangeTopSec = hPosRange.topSec,
	            vPosRangeLeftSec = vPosRange.leftSec,
	            vPosRangeRightSec = vPosRange.rightSec,
	            vPosRangeTopSec = vPosRange.topSec,
	            centerIndex = action.index;
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


	        return {
				imgsArrangeArr:[...imgsArrangeArr],
				layoutConstant:state.layoutConstant
			};
		case INVERSE:
			var newArrange=state.imgsArrangeArr[action.index],
			    before=state.imgsArrangeArr.slice(0,action.index),
			    after=state.imgsArrangeArr.slice(action.index+1);
			return {
				imgsArrangeArr:[...before,
								{...newArrange,isInverse:!newArrange.isInverse},
								...after],
				layoutConstant:state.layoutConstant
			};
			
		/**
		 * 下面的返回值因为没有改动引用，不会重新出发rerender重新渲染组件
		 */
			// state[action.index].isInverse=!state[action.index].isInverse;
			// return state;
		case SPIN:
			var newArrange=state.imgsArrangeArr[action.index],
			    before=state.imgsArrangeArr.slice(0,action.index),
			    after=state.imgsArrangeArr.slice(action.index+1);
			return {
				imgsArrangeArr:[...before,
								{...newArrange,isSpin:!newArrange.isSpin},
								...after],
				layoutConstant:state.layoutConstant
			};
		default:
			return state;
	}
}
/**
 * [rootReducer description]
 * 使用redux的combineReducers方法将所有reducer打包起来
 */
const rootReducer = combineReducers({imageDatas,layout,routing:routerReducer});

export default rootReducer;