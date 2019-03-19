/*jshint esversion:6*/
console.log('loading index.......');
import _ from 'lodash';
import $ from 'jquery';
import '@/assets/css/ss1.scss';
import {cube} from '@/model/match.js';
import imgsrc1 from '@/assets/img/60535674_p0.jpg';
import imgsrc2 from '@/assets/img/60535674_p2.jpg';

function component(){
	let element = document.createElement('p');
	element.innerHTML = _.join(['hello doubi','5*5=',cube(5)],'-');
	let img =new Image();
	img.src = imgsrc1;
	element.appendChild(img);
	return element;
}
document.body.appendChild(component());

let $b= $('body');
console.log($b);
export var ary = [1,2,3,1];
