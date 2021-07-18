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

const update_active_dot = () => {
  let i = 1;
  const win_h = $(window).height()
  const scroller_pos = $(window).scrollTop()

  $('section')
    .toArray()
    .map(section => $(section).position())
    .every(section => {
      if (scroller_pos > section.top - win_h / 3) {
        $('.scroll-dot').removeClass('active')
        $(`.scroll-dot:nth-of-type(${i})`).addClass('active')
        i++;
        return true;
      }

      return false;
    })

}

jQuery(() => {
  $('.scroll-dot').on("click", function () {
    const section_query = `.${$(this).attr('data-section')}`
    scroll_animation(section_query)

    $('.scroll-dot.active').toggleClass('active')
    $(this).toggleClass('active')

  })

  $('nav .hamburgerr').on('click', () => {
    $('nav').toggleClass('active-mobile')
    $('nav .grey-filter, nav .blue-filter').toggleClass('open')
    $('nav .grey-filter, nav .blue-filter').toggleClass('close')

    if ($('nav').hasClass('active-mobile')) {
      $('body').css('overflowY', 'hidden')
    } else {
      $('body').css('overflowY', 'scroll')
    }
  })

  $('nav a').on('click', function (event) {
    event.preventDefault()

    let delta = 0;
    if ($(window).width() <= 940) {
      $('nav .hamburgerr').click()
      delta = 600

    }
    setTimeout(() => {
      const section_query = `.${$(this).attr('href')}`
      scroll_animation(section_query)
    }, delta)
  })

  $('header .call-to-action').on('click', () => {
    scroll_animation('.contact')
  })

  $(window).on('scroll', () => {
    update_active_dot()

  })
})