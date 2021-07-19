const injectBoard = (data, injected) => {

  const newInjected = determinePagination(data, injected)

  data
    .slice(injected, newInjected)
    .map(card => {

      card.background = './assets/board/' +
        card.name.replace(/ /g, '_') +
        '.jpg'

      if (card.facebook == '') {
        card.facebook = 'https://www.facebook.com/Lions-Club-Sirius-Ariana-110172284619515'
      }

      if (card.instagram == '') {
        card.instagram = "https://www.instagram.com/lions_club_sirius_ariana/?fbclid=IwAR2HJJP4ab1qmT066LGuB7PyL6BBbjyxB6Lp_RFvTaToHW6fUl-z8YwV-kA"
      }

      return card
    })
    .forEach(card => {

      const newCard = `
  <div class = "card"
  style = "background-image: url(${card.background})" >
  <div class="hover-wrapper">
  <div class="card-filter"></div>
  <div class="card-title">
  <h1>${card.name}</h1>
  <p>${card.role}</p>
  <div class="social">
  <a href=${card.facebook} target="blank"><i class="fab fa-facebook"></i></a>
  <a href=${card.instagram} target="blank"><i class="fab fa-instagram"></i></a>
  </div>
  </div>
  </div>
  </div>`

      $('.board .cards-container').append(newCard)

    })

  return newInjected

}

const injectEvents = data => {

  data
    .map(card => {

      card.background = './assets/events/' +
        card.title.replace(/ /g, '_') +
        '.jpg'

      return card
    })
    .forEach(card => {

      const newCard = `
      <div class="card" data-quotes="${card.quotes}">
      <div class = "card-background" 
       style = "background-image:url(${card.background})" > </div>
      <div class="card-filter"></div>
      <div class="card-title">
      <h1>${card.title}</h1>
      <p>${card.date}</p>
      </div>
      </div>
      `

      $('.events .carousel').slick('slickAdd', newCard)
    })

  init_carousel(0)

}

const showMoreBoard = (data, showen) => {

  const newShowen = determinePagination(data, showen)

  const cardWidth = $('.board .card').width()
  const cardHeight = cardWidth * 11 / 9

  $('.board')
    .find('.card')
    .toArray()
    .slice(showen, newShowen)
    .forEach(card => {
      $(card)
        .stop()
        .removeClass('hidden')
        .css('display', 'flex')
        .animate({
            opacity: 1,
            height: cardHeight + 'px'
          }, 500, "swing", () =>
          responsiveBoardCards()
        )
    })

  if (newShowen == data.length) {
    $(".about .see-more h2").html('Show Less')
    $(".about .see-more i")
      .removeClass('fa-angle-down')
      .addClass('fa-angle-up')
  }

  return newShowen
}



const showLessBoard = data => {

  const newShowen = determinePagination(data, 0)

  $('.board')
    .find('.card')
    .toArray()
    .slice(newShowen)
    .forEach(card => {
      $(card)
        .stop()
        .animate({
            opacity: 0,
            height: '0px'
          }, 300, "swing", () =>
          $(card).addClass('hidden').css('display', 'none')
        )
    })

  $(".about .see-more h2").html('Show More')
  $(".about .see-more i")
    .removeClass('fa-angle-up')
    .addClass('fa-angle-down')

  return newShowen
}

const responsiveBoardCards = () => {
  const cards = $('.board .card:not(.hidden)')

  const cardWidth = cards.width()
  const cardHeight = cardWidth * 11 / 9

  cards.css('height', cardHeight + 'px')

}

const responsiveBoardInjection = (data, prev_win_width, shown, injected) => {

  const win_width = $(window).width()
  const breakPoints = [400, 580]

  breakPoints.forEach(breakpoint => {
    if (win_width <= breakpoint && prev_win_width > breakpoint) {

      shown = showLessBoard(data)
    } else if (win_width > breakpoint && prev_win_width <= breakpoint) {

      if (injected < data.length)
        injected = injectBoard(data, injected)

      shown = showMoreBoard(data, shown)
      shown = showLessBoard(data)
    }
  })

  return {
    shown,
    injected
  }
}

const determinePagination = (data, exist) => {
  const win_width = $(window).width()
  let pagination = data.length

  if (win_width <= 580)
    pagination = 4

  if (win_width <= 400)
    pagination = 2


  return exist + pagination > data.length ? data.length : exist + pagination

}

const fetchData = async (url = '') => {

  try {
    const jsonData = await fetch(url)
    const data = await jsonData.json()

    return data

  } catch (err) {
    console.log(err)
  }

}

jQuery(() => {

  let boardInjected = 0
  let boardShown = 0
  fetchData('../../tempDB/board.json')
    .then(data => {
      boardInjected = injectBoard(data, boardInjected)
      boardShown = showMoreBoard(data, boardShown)

      $(".about .click-container").on('click', () => {

        if (boardInjected < data.length)
          boardInjected = injectBoard(data, boardInjected)





        if (boardShown < data.length)
          boardShown = showMoreBoard(data, boardShown)

        else
          boardShown = showLessBoard(data)



      })

      let prev_win_width = $(window).width()
      $(window).on('resize', () => {
        responsiveBoardCards()
        const newState = responsiveBoardInjection(data, prev_win_width, boardShown, boardInjected)

        boardInjected = newState.injected;
        boardShown = newState.shown;

        prev_win_width = $(window).width()
      })

    })

  //TODO: refactor this into a board object


  fetchData('../../tempDB/events.json')
    .then(injectEvents)



})