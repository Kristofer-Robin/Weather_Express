const express = require('express')
const app = express()
const path = require('path')
const fetch = require('node-fetch')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const key = '94da08fb639a1f05110ab103743a281b';
let city = 'Tartu'

app.get('/', function (req, res) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    then((responce) => {
        return responce.json()
})
 .then((data) => {
     let description = data.weather[0].description
     let city = data.name
     let temp = Math.round(parseFloat(data.main.temp)-273.15)
     console.log(description)
     console.log(city)
     console.log(temp)
res.render('index', {
    description: description,
    city: city,
    temp: temp
        })
    })
})
app.listen(3005)