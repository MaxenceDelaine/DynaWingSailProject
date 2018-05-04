// Run the script when the form is submit
$(document).ready(function(){
  $('#contactForm').on('submit', function (event) {
    event.preventDefault()

    let postInputs = $(this).serializeArray()

    let alertBanner = (status, message) => {
      let alertBannerText = `<div class="alert alert-${status} alert-dismissible fade show" role="alert"> ${message}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button></div>`
      $('#banner').after(alertBannerText)
      //close all alert after 10 sec
      setTimeout(() => {
        $('.alert').alert('close')
      }, 10000)
    }

    // send the data to the server
    $.ajax({
      type:'POST',
      url: '/contact',
      data: postInputs,
      complete: (xhr, textStatus) =>{
        if (textStatus === 'success') {
          alertBanner('success', 'Votre message a bien été envoyé')
        } else {
          alterBanner('danger', `L'envoi de votre message a échoué`)
        }
      }
    })
    })
})
