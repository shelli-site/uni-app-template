const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const install = Vue => {
  if (install.installed) return
  install.installed = true
  // 定义过滤器
  Vue.prototype.$us = {}
  Object.keys(modules).forEach(function (key) {
    Vue.prototype.$us[key] = modules[key]
  });
}

export default {
  install
}
