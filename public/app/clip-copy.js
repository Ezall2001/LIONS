// /* Get the text field */
// var copyText = document.getElementById("myInput");

// /* Select the text field */
// copyText.select();
// copyText.setSelectionRange(0, 99999); /* For mobile devices */

// /* Copy the text inside the text field */
// document.execCommand("copy");

jQuery(() => {



  $('.copy-tooltip')
    .attr('data-copy', 'click to copy')
    .on('click', function () {
      $(this)
        .attr('data-copy', 'copied')
        .animate({
          fontSize: '1.25rem',
          opacity: '.5'
        }, 200)
        .animate({
          fontSize: '1.3rem',
          opacity: '1'
        }, 100)
    })
    .on('mouseleave', function () {
      $(this)
        .attr('data-copy', 'click to copy')
    })

})