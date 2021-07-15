const init_carousel = curr => {
  curr++

  query = `.events .carousel .card:nth-of-type(${curr})`
  $(query)
    .toggleClass('card-highlight-center')
}

const carousel_animation = (curr, next) => {
  curr++
  next++

  query = `.events .carousel .card:nth-of-type(${curr})`
  $(query)
    .toggleClass('card-highlight-center')

  query = `.events .carousel .card:nth-of-type(${next})`
  $(query)
    .toggleClass('card-highlight-center')

}

const init_events = () => {
  $('.events .carousel').on('beforeChange', (event, slick, currentSlide, nextSlide) => {
    carousel_animation(currentSlide, nextSlide)

  });

  $('.events .carousel').on('init ', (event, slick) => {
    const curr = slick.currentSlide;
    init_carousel(curr)
  })
}


jQuery(() => {

  init_events()

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
    prevArrow: '<i class="fas fa-angle-left slick-prev"></i>',
    nextArrow: '<i class="fas fa-angle-right slick-next"></i>',
  }

  $('.events .carousel').slick(carousel_options)


})