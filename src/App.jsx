
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'
import Loader from './components/Loader'

function App() {
  const [coords, setCoords] = useState(null)
  const [weather, setWeather] = useState(null)
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [city, setCity] = useState('')
  const [messageError, setMessageError] = useState(false)
  const [background, setBackground] = useState()
  
  

  
   useEffect(() => {
    setTimeout(() => {
      setShowMessage(true)
    }, 3000);
    const success = (position) => { 
      setCoords({
        lat : position.coords.latitude,
        lon : position.coords.longitude,
      })
  
     }
     const error = () => {
        setHasError(true)
        setIsLoading(false)
     }
    navigator.geolocation.getCurrentPosition(success, error)
  }, [])
  
  
  useEffect(() => {
   if (coords) {
  const API_KEY = '9d3990efcf8b3c6b535f0fddd5d90fb6'

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`

  axios
  .get(url)
.then((res)=> {
    setWeather(res.data)
    const celsius = (res.data.main.temp - 273.15).toFixed(1) 
    const fahrenheit = ((celsius*9) / 5 + 32).toFixed(1)
    setTemp({celsius, fahrenheit})
    setMessageError(false)
    setBackground(res.data.weather[0].main)
})        
  .catch((err) => {
    console.error(err)
    setMessageError(true)
  })
  .finally(() => {
    setIsLoading(false)
  })
}
  
  }, [coords,city])

  const objStyles = {
      backgroundImage : `url(/img/${background}.webp)`

  }
  
  
  

  return (
   <div style={objStyles} className='app flex-container'>
    {isLoading ? (
      <div>
        <Loader/>
        {showMessage && <p className='card__error card__text flex-container'>Please activate location</p>}
      </div>
      
    ):hasError ? (<h1 className='card__error flex-container'>Please activate the location to know the current weather in your city</h1> 
    ): (<WeatherCard 
    weather={weather} 
    temp={temp} 
    setCity={setCity} 
    messageError={messageError} 
    city={city}/>)}
     
   </div>
  )
}

export default App
