/**
 * Created by MrGuo on 2017/10/31.
 */
//检查数独的解决方案

function checkArray(array){
    const length=array.length;
    const marks = new Array(length);
    marks.fill(true);

    for(let i=0;i<length-1;i++){
        if(!marks[i]){ //如果检查之前就已经为false的就不再检查了
            continue;
        }
        const v=array[i];
        //是否有效 0为无效 1-9有效
        
        if(!v){
            marks[i]=false;
            continue;
        }

        //是否有重复 i+1 到 9 中是否和 i 位置的数据重复
        for(let j=i+1;j<length;j++){
            if(v===array[j]){
                marks[i]=marks[j]=false;
            }
        }
    }

    return marks;
}
console.log(checkArray([1,2,3,4,5,6,7,8,9]));
console.log(checkArray([1,2,3,4,0,6,7,8,9]));
console.log(checkArray([1,2,3,4,5,6,3,8,9]));