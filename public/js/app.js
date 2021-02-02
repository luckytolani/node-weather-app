
const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageSecond = document.querySelector('#message-2')

// messageOne.textContent = 'From JavaScript'

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    fetch('/weather?address='+ encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            }
            else{
                messageOne.textContent = data.location
                messageSecond.textContent = data.forecast
                console.log(data.location)
                console.log(data.forecast)            
            }
        })
    })
})