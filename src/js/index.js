/**
 * Created by MrGuo on 2017/10/24.
 */

const toolKit = require('./toolkit');

class Grid{
    constructor(container){
        this._$container = container;
    }

    build(){
        const matrix = toolKit.makeMatrix();
        const $cells = matrix.map(rowValues=>{
            rowValues.map(cellValue=>{
                return $('<span>').text(cellValue)
            })
        });

        const $divArray = $cells.map($spanArray=>{
            return $('<div>').append($spanArray);
        });

        this._$container.append($divArray);
    }
}
new Grid($('#container')).build();