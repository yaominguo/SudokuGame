/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * Created by MrGuo on 2017/10/24.
 */
//矩阵和数组相关工具

const matrixToolKit = {
    makeRow(v = 0){
        const array = new Array(9);
        array.fill(v);
        return array;
    },

    makeMatrix(v = 0){
        return Array.from({length: 9}, () => this.makeRow(v));
    },

    /*Fisher-Yates 洗牌法，对传入数组进行随机排序，最后返回排序后的数组*/
    shuffle(array){
        const length = array.length;
        const endIndex = length - 2;
        for (let i = 0; i < endIndex; i++) {
            const j = i + Math.floor((length-i)*Math.random());
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },

    /*检查指定位置可以填写数字n*/
    checkFillable(matrix, n, rowIndex, colIndex){
        const row=matrix[rowIndex];
        const column=this.makeRow().map((v,i)=> matrix[i][colIndex]);
        const {boxIndex}=boxToolkit.convertToBoxIndex(rowIndex,colIndex);
        const box=boxToolkit.getBoxCells(matrix,boxIndex);
        for(let i=0;i<9;i++){
            if(row[i]===n||column[i]===n||box[i]===n){
                return false;
            }
        }
        return true;
    }
};
/*
* 宫坐标系工具
* */
const boxToolkit = {
    getBoxCells(matrix,boxIndex){
        const startRowIndex=Math.floor(boxIndex/3)*3;
        const startColIndex=boxIndex%3*3;
        const result=[];
        for(let cellIndex=0;cellIndex<9;cellIndex++){
            const rowIndex=startRowIndex+Math.floor(cellIndex/3);
            const colIndex=startColIndex+cellIndex%3;
            result.push(matrix[rowIndex][colIndex]);
        }
        return result;
    },
    convertToBoxIndex(rowIndex,colIndex){
        return{
            boxIndex:Math.floor(rowIndex/3)*3+Math.floor(colIndex/3),
            cellIndex:rowIndex%3*3+colIndex%3,
        };
    },
    convertFromBoxIndex(boxIndex,cellIndex){
        return{
            rowIndex:Math.floor(boxIndex/3)*3+Math.floor(cellIndex/3),
            colIndex:boxIndex%3*3+cellIndex%3,
        }
    }
};



//工具集
module.exports = class Toolkit{
    //矩阵和数据相关的工具
    static get matrix(){
        return matrixToolKit;
    }

    //宫坐标系相关的工具
    static get box(){
        return boxToolkit;
    }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by MrGuo on 2017/10/24.
 */

const Grid = __webpack_require__(2);
const PopupNumbers =__webpack_require__(5);

const grid = new Grid($('#container'));
grid.build();
grid.layout();

const popupNumbers = new PopupNumbers($('#popupNumbers'));
grid.bindPopup(popupNumbers);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by MrGuo on 2017/10/31.
 */
//生成九宫格
const Toolkit = __webpack_require__(0);
const Sudoku = __webpack_require__(3);
class Grid{
    constructor(container){
        this._$container = container;
    }

    build(){
        const sudoku = new Sudoku();
        sudoku.make();
        const matrix = sudoku.puzzleMatrix;

        const rowGroupClasses = ['row_g_top','row_g_middle','row_g_bottom'];
        const colGroupClasses = ['col_g_left','col_g_center','col_g_right'];
        const $cells = matrix.map(rowValues=>{
            return rowValues.map((cellValue,colIndex)=>{
                return $('<span>')
                    .addClass(colGroupClasses[colIndex%3])
                    .addClass(cellValue==0?"empty":"fixed")
                    .text(cellValue)
            })
        });
        const $divArray = $cells.map(($spanArray,rowIndex)=>{
            return $('<div>')
                .addClass('row')
                .addClass(rowGroupClasses[rowIndex%3])
                .append($spanArray);
        });

        this._$container.append($divArray);
    }
    layout(){
        const width = $('span:first',this._$container).width();
        $('span',this._$container)
            .height(width)
            .css({
                'line-height':width+'px',
                'font-size':width<32?width/2+'px':'',
            })
    }
    bindPopup(popupNumbers){
        this._$container.on('click','span',e=>{
           const $cell = $(e.target);
           popupNumbers.popup($cell);
        });
    }
}
module.exports = Grid;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by MrGuo on 2017/10/31.
 */
//生成数独游戏
//1 生成完成的解决方案：Generator
//2 随机去除部分数据

const Generator = __webpack_require__(4);

module.exports = class Sudoku{
    constructor(){
        //生成完成的解决方案
        const generator = new Generator();
        generator.generate();
        this.solutionMatrix = generator.matrix;
    }

    make(level=5){
        //生成迷盘
        this.puzzleMatrix = this.solutionMatrix.map(row=>{
            return row.map(cell=>{
                return Math.random()*9<level? 0 : cell;
            })
        })
    }
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by MrGuo on 2017/10/31.
 */
//生成数独解决方案
const Toolkit = __webpack_require__(0);
module.exports = class Generator{
    generate(){
        while(!this.internalGenerate()){
            // console.warn('try again');
        }
    }
    internalGenerate(){
        this.matrix = Toolkit.matrix.makeMatrix();
        this.orders = Toolkit.matrix.makeMatrix()
            .map(row=>row.map((v,i)=>i))
            .map(row=>Toolkit.matrix.shuffle(row));
        for(let n=1;n<=9;n++){
            if(!this.fillNumber(n)){
                return false;
            }
        }
        return true;
    }

    fillNumber(n){
        return this.fillRow(n,0);
    }

    fillRow(n,rowIndex){
        if(rowIndex>8){
            return true;
        }
        const row = this.matrix[rowIndex];
        const orders = this.orders[rowIndex];//取随机位置
        for(let i=0;i<9;i++){
            const colIndex = orders[i];
            //如果这个位置已经有值则跳过
            if(row[colIndex]){
                continue;
            }

            //检查这个位置是否可以填n
            if(!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)){
                continue;
            }

            row[colIndex] = n;


            // 去下一行填写n，如果没有填写进去，就继续寻找当前行下一个位置
            if(!this.fillRow(n,rowIndex+1)){
                row[colIndex] = 0;
                continue;
            }
            return true;
        }
        return false;

    }
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/**
 * Created by MrGuo on 2017/10/31.
 */
//处理弹出的操作面板

module.exports = class PopupNumbers{
    constructor($panel){
        this._$panel = $panel.hide().removeClass('hidden');
        this._$panel.on('click','span',e=>{
            const $cell = this._$targetCell;
            const $span = $(e.target);

            //回填样式
            if($span.hasClass('mark1')){
                if($cell.hasClass('mark1')){
                    $cell.removeClass('mark1');
                }else {
                    $cell.removeClass('mark2').addClass('mark1');
                }
            }else if($span.hasClass('mark2')){
                if($cell.hasClass('mark2')){
                    $cell.removeClass('mark2');
                }else {
                    $cell.removeClass('mark1').addClass('mark2');
                }
            }else if($span.hasClass('empty')){
            //取消数字和mark
                $cell.text(0).addClass('empty');
            }else {
                //回填数字
                $cell.removeClass('empty').text($span.text());
            }
            this.hide();
        })
    }

    popup($cell){
        this._$targetCell = $cell;
        const {left, top} = $cell.position();
        this._$panel.css({
            left:`${left}px`,
            top:`${top}px`
        }).show();
    }
    hide(){
        this._$panel.hide();
    }
};

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map