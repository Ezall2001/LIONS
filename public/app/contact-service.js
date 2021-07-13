jQuery(() => {

  $('section.contact button[type=submit]')
    .on('click', event => {
      event.preventDefault()

      const input = $('.contact input')
        .toArray()
        .map(input => ({
          name: $(input).attr('name'),
          value: $(input).val()
        }))

      input.push({
        name: $('.contact textarea').attr('name'),
        value: $('.contact textarea').val()
      })

      const missing = input
        .filter(input => input.value == '')
        .map(input => input.name)

      let err = null

      if (missing.length > 0) {
        err = 'missing information '
        missing.forEach(input => err += input + ' - ')
        err = err.slice(0, err.length - 3)
        alertPop.err(err)
      }






      if (err == null) {

        $.ajax({
          method: 'POST',
          url: 'https://formsubmit.o/ajax/armen.bakir@esprit.tn',
          dataType: 'json',
          accepts: 'application/json',
          data: {
            _captcha: 'false',
            _template: 'table',
            email: input[0].value,
            phone: input[1].value,
            message: input[2].value
          },
          success: (data) => alertPop.success("Email sent"),
          error: (err) => alertPop.err(`sorry for your inconvience, this service is down temporarily.
          </br> please contact us on <u>lionsclubsirius@gmail.com</u>
          `)
        })
      }

    })




})