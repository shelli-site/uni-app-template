<template>
  <s-list :request="toRequest" auto-request :height="height">
  </s-list>
</template>

<script>
import SList from "../../components/s-list";

export default {
  components: {SList},
  data() {
    return {
      height: this.$u.sys().windowHeight
    }
  },
  methods: {
    toRequest() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          let list = []
          for (let i = 0; i < 10; i++) {
            list.push(i)
          }
          resolve({list: list, total: 999})
        }, 2000)
      })
    }
  },
  onLoad() {

  }
}
</script>

<style scoped>

</style>
