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

const animateToolTip = (toolTip, style) => {
  $(toolTip)
    .attr('data-copy', 'copied')
    .css('color', style.fadeColor)
    .animate({
      fontSize: style.textSize / 1.1 + 'px',
    }, 200, function () {
      $(this)
        .css('color', style.color)
    })
    .animate({
      fontSize: style.textSize + 'px',
    }, 100)
}

const resetToolTip = () => {
  $('.copy-tooltip')
    .off('click')
    .off('mouseleave')

  $('.copy-tooltip')
    .attr('data-copy', 'click to copy')
    .on('click', function () {
      const style = animation_val($(this))
      copyToClipboard($(this).html())
      animateToolTip(this, style)
    })
    .on('mouseleave', function () {
      $(this)
        .attr('data-copy', 'click to copy')
    })
}

jQuery(() => {

  $('body').append(
    `<input type='text' name='copyClip' 
    style = 'display:none'>`
  )

  resetToolTip()

})