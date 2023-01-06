﻿const express = require('express')
const app = express()
const path = require('path')
const fetch = require('node-fetch')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const key = '94da08fb639a1f05110ab103743a281b';

const getWeatherDataPromise = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(responce => {
                return responce.json()
            })
            .then(data => {
                let description = data.weather[0].description
                let city = data.name
                let temp = Math.round(parseFloat(data.main.temp) -273.15)
                let result = {
                    description: description,
                    city: city,
                    temp: temp,
                    error: null
                }
                resolve(result)
            })
            .catch(error => {
                reject(error)
            })
    })
}

app.all('/', function (req, res) {
    let city
    if (req.method === 'POST' && req.body.cityname) {
        city = req.body.cityname;
    } else {
        city = 'Tartu';
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
    getWeatherDataPromise(url)
        .then(data => {
            res.render('index', data)
        })
        .catch(error => {
            res.render('index', {error: 'Problem-with-getting data, try again'})
        })
})

app.listen(3005)
