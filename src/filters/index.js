const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys()
  .reduce((modules, modulePath) => {
    // set './app.js' => 'app'
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
  }, {})

console.log(modules)

const install = Vue => {
  // if (install.installed) return
  // install.installed = true
  // 定义过滤器
  Object.keys(modules).forEach((key) => {
    const module = modules[key]
    Object.keys(module).forEach((filter) => {
      Vue.filter(filter, module[filter])
    })
  })
}

export default {
  install,
}
