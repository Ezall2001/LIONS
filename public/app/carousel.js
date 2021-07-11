const init_carousel = (carousel_section, curr) => {
  const length = $(`${carousel_section} .carousel`).find('.card').length
  curr++

  query = `${carousel_section} .carousel .card:nth-of-type(${curr})`
  $(query)
    .toggleClass('card-highlight-center')
}

const carousel_animation = (carousel_section, curr, next) => {
  curr++
  next++

  query = `${carousel_section} .carousel .card:nth-of-type(${curr})`
  $(query)
    .toggleClass('card-highlight-center')

  query = `${carousel_section} .carousel .card:nth-of-type(${next})`
  $(query)
    .toggleClass('card-highlight-center')

}

const init_events = carousel_section => {
  $(`${carousel_section} .carousel`).on('beforeChange', (event, slick, currentSlide, nextSlide) => {
    carousel_animation(carousel_section, currentSlide, nextSlide)

  });

  $(`${carousel_section} .carousel`).on('init', (event, slick) => {
    const curr = slick.currentSlide;
    init_carousel(carousel_section, curr)
  })
}


jQuery(() => {
  init_events('.about');
  init_events('.events')

  const carousel_options = {
    centerMode: true,
    infinite: false,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 5000,
    variableWidth: false,
    adaptiveHeight: true,
    speed: 500,
    dots: true,
    centerPadding: '0px',
    arrows: true,
    focusOnSelect: true,
    edgeFriction: 0.30,
    initialSlide: 0,
    swipe: true,
    swipeToSlide: true,
    touchMove: true,
    dotsClass: 'dots',
  }

  $('.about .carousel').slick(carousel_options)
  $('.events .carousel').slick(carousel_options)


  $('.dots li button').html('');
  $('.slick-prev').html('<i class="fas fa-angle-left"></i>');
  $('.slick-next').html('<i class="fas fa-angle-right"></i>');

})