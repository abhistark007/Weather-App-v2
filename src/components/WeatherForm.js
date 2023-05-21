import React from 'react'
import {FaSearchengin} from 'react-icons/fa'

function WeatherForm({cityController,setCityController}) {
  return (
    <div className='flex bg-white mx-10 justify-between rounded-3xl my-5'>
        <input  className=' rounded-l-3xl h-12 outline-none px-4 flex-1 ' placeholder='City Name' value={cityController}
        onChange={(e)=>setCityController(e.target.value)}
        />
        <div className='flex text-white text-3xl bg-purple-600 rounded-r-3xl justify-between items-center px-4 duration-200 hover:scale-105 cursor-pointer'>
            <FaSearchengin/>
        </div>
    </div>
  )
}

export default WeatherForm