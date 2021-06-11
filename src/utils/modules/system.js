let systemInfoResult = uni.getSystemInfoSync();
export default {
  WIN_WIDTH: systemInfoResult.screenWidth,
  WIN_HEIGHT: systemInfoResult.screenHeight,
  IS_IOS: /ios/i.test(systemInfoResult.system),
  IS_ANDROID: /android/i.test(systemInfoResult.system),
  STATUS_BAR_HEIGHT: systemInfoResult.statusBarHeight,
  DEFAULT_HEADER_HEIGHT: systemInfoResult.screenHeight - systemInfoResult.windowHeight - systemInfoResult.statusBarHeight,
  NAV_HEIGHT: wx.DEFAULT_HEADER_HEIGHT + wx.STATUS_BAR_HEIGHT,
  DEFAULT_CONTENT_HEIGHT: systemInfoResult.screenHeight - systemInfoResult.statusBarHeight - wx.DEFAULT_HEADER_HEIGHT,
  IS_APP: true
}
