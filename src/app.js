const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
//define path fo express config

const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

//Set up handle bars

app.set('view engine', 'hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

//setup static directory to serve

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Lucky Tolani'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Lucky Tolani'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title:'Help Page',
        name:'Lucky Tolani'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location} = {}) => {
        if(error){
            return res.send({ error })
        }
        forecast(latitude , longitude , (error , forecastdata) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
        
    })
    
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error',{
        title: '404',
        name: 'Lucky Tolani',
        message:"Help Article not Found"})
})

app.get('*', (req, res) => {
    res.render('error',{
        title: '404',
        name: 'Lucky Tolani',
        message: "My 404 page"})
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})