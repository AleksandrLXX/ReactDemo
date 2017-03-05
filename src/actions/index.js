import {CENTER,INVERSE,SPIN,SELECT,SETCONSTANT} from '../types';

export function center(index){
	return	{
		type : CENTER,
		index
	}
}

export function inverse(index){
	return	{
		type : INVERSE,
		index
	}
}

export function spin(index){
	return	{
		type : SPIN,
		index
	}
}

export function select(){
	return	{
		type : SELECT
	}
}
/**
 * [setConstant description]
 * @param {[obj]} data {
        stageW:stageW,
        stageH:stageH,
        imgW:imgW,
        imgH:imgH
    }
 */
export function setConstant(data){
	return	{
		type : SETCONSTANT,
		data
	}
}
