import React, { useState } from 'react'
import WeatherForm from './WeatherForm'

function Weather() {
    const [cityWeather,setCityWeather]=useState(null);
    const [cityController,setCityController]=useState("");



    const getCityData=()=>{

    }

  return (
    <div className='flex flex-col bg-black opacity-90 mt-16 mx-auto w-[70vw] min-h-[90vh] rounded-xl'>
        <WeatherForm cityController={cityController} setCityController={setCityController}/>
    </div>
  )
}

export default Weather