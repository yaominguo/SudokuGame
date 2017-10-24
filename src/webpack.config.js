/**
 * Created by MrGuo on 2017/10/24.
 */
const path=require('path');
module.exports={
    entry:{
        index:'./js/index'
    },
    output:{
       filename:'[name].js'
    },
    devtool:'source-map',
    resolve:{
        extensions:['.js']
    },
    module:{
        rules:[
            {
                test:'/\.js$/',
                loader:'babel',
                exclude:path.resolve(__dirname,'/node_modules/'),
                query:{
                    presets:['es2015']
                }
            }
        ]
    }
};