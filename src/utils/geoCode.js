const request= require('request')
 
 
 const geoCode =(searchPlace, callback)=>{
    
    const url= "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(searchPlace)+".json?access_token=pk.eyJ1Ijoibml0aW43NyIsImEiOiJjazVqcjVrcHYwNmQ0M2ZwNDN4dTg2Y2MzIn0.wQQvy2SOs4tfwG7Lkl5ICg"
 
    request({url, json: true},(error, response)=>{
     if(error){
            callback(error, undefined)
     }else if(response.body.features.length===0){
            callback('Use a Valid Location', undefined)
     }else{
         const data={
             location:response.body.features[0].place_name,
             lat: response.body.features[0].center[1],
             long: response.body.features[0].center[0]
         }
            callback(undefined, data)
     }
 })

}

module.exports = geoCode