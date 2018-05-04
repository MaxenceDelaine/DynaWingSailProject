var express = require('express')
var router = express.Router()
let hbs = require('hbs')
let session = require('express-session')
let Jimp = require('jimp')
let fs = require('fs')
let request = require('request')
let lang = 'fr'

let contact = require('./contact.js')
let home = require('./home.js')
let innovations = require('./innovations.js')
let arlequin = require('./arlequin.js')
let mentionslegales = require('./mentionslegales.js')
let cgu = require('./cgu.js')
let nodemailer = require('nodemailer')

/* GET home page. */
router.get('/', function (req, res, next) {
  if (lang === 'fr') {
    res.render('index', home.accueil)
  } else if (lang === 'en') {
    res.render('index', home.home)
  }
})

/* GET contact page. */
router.get('/contact', function (req, res, next) {
  if (lang === 'fr') {
    res.render('contact', contact.contact)
  } else if (lang === 'en') {
    res.render('contact', contact.contactEN)
  }
})

/* GET innovations page. */
router.get('/innovations', function (req, res, next) {
  if (lang === 'fr') {
    res.render('innovations', innovations.innovations)
  } else if (lang === 'en') {
    res.render('innovations', innovations.innovationsEN)
  }
})

/* GET arlequin page. */
router.get('/arlequin', function (req, res, next) {
  if (lang === 'fr') {
    res.render('arlequin', arlequin.arlequin)
  } else if (lang === 'en') {
    res.render('arlequin', arlequin.arlequinEN)
  }
})

/* GET mentionslegales page. */
router.get('/mentionslegales', function (req, res, next) {
  if (lang === 'fr') {
    res.render('mentionslegales', mentionslegales.mentionslegales)
  } else if (lang === 'en') {
    res.render('mentionslegales', mentionslegales.mentionslegalesEN)
  }
})

/* GET cgu page. */
router.get('/cgu', function (req, res, next) {
  if (lang === 'fr') {
    res.render('cgu', cgu.cgu)
  } else if (lang === 'en') {
    res.render('cgu', cgu.cguEN)
  }
})

/* POST language */
router.post('/lang', (req, res) => {
  // on stocke la langue dans la session
  lang = req.body.lang
})

/* POST contact route */
router.post('/contact', function (req, res, next) {
  console.log(req.body.firstNameInput)
  let smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'XXXXXXX@gmail.com', // Entrez ici l'adresse email de contact
      pass: 'XXXXXXXXXX' // Et le mot de passe de l'adresse email en question
    }
  })

  smtpTransport.sendMail({
    from: `${req.body.firstNameInput} ${req.body.lastNameInput} <${req.body.emailInput}>`,
    to: 'XXXXXXX@gmail.com', // Entrez ici l'adresse email de contact
    subject: 'Contact DWS',
    text:
    `Bonjour Paul-Henri Decamp,

    Vous avez reçu un nouveau message provenant du site web Dyna Wing Sail de la part de ${req.body.firstNameInput} ${req.body.lastNameInput} <${req.body.emailInput}>, de nationalité ${req.body.nationalityInput}.

    Sujet: ${req.body.subjectInput}

    Contenu du message:
    "${req.body.messageInput}"

    Bon vent!
    `
  }, (err, resp) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    } else {
      console.log('Email send')
      res.sendStatus(200)
    }
  })
}
)

// POST to compile images
router.post('/compile', function (req, res) {
  let backPontURL = (req.body.backPont === '#' ? 'public/images/calques/vide.png' : 'public/' + req.body.backPont)
  let nezURL = (req.body.nez === '#' ? 'public/images/calques/vide.png' : 'public/' + req.body.nez)
  let bulbeURL = (req.body.bulbe === '#' ? 'public/images/calques/vide.png' : 'public/' + req.body.bulbe)
  let coqueURL = (req.body.coque === '#' ? 'public/images/calques/vide.png' : 'public/' + req.body.coque)
  let roofURL = (req.body.roofTape === '#' ? 'public/images/calques/vide.png' : 'public/' + req.body.roofTape)
  let pontURL = (req.body.pont === '#' ? 'public/images/calques/vide.png' : 'public/' + req.body.pont)

  Jimp.read(pontURL).then(function (pont) {
    Jimp.read(roofURL).then(function (roof) {
      Jimp.read(backPontURL).then(function (backpont) {
        Jimp.read(nezURL).then(function (nez) {
          Jimp.read(bulbeURL).then(function (bulbe) {
            // layer
            Jimp.read(coqueURL).then(function (coque) {
              // Base image
              Jimp.read('public/images/calques/base.png').then(function (base) {
                console.log('Compilation start')
                base.composite(
                  coque.composite(
                    bulbe.composite(
                      nez.composite(
                        backpont.composite(
                          roof.composite(pont, 0, 0), 0, 0), 0, 0), 0, 0), 0, 0), 0, 0).write('public/images/new.png')
                console.log('Done')
                res.end()
              }).catch(function (err) {
                console.log('there s a problem')
              })
            }).catch(function (err) {
              console.log('I got zero problems big fella')
            })
          }).catch(function (err) {
            console.log('I got zero problems big fella')
          })
        }).catch(function (err) {
          console.log('I got zero problems big fella')
        })
      }).catch(function (err) {
        console.log('I got zero problems big fella')
      })
    }).catch(function (err) {
      console.log('I got zero problems big fella')
    })
  }).catch(function (err) {
    console.log('I got zero problems big fella')
  })
})

/* GET Download (picture of the personnalized sailboat) */
router.get('/download', function (req, res, next) {
  let IMGfile = __dirname + '/public/images/new.png'
  let fileName = 'new.png'
  console.log(__dirname)
  res.download('public/images/new.png', fileName, function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log('OK')
      res.end()
    }
  })
})
module.exports = router
