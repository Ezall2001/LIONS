const init_carousel = curr => {
  curr++

  query = `.events .carousel .card:nth-of-type(${curr})`
  $(query)
    .toggleClass('card-highlight-center')

  const quote = $(query).attr('data-quotes')
  $('.events .text p').html(quote)
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

  const quote = $(query).attr('data-quotes')
  $('.events .text p')
    .html(quote)
    .removeClass('quote')

  setTimeout(() => {
    $('.events .text p').addClass('quote')
  }, 50)

}


const init_events = () => {
  $('.events .carousel')
    .on('beforeChange', (event, slick, currentSlide, nextSlide) => {
      carousel_animation(currentSlide, nextSlide)

    })
    .on('init ', (event, slick) => {
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
    responsive: [{
      breakpoint: 701,
      settings: {
        slidesToShow: 1,
        adaptiveHeight: false,
        arrows: false
      }
    }, {
      breakpoint: 440,
      settings: {
        slidesToShow: 1,
        adaptiveHeight: false,
        arrows: false
      }
    }, ]
  }

  $('.events .carousel').slick(carousel_options)


})