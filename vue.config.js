/**
 * vue config
 * @description
 * vue构建配置文件，[文档地址](https://cli.vuejs.org/zh/config/#vue-config-js)
 */
 const path = require("path");
 const {name, pathName} = require('./package');
 
 function resolve(dir) {
   return path.join(__dirname, dir);
 }
 
 let plugins = [];
 console.log(process);
 module.exports = {
   /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
   assetsDir: "assets",
   /* 表单设计器配置的审批意见组件使用JSX，因此需要包括编译器 */
   runtimeCompiler: false,
   /* webpack-dev-server 相关配置 */
   lintOnSave: false,
   /* 输出文件目录：在npm run build时，生成文件的目录名称 */
   outputDir: pathName,
   publicPath: 'oa',
   /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
   productionSourceMap: false,
   /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
   filenameHashing: false, //测试net::ERR_ABORTED 404
   /* webpack-dev-server 相关配置 */
   devServer: {
     // 跨域
     headers: {
       'Access-Control-Allow-Origin': '*',
     },
     contentBase: ['public', 'static'],
     /* 自动打开浏览器 */
     open: false,
     /* 设置为0.0.0.0则所有的地址均能访问 */
     host: "0.0.0.0",
     port: 8088,
     https: false,
     hotOnly: false,
   },
 
   // 自定义webpack配置
   configureWebpack: {
     resolve: {
       alias: {
         '@': resolve('src'),
         vue$: 'vue/dist/vue.esm.js',
       },
     },
     plugins: plugins,
     output: {
       // 把子应用打包成 umd 库格式(必须)
       library: `${name}-[name]`,
       libraryTarget: 'umd',
       jsonpFunction: `webpackJsonp_${name}`,
       filename: './assets/js/[name].[hash:6].js',
       chunkFilename: './assets/js/[name].[contenthash:8].js'
     },
   },
 
   // node_modules 中需要编译的库
   transpileDependencies: [/vue-awesome/,/vue-grid-layout/],
 
   chainWebpack: config => {
     config.plugin('preload').tap(() => [
       {
         rel: 'preload',
         fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
         include: 'initial',
       },
     ]);
 
     config.plugins.delete('prefetch');
 
     config.plugin('webpack-bundle-analyzer')
       .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
       .tap(() => [{
         analyzerMode: 'static',
         generatedStatsFile: false,
         statsOptions: {source: false},
         openAnalyzer: false
       }]);
   },
   css: {
    loaderOptions: {
      // 没有分号会报错
      scss: {
        // additionalData: `@import "@/styles/theme/element-variables.scss";`
      }
    }
  }
 };
 