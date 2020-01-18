const request= require('request')
 
 
 const getForcast =(lat, lang, callback)=>{
    const url= 'https://api.darksky.net/forecast/404f7e5373c98f73187bff5f30d65b7b/'+encodeURIComponent(lat) +','+encodeURIComponent(lang)+'?limit=1'
 request({url, json: true},(error, response)=>{
     if(error){
            callback(error, undefined)
     }else if(response.body.error){
            callback('Use a Valid Location', undefined)
     }else{
         const data={
             summary:response.body.daily.summary,
             rainProb: response.body.currently.precipProbability,
             temp: response.body.currently.temperature
         }
            callback(undefined, data)
     }
 })

}

module.exports = getForcast