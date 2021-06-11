<template>
  <view class="content">
    <scroll-view :scroll-top="0" :lower-threshold="40" scroll-y refresher-enabled :refresher-triggered="triggered"
                 :refresher-threshold="100" refresher-background="lightgreen" @refresherpulling="onPulling"
                 @refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherabort="onAbort"
                 @scrolltolower="scrolltolower"
                 @scroll="scroll" style="height:573px;">
      <u-cell-item icon="setting-fill" title="个人设置1"></u-cell-item>
      <u-cell-item icon="setting-fill" title="个人设置2"></u-cell-item>
      <u-cell-item icon="setting-fill" title="个人设置3"></u-cell-item>
      <u-cell-item icon="setting-fill" title="个人设置4"></u-cell-item>
      <u-cell-item icon="setting-fill" title="个人设置5"></u-cell-item>
      <u-loadmore :status="loadStatus" icon @loadmore="loadmore" margin-top="20" margin-bottom="40"/>

    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello',
      triggered: false,
      loadStatus: 'loadmore',
    }
  },
  onLoad() {
    this._freshing = false
    setTimeout(() => {
      this.triggered = true
    }, 1000)
  },
  methods: {
    // upper(){console.log('upper')},
    scrolltolower() {
      this.loadStatus = 'loading'
      setTimeout(() => {
        this.loadStatus = 'nomore'
      }, 1000)
    },
    onPulling() {
    },
    onRefresh() {
      if (this._freshing) return
      this._freshing = true
      setTimeout(() => {
        this.triggered = false
        this._freshing = false
      }, 1000)
    },
    onRestore() {
      this.triggered = 'restore' // 需要重置
    },
    onAbort() {
    },
    scroll() {
    },
    loadmore() {
      console.log('loadmore')
    },
  },
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
