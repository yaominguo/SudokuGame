/**
 * Created by MrGuo on 2017/10/24.
 */

const Grid = require('./ui/grid');
const PopupNumbers =require('./ui/popupnumbers');

const grid = new Grid($('#container'));
grid.build();
grid.layout();

const popupNumbers = new PopupNumbers($('#popupNumbers'));
grid.bindPopup(popupNumbers);

//检查
$('#check').on('click',e=>{
    grid.check();
});
$('#reset').on('click',e=>{
    grid.reset();
});
$('#clear').on('click',e=>{
    grid.clear();
});

//重建
$('#rebuild').on('click',e=>{
    grid.rebuild();
});