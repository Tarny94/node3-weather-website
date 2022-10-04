const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


console.log("1",__dirname)
console.log("2",__filename)

const app = express()

//Define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars for engine and view location
app.set('view engine','hbs')
app.set('views',viewsPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.get('',(req, res) => {
  res.render('index' ,{
    title: 'Weather', 
    name: "Alex Tarny"
  })
})

app.get('/about', (req,res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Alex Tarny'
  });
}) 

app.get('/help',(req,res) => {
  res.render('help', {
    title: 'Help',
    message: 'How can i help you?',
    name: 'Alex Tarny'
  })
})

app.get('/weather', (req,res) => {
  if(!req.query.address) {
    return res.send({
      error: 'You must provide a location'
    })
  }

  geocode(req.query.address,(error,{latitude,longitude,location} = {}) => {
    if(error) {
      res.send({
         error
      })
    } else {
      forecast(latitude,longitude,(error,forecastData)=> {
        if(error) {
          res.send({
            error
          })
        } else {
            res.send({
            forecast: forecastData,
            location,
            address: req.query.address
          });
        }
      })
    }
  })
})

app.get('/products', (req,res) => { 
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.search);
  res.send({
    products: []
  })
})

app.get('/help/*', (req,res) => {
  res.render('404',{
    title: '404',
    message: 'Help article not found',
    name: 'Alex Tarny'
  })
})

app.get('*',(req,res) => {
     res.render('404',{
      title: '404',
      message: 'Page not found',
      name: 'Alex Tarny'
    })
})
//app.com
//app.com/help
//ap.com/about

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
})