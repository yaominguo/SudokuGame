/**
 * Created by MrGuo on 2017/10/24.
 */

const toolKit = require('./toolkit');
const matrix = toolKit.makeMatrix();
console.log(matrix);

const a=Array.from({length:9},(v,i)=>i);
console.log(a);
console.log(toolKit.shuffle(a));