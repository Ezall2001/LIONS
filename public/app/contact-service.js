const getInput = (fields = []) => {

  return fields
    .map(field => ({
      name: $(field).attr('name'),
      value: DOMPurify.sanitize($(field).val())
    }))
}

const getMissing = (input = []) => {

  return input
    .filter(input =>
      validator.isEmpty(input.value))
    .map(input => input.name)
}

const getInvalid = (input = []) => {

  return input = input
    .filter(input => {

      switch (input.name) {
        case 'phone': {

          input.value = input.value
            .replace(/ /g, '', '-g')

          return !validator
            .isMobilePhone(input.value)
        }

        case 'email': {
          return !validator
            .isEmail(input.value)

        }

        default: {
          return false
        }
      }
    })
    .map(input => input.name)


}

let err = null

const errHandler = (errorName, errors = []) => {

  if (errors.length > 0) {

    err = `these fields are ${errorName}: <i>`
    errors.forEach(input => {
      err += input + ' - '
      $(`input[name=${input}],textarea[name=${input}]`)
        .addClass('error')
    })

    err = err.slice(0, err.length - 3) + '</i>'

    return err
  }
}

const sendEmail = (input, fields) => {

  $.ajax({
    method: 'POST',
    url: 'https://formsubmit.co/ajax/armen.bakir@esprit.tn',
    dataType: 'json',
    accepts: 'application/json',
    data: {
      _captcha: 'false',
      _template: 'table',
      email: input[0].value,
      phone: input[1].value,
      message: input[2].value
    },
    success: (data) => {
      alertPop.success("Email sent")
      $(fields).removeClass('ok')
    },
    error: (err) => {
      alertPop.err(`sorry for your inconvience, this service is down temporarily.
          </br> please contact us on <u>lionsclubsirius@gmail.com</u>
          `)
    }
  })

}

const realTimeValidation = field => {

  const input = [{
    name: $(field).attr('name'),
    value: $(field).val()
  }]

  let err = null
  const missing = getMissing(input)

  if (missing.length == 0) {

    const invalid = getInvalid(input)
    err = errHandler('invalid', invalid)

    if (err != null) {
      $(field).addClass('error')
      $(field).removeClass('ok')
    } else {
      $(field).addClass('ok')
      $(field).removeClass('error')
    }
  } else {
    $(field).removeClass('ok')
    $(field).removeClass('error')

  }
}



jQuery(() => {

  const fields = $('.contact input, .contact textarea')
    .toArray()

  $(fields)
    .on('focusout', function () {
      realTimeValidation(this)
    })
    .on('input', function () {
      if ($(this).hasClass('error')) {
        realTimeValidation(this)
      }
    })


  $('section.contact button[type=submit]')
    .on('click', event => {

      event.preventDefault()

      const input = getInput(fields)
      const missing = getMissing(input)
      const invalid = getInvalid(input)

      err = errHandler('invalid', invalid)
      err = errHandler('missing', missing)

      if (err == null) {
        sendEmail(input, fields)
      } else {
        alertPop.err(err)
      }

    })


})