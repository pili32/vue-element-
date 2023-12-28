
import Vue from 'vue'

const requireContext = require.context(
    './global',
    true,
    /\.vue$/
)

requireContext.keys().forEach(fileName=>{

    const commentsConfig = requireContext(fileName)
    console.log(commentsConfig.default);
    Vue.component(
       commentsConfig.default.name || commentsConfig.name ,commentsConfig.default||commentsConfig
    )
})
