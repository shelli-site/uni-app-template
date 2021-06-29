export default {
  fixed(value) {
    const v = parseFloat(value)
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(v)) {
      return ''
    } else {
      return v.toFixed(2)
    }
  },
}
