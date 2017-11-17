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
        //TODO 如果在手机屏幕上点击右边的宫会超出屏幕，需修改优化
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