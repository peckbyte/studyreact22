const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
console.log(process.env.NODE_ENV)
 const config = {
    mode: 'development',
    entry:{
        app: path.join(__dirname,'../client/app.js')
    },
    output:{
        filename: '[name].[hash].js',
        path: path.join(__dirname,'../dist'),
        publicPath: './public'
    },
    module: {
        rules: [
            {
                test: /.jsx$/,
                loader:'babel-loader'
            },
            {
                test:/.js$/,
                loader:'babel-loader',
                exclude:[
                    path.join(__dirname,'../node_modules')
                ]
            }
        ]
    },
    plugins:[
        new  HTMLPlugin({
            template: path.join(__dirname,'../client/template.html')
        })
    ]

}

if (isDev) {
    config.devServer = {
        host:'0.0.0.0',
        port:'5577',
        contentBase:path.join(__dirname,'../dist'),
        overlay:{
            errors:true
        },
        publicPath:'/public/',
        historyApiFallback:{
            index: '/public/index.html'
        }
    }
}




module.exports = config