/*
 * @Author: Connor 
 * @Date: 2019-05-10 21:11:41 
 */


/* jshint esversion: 6 */
import * as _ from 'lodash';
import './style.css';


function component() {
    var element = document.createElement('div');
    element.innerHTML = _.join(['Hello','webpack'],'');
    element.classList.add('hello');

    return element;
}

document.body.appendChild(component());