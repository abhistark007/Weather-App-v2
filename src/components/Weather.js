import React, { useEffect, useState } from 'react'
import WeatherForm from './WeatherForm'
import './Weather.css';
import { toast } from 'react-toastify';

function Weather() {
    const [cityWeather, setCityWeather] = useState(null);
    const [cityController, setCityController] = useState("");
    const [loading, setLoading] = useState(false);



    const getCityData = () => {
        setLoading(true);
        try {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityController}&units=metric&appid=0fd12e44a925b9275b943a063058d142`)
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    setCityWeather(result)
                });
                toast("Weather data fetched successfully !");
        } catch (e) {
            console.log("Error occured inside getCityData() function");
            toast("Error while fetch weather data");
        }
        setLoading(false);
    }
    const [date,setDate]=useState();

    useEffect(()=>{
        let now=setInterval(()=>{
            setDate(new Date().toUTCString())
        },1000)
        return ()=>clearInterval(now); 
    },[])

    return (
        <div className='flex flex-col bg-black opacity-90 mt-16 mx-auto w-[70vw] min-h-[90vh] rounded-xl'>
            <WeatherForm cityController={cityController} setCityController={setCityController} getCityData={getCityData} />
            {
                loading ? (<div className='w-full mx-10 mt-20'>
                    <div class="custom-loader"></div>
                </div>) :
                    (
                        (<div className='text-white flex flex-col'>
                            <div>
                                {date}
                            </div>
                            {
                                cityWeather === null ? (<></>):
                                (<li>{cityWeather.main.temp}</li>)
                            }
                            
                        </div>))
            }
        </div>
    )
}

export default Weather