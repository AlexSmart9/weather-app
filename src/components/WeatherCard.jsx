import React, { useRef, useState } from 'react'
import './styles/WeatherCard.css'

const WeatherCard = ({weather, temp, setCity, messageError, city}) => {
    const [isCelsius, setIsCelsius] = useState(true)
    const handleDegrees = () => { 
        setIsCelsius(!isCelsius)
    }
    const handleSubmit = (e) => { 
        e.preventDefault()
        setCity(inputSearch.current.value)
     }
     const inputSearch = useRef()
  return (
    <section className='card flex-container'>
        <h1 className='card__title'>Weather App</h1>
        <h2 className='card__location'>{weather?.name}, {weather?.sys.country}</h2>
        <form className='card__search flex-container' onSubmit={handleSubmit} >
            <input className='card__input' type="search" placeholder='Search by City' ref={inputSearch}/>
            <button className='card__btn'>Search</button>
        </form >
        {messageError && <p>{city} doesn't exist 🙄</p>}
        <article className='card__body grid-container'>
            <div className='card__img-container'>
                <img className='card__img' src= {`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="" />
            </div>
            <article className='info grid-container'>
                <h3 className='info__title'>{weather?.weather[0].description}</h3>
                <ul className='info__list grid-container'>
                    <li className='info__item grid-container'>
                        <span className='info__label'>Wind Speed</span>
                        <span className='info__value'>{weather?.wind.speed}m/s</span>
                        </li>
                    <li className='info__item grid-container'>
                        <span className='info__label'>Clouds</span>
                        <span className='info__value'>{weather?.clouds.all}%</span>
                        </li>
                    <li className='info__item grid-container'>
                        <span className='info__label'>Pressure</span>
                        <span className='info__value'>{weather?.main.pressure}hPa</span>
                        </li>
            </ul>
            </article>  
            </article> 
            <h2 className='card__temp'>{isCelsius ? `${temp?.celsius}°C`: `${temp?.fahrenheit}°F` }</h2>
            <button className='card__btn' onClick={handleDegrees}>Change to {isCelsius? '°F' : '°C'} </button> 
    </section>
  )
}

export default WeatherCard