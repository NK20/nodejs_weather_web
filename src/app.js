const path= require('path')
const express =require('express')
const hbs = require('hbs')

const getForcast= require('./utils/forcast')
const geoCode = require('./utils/geoCode')

const app= express()
const port = process.env.PORT || 3000

const public = path.join(__dirname,'../public')
const viewsTemp = path.join(__dirname,'../templates/views')
const partialTemp = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views',viewsTemp)
hbs.registerPartials(partialTemp)

app.use(express.static(public))

app.get('',(req, resp)=>{
    resp.render('index',{
        title:'Weather App',
        name:'NK'
    })
})

app.get('/about',(req, resp)=>{
    resp.render('about',{
        title:'About',
        name:'NK'
    })
})

app.get('/about/*',(req, resp)=>{
    resp.render('404',{
        title:'404- About',
        errormsg: 'Want To Know Us Better??? This is not the page to look for',
        name:'NK'
    })
})

app.get('/weather',(request, response)=>{

    if(!request.query.address){
           return response.send({
                error:"Require Address"
            })
    }
    geoCode(request.query.address,(error,{location,lat,long}={})=>{
        if(error){
            return response.send({
                error:"Invalid Address!! Unable to Locate"
            })
        }else{
            //console.log(resp)
            getForcast(lat,long,(error, resp)=>{
                if(error){
                    return response.send({
                        error:"Invalid Address"
                    })
                }else{
                   // console.log(resp)
                    response.send({
                        temp: resp.temp,
                        rainProb: resp.rainProb,
                        location
                    })
                }
            }) 
        }
            
    })
   
})

app.get('*',(request, response)=>{
    response.render('404',{
        title:'404',
        errormsg: '404 Page Not Found',
        name:'NK'
    })
})
app.listen(port,()=>{
    console.log('Server Start at :'+port)
})
