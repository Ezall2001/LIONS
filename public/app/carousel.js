const init_carousel = curr => {
  const length = $('.carousel').find('.card').length
  curr++

  let query = `.carousel .card:nth-of-type(${curr})`
  $(query).toggleClass('card-highlight-center')

  if (curr != 1) {
    let query = `.carousel .card:nth-of-type(${curr-1})`
    $(query).toggleClass('card-highlight-sides')

  }

  if (curr != length) {
    let query = `.carousel .card:nth-of-type(${curr+1})`
    $(query).toggleClass('card-highlight-sides')
  }
}

const carousel_animation = (curr, next) => {
  const length = $('.carousel').find('.card').length
  curr++
  next++

  let query = `.carousel .card:nth-of-type(${curr})`
  $(query)
    .toggleClass('card-highlight-center')
    .toggleClass('card-highlight-sides')


  query = `.carousel .card:nth-of-type(${next})`
  $(query)
    .toggleClass('card-highlight-sides')
    .toggleClass('card-highlight-center')

  if (next > curr && next != length) {

    query = `.carousel .card:nth-of-type(${next+1})`
    $(query)
      .toggleClass('card-highlight-sides')

  } else if (next < curr && next != 1) {
    query = `.carousel .card:nth-of-type(${next-1})`
    $(query)
      .toggleClass('card-highlight-sides')
  }



}


jQuery(() => {

  $('.carousel').on('beforeChange', (event, slick, currentSlide, nextSlide) => {
    query = `.carousel .card:nth-of-type(${currentSlide+1})`
    $(query)
      .toggleClass('card-highlight-center')

    query = `.carousel .card:nth-of-type(${nextSlide+1})`
    $(query)
      .toggleClass('card-highlight-center')


  });

  $('.carousel').on('init', (event, slick) => {
    const curr = slick.currentSlide;

    query = `.carousel .card:nth-of-type(${curr+1})`
    $(query)
      .toggleClass('card-highlight-center')

  })


  $('.carousel').slick({
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
  })


  $('.dots li button').html('');
  $('.slick-prev').html('<i class="fas fa-angle-left"></i>');
  $('.slick-next').html('<i class="fas fa-angle-right"></i>');

  // TODO: fix the aspect ratio hight

})