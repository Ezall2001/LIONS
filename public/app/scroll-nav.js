const scroll_animation = section_query => {

  const {
    top: section_y,
    left: section_x
  } = $(section_query).position()

  const win_h = $(window).height()
  const section_h = $(section_query).innerHeight()


  let section_scroll = section_y;
  if (section_h < win_h) {
    section_scroll -= ((win_h - section_h) / 2)
  }

  window.scroll({
    top: section_scroll,
    behavior: 'smooth'
  });
}

jQuery(() => {
  $('.scroll-dot').on("click", function () {
    const section_query = `.${$(this).attr('data-section')}`
    scroll_animation(section_query)

    $('.scroll-dot.active').toggleClass('active')
    $(this).toggleClass('active')

  })

  $('nav a').on('click', function (event) {
    event.preventDefault()
    const section_query = `.${$(this).attr('href')}`
    scroll_animation(section_query)
  })

  $('header .call-to-action').on('click', () => {
    scroll_animation('.contact')
  })

  //TODO: add scroll events
})