
const weatherForm = document.querySelector('form')
const searchValue = document.querySelector('input')
const msgLocation= document.querySelector('#location')
const msgDetail= document.querySelector('#details')
weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const loc = searchValue.value
    fetch('http://localhost:3001/weather?address='+encodeURIComponent(loc)).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            msgLocation.textContent =data.error
            msgDetail.textContent = ''
        }else{
        msgLocation.textContent= data.location
        msgDetail.textContent = 'Temp(in fahrenheit): '+data.temp+'And Probability of Rain: '+data.rainProb
        }
    })
})
})