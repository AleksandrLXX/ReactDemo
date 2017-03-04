import {CENTER,INVERSE,SPIN,SELECT} from '../types';
import {combineReducers} from 'redux';

 
let initialImageDatas = require('../data/morassImageDatas.json');
let initialImgsArrangeArr=[];
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

function imgsArrangeArr(state=initialImgsArrangeArr,action){
	switch(action.type){
		case CENTER:
			return [...action.data];
		case INVERSE:
			var newArrange=state[action.index],
			    before=state.slice(0,action.index),
			    after=state.slice(action.index+1);
			return [...before,{...newArrange,isInverse:!newArrange.isInverse},...after];
			
		/**
		 * 下面的返回值因为没有改动引用，不会重新出发rerender重新渲染组件
		 */
			// state[action.index].isInverse=!state[action.index].isInverse;
			// return state;
		case SPIN:
			var newArrange=state[action.index],
			    before=state.slice(0,action.index),
			    after=state.slice(action.index+1);
			return [...before,{...newArrange,isSpin:!newArrange.isSpin},...after];
		default:
			return state;
	}
}
/**
 * [rootReducer description]
 * 使用redux的combineReducers方法将所有reducer打包起来
 */
const rootReducer = combineReducers({imageDatas,imgsArrangeArr});

export default rootReducer;