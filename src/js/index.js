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