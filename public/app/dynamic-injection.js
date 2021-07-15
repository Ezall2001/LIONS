const injectBoard = data => {

  data
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
    });

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
      <div class="card">
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

  fetchData('../../tempDB/board.json')
    .then(injectBoard)


  fetchData('../../tempDB/events.json')
    .then(injectEvents)


  // TODO: finish the json

})