const animation_val = (elem) => {

  let textSize = ''

  textSize = elem
    .css('font-size')
    .slice(0, textSize.length - 2)

  let rgba = []
  let fadeColor = 'rgba('
  let color = elem
    .css('color')

  if (color.indexOf('rgba') == 0) {
    rgba = color
      .slice(5, color.length - 1)
      .split(', ')
      .map(val => +val)

    rgba[4] = .5

  } else {
    rgba = color
      .slice(4, color.length - 1)
      .split(', ')
      .map(val => +val)

    rgba
      .push(0.5)
  }

  rgba
    .forEach(val => fadeColor += val + ',')


  fadeColor = fadeColor
    .slice(0, fadeColor.length - 1) +
    ')'

  return {
    textSize,
    color,
    fadeColor
  }
}

const fallBackCopy = (text) => {

  $('input[name=copyClip')
    .val(text)
    .focus()
    .select()

  document
    .getElementsByName('copyClip')[0]
    .setSelectionRange(0, 99999);

  document.execCommand("copy");
}


const copyToClipboard = (text) => {

  if (!navigator.clipboard) {
    fallBackCopy(text);
    return;
  }
  navigator.clipboard.writeText(text)
    .catch(err => alertPop.err(`your clipboard is deactivated.
    </br> please copy the text manually.
    `))
}

jQuery(() => {

  $('body').append(
    `<input type='text' name='copyClip' 
    style = 'display:none'>`
  )

  $('.copy-tooltip')
    .attr('data-copy', 'click to copy')
    .on('click', function () {


      const {
        textSize,
        color,
        fadeColor
      } = animation_val($(this))

      copyToClipboard($(this).html())


      $(this)
        .attr('data-copy', 'copied')
        .css('color', fadeColor)
        .animate({
          fontSize: textSize / 1.1 + 'px',
        }, 200, function () {
          $(this)
            .css('color', color)
        })
        .animate({
          fontSize: textSize + 'px',
        }, 100)


    })
    .on('mouseleave', function () {
      $(this)
        .attr('data-copy', 'click to copy')
    })

})