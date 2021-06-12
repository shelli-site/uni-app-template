const state = {
  hasLogin: false,
  loginProvider: '',
  openid: null,
  noMatchRightWindow: true,
  rightWinActive: '/pages/component/view/view',
  access: [],
}
const mutations = {
  login(state, provider) {
    state.hasLogin = true
    state.loginProvider = provider
  },
  logout(state) {
    state.hasLogin = false
    state.openid = null
  },
  setOpenid(state, openid) {
    state.openid = openid
  },
  setMatchRightWindow(state, matchRightWindow) {
    state.noMatchRightWindow = !matchRightWindow
  },
  setRightWinActive(state, rightWinActive) {
    state.rightWinActive = rightWinActive
  },
  setUniverifyLogin(state, payload) {
    typeof payload !== 'boolean' ? payload = !!payload : ''
    state.isUniverifyLogin = payload
  },
}
const actions = {
  async getUserOpenId({ commit, state }) {
    return await new Promise((resolve, reject) => {
      if (state.openid) {
        resolve(state.openid)
      } else {
        uni.login({
          success: (data) => {
            commit('login')
            setTimeout(function () { // TODO 模拟异步请求服务器获取 openid
              const openid = '123456789'
              console.log('uni.request mock openid[' + openid + ']')
              commit('setOpenid', openid)
              resolve(openid)
            }, 1000)
          },
          fail: (err) => {
            console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
            reject(err)
          },
        })
      }
    })
  },
  login({ commit }, loginForm) {
    return new Promise((resolve, reject) => {
      // TODO 登录
      console.log(uni.$u.post)
    })
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
