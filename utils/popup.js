const popup = {}

popup.open = (url, width = 800, height = 800) => {
  window.open(
    url,
    url,
    `toolbar=yes,scrollbars=yes,resizable=yes,top=50,left=50,width=${width},height=${height}`
  )
}

popup.closeWithRefresh = () => {
  if (opener && opener.$nuxt) {
    opener.$nuxt._router.go()
  }
  window.close()
}

popup.close = () => {
  window.close()
}

module.exports = popup
