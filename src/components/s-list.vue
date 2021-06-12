<template>
  <scroll-view v-if="height" :scroll-top="scrollTop" :lower-threshold="45" scroll-y refresher-enabled
               :scroll-with-animation="scrollWithAnimation" :show-scrollbar="showScrollbar"
               :refresher-triggered="triggered"
               :refresher-threshold="100" :refresher-background="refresherBackground" @scroll="scroll"
               @refresherrefresh="onRefresh" @refresherrestore="onRestore"
               @scrolltolower="scrollToLower" :style="{height: height+'px'}">
    <ul :style="style" :class="ulClass">
      <slot></slot>
      <li v-for="(item,index) in list" :key="index">
        <slot name="item" :item="item" :index="index">
          <u-cell-item :title="item"></u-cell-item>
        </slot>
      </li>
    </ul>
    <template v-if="loadStatus==='nomore' && list.length === 0">
      <slot name="empty">
        <view class="text-center">没有数据</view>
      </slot>
    </template>
    <view v-else @tap="requestMore"
          style="margin-bottom: 20px;margin-top: 20px;line-height: 1;">
      <template v-if="loadStatus==='loading'">
        <slot name="loading">
          <u-loadmore status="loading" :load-text="{loadmore,loading,nomore}"/>
        </slot>
      </template>
      <template v-else-if="loadStatus==='loadmore'">
        <slot name="loadmore">
          <u-loadmore status="loadmore" :load-text="{loadmore,loading,nomore}"/>
        </slot>
      </template>
      <template v-else-if="loadStatus==='nomore' && list.length > 0">
        <slot name="nomore">
          <u-loadmore status="nomore" :load-text="{loadmore,loading,nomore}"/>
        </slot>
      </template>
    </view>
  </scroll-view>
</template>

<script>
export default {
  name: 's-list',
  data() {
    return {
      triggered: false,
      fresh: false,
      loadStatus: 'loadmore',
      list: [],
      _scrollTop: 0,
      scrollTop: 0,
      page: {
        total: 0,
        current: 1,
        hasMore: true,
      },
    }
  },
  computed: {
    loadText() {
      return this[this.loadStatus]
    },
  },
  props: {
    style: { default: '', type: String },
    ulClass: { default: '', type: String },
    size: { default: 10, type: Number },
    refresh: { default: false, type: Boolean },
    scrollWithAnimation: { default: false, type: Boolean },
    showScrollbar: { default: false, type: Boolean },
    autoRequest: { default: false, type: Boolean },
    fullLine: { default: false, type: Boolean },
    refresherBackground: { default: '#f8f8f8', type: String },
    height: { default: 500, type: Number },
    request: {
      default: () => new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ list: [1, 2], total: 10 })
        }, 2000)
      }),
      type: Function,
    },
    loadmore: { default: '点击加载更多', type: String },
    loading: { default: '加载中', type: String },
    nomore: { default: '没有更多了', type: String },
  },
  methods: {
    startPullRefresh(current, top = false) {
      if (current === 1) {
        this.$emit('refresh', true)
        this.triggered = true
      }
      return new Promise((resolve, reject) => {
        this.loadStatus = 'loading'
        !!current && (this.page.current = current)
        if (!this.page.hasMore && this.page.current !== 1) {
          setTimeout(() => {
            this.loadStatus = 'nomore'
          }, 1000)
          resolve()
          return
        }
        this.request.bind(this.$parent)({ ...this.page, size: this.size }).then(({ list, total }) => {
          if (this.page.current === 1) {
            this.list = [...list]
          } else {
            this.list = [...this.list, ...list]
          }
          if (this.list.length > 0 && top) {
            this.backToTop()
          }
          if (this.page.current * this.size >= total) {
            this.loadStatus = 'nomore'
            this.page.hasMore = false
          } else {
            this.page.hasMore = true
            this.loadStatus = 'loadmore'
            this.page.current++
          }
          this.stopPullRefresh()
          resolve()
        }).catch(e => {
          console.log(e)
          this.stopPullRefresh()
          reject()
        })
      })
    },
    stopPullRefresh() {
      this.$emit('refresh', false)
      this.triggered = false
    },
    onRefresh() {
      console.log('onRefresh')
      if (this.fresh) return
      this.fresh = true
      // console.log('onRefresh')
      this.startPullRefresh(1).then((fresh) => {
        !fresh && (this.fresh = false)
      }).catch(() => {
        this.fresh = false
      })
      setTimeout(() => {
        this.fresh = false
      }, 5000)
    },
    onRestore() {
      this.$emit('refresh', false)
      this.triggered = false // 需要重置
    },
    onAbort() {
      // this.$emit('refresh', false)
      // this.triggered = false; // 需要重置
      console.log('onAbort')
    },
    scroll(e) {
      this._scrollTop = e.detail.scrollTop
    },
    requestMore(e) {
      if (this.loadStatus === 'loading' || (!e && this.loadStatus === 'nomore')) {
        return
      }
      this.loadStatus = 'loading'
      this.startPullRefresh()
    },
    scrollToLower() {
      this.requestMore()
    },
    backToTop() {
      this.scrollTop = this._scrollTop
      this.$nextTick(() => {
        this.scrollTop = 0
      })
    },
  },
  mounted() {
    if (this.autoRequest) {
      this.onRefresh()
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
