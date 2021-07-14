const getInput = (fields = []) => {

  return fields
    .map(field => ({
      name: $(field).attr('name'),
      value: $(field).val()
    }))
}

const getMissing = (input = []) => {

  return input
    .filter(input => input.value == '')
    .map(input => input.name)
}

const getInvalid = (input = []) => {

  input
    .filter(input => {

      if (input.name == 'tel') {}
    })

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

    alertPop.err(err)

    return err
  }



}

jQuery(() => {
  $('section.contact button[type=submit]')
    .on('click', event => {

      event.preventDefault()

      const fields = $('.contact input, .contact textarea')
        .toArray()

      const input = getInput(fields)
      const missing = getMissing(input)
      const invalid = getInvalid(input)


      err = errHandler('missing', missing)
      err = errHandler('invalid', invalid)




      // TODO: add the ok status and refactor this





      // if (err == null) {

      //   $.ajax({
      //     method: 'POST',
      //     url: 'https://formsubmit.co/ajax/armen.bakir@esprit.tn',
      //     dataType: 'json',
      //     accepts: 'application/json',
      //     data: {
      //       _captcha: 'false',
      //       _template: 'table',
      //       email: input[0].value,
      //       phone: input[1].value,
      //       message: input[2].value
      //     },
      //     success: (data) => alertPop.success("Email sent"),
      //     error: (err) => alertPop.err(`sorry for your inconvience, this service is down temporarily.
      //     </br> please contact us on <u>lionsclubsirius@gmail.com</u>
      //     `)
      //   })
      // }

    })




})