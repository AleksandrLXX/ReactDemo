import {CENTER,INVERSE,SPIN,SELECT} from '../types';

export function center(data){
	return	{
		type : CENTER,
		data
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
