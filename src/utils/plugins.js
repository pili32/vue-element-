


// 自定义vue方法，使用 $'Function'进行操作
let plugin = {}
export default {
    install:(Vue) =>{
        plugin.filterMenu = function(path,storeMenu,result){
            let list = result || []
            let obj = {
                name: storeMenu.name,
                path:path  
            }
            list.push(obj)
            if(storeMenu.children.length > 0) {
                storeMenu.children.forEach(e => {
                    console.log(e)
                    let obj ={
                        name: e.name,
                        path:e.path              
                     }
                    list.push(obj)
                // if(e.children.length > 0)  Vue.prototype.$filterMenu(bread[0].path,bread[0],list);
                });
                console.log(list)
            }
            return list
        }
        for(let key in plugin){
            console.log(key);
            Vue.prototype['$' + key] = plugin[key]
    
        }
    }
}