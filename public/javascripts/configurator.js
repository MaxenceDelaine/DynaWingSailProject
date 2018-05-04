var bulbObj = {
  "0" : { img: "#"},
  "1" : { img: "images/calques/bulbe/red.png"},
  "2" : { img: "images/calques/bulbe/blue.png"},
  "3" : { img: "images/calques/bulbe/lightblue.png"},
  "4" : { img: "images/calques/bulbe/orange.png"},
  "5" : { img: "images/calques/bulbe/purple.png"},
  "6" : { img: "images/calques/bulbe/green.png"},
  "7" : { img: "images/calques/bulbe/yellow.png"},
  "8" : { img: "images/calques/bulbe/black.png"}
};

var coqObj = {
  "0" : { img: "#"},
  "1" : { img: "images/calques/coque/red.png"},
  "2" : { img: "images/calques/coque/blue.png"},
  "3" : { img: "images/calques/coque/lightblue.png"},
  "4" : { img: "images/calques/coque/orange.png"},
  "5" : { img: "images/calques/coque/purple.png"},
  "6" : { img: "images/calques/coque/green.png"},
  "7" : { img: "images/calques/coque/yellow.png"},
  "8" : { img: "images/calques/coque/black.png"}
};

var nezObj = {
  "0" : { img: "#"},
  "8" : { img: "images/calques/nez/black.png"},
  "7" : { img: "images/calques/nez/yellow.png"}
}

var pontObj = {
  "8" : { img: "images/calques/pont/black.png"},
  "0" : { img: "images/calques/pont/white.png"}
}

let colorCode = {
  '0' : {color: "white", text: 'Blanc' },
  '1' : {color: "red", text: 'Rouge' },
  '2' : {color: "blue", text: 'Bleu' },
  '3' : {color: "light-blue", text: 'Bleu-clair' },
  '4' : {color: "orange", text: 'Orange' },
  '5' : {color: "purple", text: 'Violet' },
  '6' : {color: "green", text: 'Vert' },
  '7' : {color: "yellow", text: 'Jaune' },
  '8' : {color: "black", text: 'Noir'}
}

$('#product_option5').change(function(){
  if ($(this).is(':checked')) {
      $('#roof-tape').attr('src', "images/calques/tape.png")
      $('#res-pont-arr').text('Noire').removeClass().addClass('black')
  } else {
      $('#roof-tape').attr('src', '#')
      $('#res-pont-arr').text('Blanc').removeClass().addClass('white')
  }
});

$('#product_option6').change(function(){
  if ($(this).is(':checked')) {
      $('#back-pont').attr('src', "images/calques/bpont.png")
      $('#res-adh').text('Noire').removeClass().addClass('black')
  } else {
      $('#back-pont').attr('src', '#')
      $('#res-pont-arr').text('Blanc').removeClass().addClass('white')

  }
});

/////////////////////////////
// Click on pallette navlinks
/////////////////////////////

let others = ['coque', 'bulbe', 'nez', 'pont']

$('#cq').click(function() {
  for (let i = 0; i < others.length; i++) {
    if ($(`#palette-${others[i]}`).hasClass('invisible') === false) {
      $(`#palette-${others[i]}`).addClass('invisible')
    }
  }
  $('#palette-coque').removeClass('invisible')
})

$('#bb').click(function() {
  for (let i = 0; i < others.length; i++) {
    if ($(`#palette-${others[i]}`).hasClass('invisible') === false) {
      $(`#palette-${others[i]}`).addClass('invisible')
    }
  }
  $('#palette-bulbe').removeClass('invisible')
})

$('#nz').click(function() {
  for (let i = 0; i < others.length; i++) {
    if ($(`#palette-${others[i]}`).hasClass('invisible') === false) {
      $(`#palette-${others[i]}`).addClass('invisible')
    }
  }
  $('#palette-nez').removeClass('invisible')
})

$('#pt').click(function() {
  for (let i = 0; i < others.length; i++) {
    if ($(`#palette-${others[i]}`).hasClass('invisible') == false) {
      $(`#palette-${others[i]}`).addClass('invisible')
    }
  }
  $('#palette-pont').removeClass('invisible')
})

/////////////////////////////
// Click on pallette colors
/////////////////////////////

$('#palette-coque').on('click','.color-sample', function() {
  let value = $(this).attr('value');
  $('#coque').attr('src', coqObj[value].img);
  $('#res-coq').text(colorCode[value].text).removeClass().addClass(colorCode[value].color)
})

$('#palette-bulbe').on('click','.color-sample', function() {
  let value = $(this).attr('value');
  $('#bulbe').attr('src', bulbObj[value].img);
  $('#res-bulb').text(colorCode[value].text).removeClass().addClass(colorCode[value].color)

})

$('#palette-nez').on('click','.color-sample', function() {
  let value = $(this).attr('value');
  $('#nez').attr('src', nezObj[value].img);
  $('#res-nez').text(colorCode[value].text).removeClass().addClass(colorCode[value].color)

})


$('#palette-pont').on('click','.color-sample', function() {
  let value = $(this).attr('value');
  $('#pont').attr('src', pontObj[value].img);
  $('#res-pont').text(colorCode[value].text).removeClass().addClass(colorCode[value].color)

})


