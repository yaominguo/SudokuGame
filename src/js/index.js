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
    if(grid.check()){
        alert('成功！');
    }
});
//重置
$('#reset').on('click',e=>{
    grid.reset();
});
//重建
$('#rebuild').on('click',e=>{
    grid.rebuild();
});