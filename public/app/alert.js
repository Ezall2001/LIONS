const alertPop = {
  err: function (msg) {
    this.displayAlert('error', msg)
  },

  success: function (msg) {
    this.displayAlert('success', msg)
  },


  hideTimeout: 0,

  displayAlert: function (type, msg) {
    const alertHTML = `<b>${type}</b> ${msg}`

    $('.alert p')
      .html(alertHTML)

    $('.alert')
      .addClass(type)
      .slideDown("medium")

    this.hideTimeout = setTimeout(() => {

      this.hideAlert()

    }, 8000)
  },

  hideAlert: function () {
    clearTimeout(this.hideTimeout)

    $('.alert')
      .slideUp("medium", () => {
        $('.alert')
          .attr('class')
          .split(' ')
          .filter(className =>
            className != 'alert')
          .forEach(className =>
            $('.alert').removeClass(className))
      })

  }

}

jQuery(() => {

  $('.alert .close').on('click', () => {
    alertPop.hideAlert()
  })

})