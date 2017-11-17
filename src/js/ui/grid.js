/**
 * Created by MrGuo on 2017/10/31.
 */
//生成九宫格
const Toolkit = require('../core/toolkit');
const Sudoku = require('../core/sudoku');
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