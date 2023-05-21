import React, { useEffect, useState } from 'react'
import WeatherForm from './WeatherForm'
import './Weather.css';
import { toast } from 'react-toastify';
import { BsThermometerHalf } from 'react-icons/bs'
import { WiHumidity } from 'react-icons/wi'
import { BsWind, BsFillSunFill, BsFillSunsetFill } from 'react-icons/bs';
import { BiArrowToTop, BiArrowToBottom } from 'react-icons/bi'

function Weather() {
    const [cityWeather, setCityWeather] = useState(null);
    const [cityWeatherForecast, setCityWeatherForecast] = useState(null);
    const [cityController, setCityController] = useState("");
    const [loading, setLoading] = useState(false);

    const getCityForecastData = () => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityController}&units=metric&cnt=5&appid=0fd12e44a925b9275b943a063058d142`)
            .then((res) => res.json())
            .then((result) => {
                if(result.list===undefined){
                    return;
                }
                console.log(result.list);
                setCityWeatherForecast(result.list);
            })
    }

    const getCityData = () => {
        setLoading(true);
        try {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityController}&units=metric&appid=0fd12e44a925b9275b943a063058d142`)
                .then((res) => res.json())
                .then((result) => {
                    if(result.cod==="404"){
                        toast("City Name doesn't exists");
                        setCityWeather(null);
                        return ;
                    }
                    console.log("I AM HERE  ",result);
                    setCityWeather(result)
                    toast("Weather data fetched successfully !");
                });
                
            getCityForecastData();
           
        } catch (e) {
            console.log("Error occured inside getCityData() function");
            toast("Error while fetch weather data");
        }
        setLoading(false);
    }
    const [date, setDate] = useState();

    useEffect(() => {
        let now = setInterval(() => {
            setDate(new Date().toLocaleString())
        }, 1000)
        return () => clearInterval(now);
    }, [])


    // UNIX timestamp into time
    function timeConverter(UNIX_timestamp) {
        let a = new Date(UNIX_timestamp * 1000);

        let b = a.toLocaleString();
        let ans = b.substring(b.indexOf(",") + 1);
        return ans;
    }

    function getTime(str){
        let a=str.split(" ");
        return a[1];
    }

    return (
        <div className='flex flex-col bg-black opacity-90 mt-16 mx-auto w-[70vw] min-h-[90vh] rounded-xl'>
            <WeatherForm cityController={cityController} setCityController={setCityController} getCityData={getCityData} />
            {
                loading ? (<div className='w-full mx-10 mt-20'>
                    <div class="custom-loader"></div>
                </div>) :
                    (
                        (<div className='text-white flex flex-col w-full gap-5'>
                            <div className='wrapper  px-2 py-2 flex justify-center'>
                                {date}
                            </div>

                            {
                                ( cityWeather === null ) ? (<></>) :
                                    (cityWeather.cod==="404")?(<></>):(<> 
                                        <div className='flex justify-center text-2xl'>{cityWeather.name} , {cityWeather.sys.country}</div>
                                        <div className='flex justify-between items-center mx-10 max-md:flex-col max-md:gap-3'>
                                            <div className='bg-white rounded-xl flex flex-col'><img src={`https://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`} alt='weather' />
                                            <p className='text-purple-950  uppercase text-center px-2 pb-1'>{cityWeather.weather[0].description}</p>
                                            </div>
                                            <div className='text-3xl'>{cityWeather.main.temp} °C</div>
                                            <div className='flex flex-col gap-3'>
                                                <div className='flex  items-center gap-3'>
                                                    <BsThermometerHalf />
                                                    <p>Feels like {cityWeather.main.feels_like} °C</p>
                                                </div>
                                                <div className='flex  items-center gap-3'>
                                                    <WiHumidity />
                                                    <p>Humidity {cityWeather.main.humidity} %</p>
                                                </div>
                                                <div className='flex  items-center gap-3'>
                                                    <BsWind />
                                                    <p>Wind {cityWeather.wind.speed} km/h</p>
                                                </div>
                                            </div>


                                        </div>
                                        <div className='flex justify-evenly items-center max-md:flex-col max-md:gap-3'>
                                            <div className='flex items-center gap-2'>
                                                <BsFillSunFill />
                                                <p>Rise: {timeConverter(cityWeather.sys.sunrise)}</p>
                                            </div>

                                            <div className='flex items-center gap-2'>
                                                <BsFillSunsetFill />
                                                <p>Set: {timeConverter(cityWeather.sys.sunset)}</p>
                                            </div>

                                            <div className='flex items-center gap-2'>
                                                <BiArrowToTop />
                                                <p>High: {cityWeather.main.temp_max} °C</p>
                                            </div>

                                            <div className='flex items-center gap-2'>
                                                <BiArrowToBottom />
                                                <p>Low: {cityWeather.main.temp_min} °C</p>
                                            </div>


                                        </div>

                                        {
                                            cityWeatherForecast === null ? (<></>) :
                                                (<>
                                                <p className='mx-10 text-xl uppercase font-bold max-md:text-center'>Today's Hourly Forecast</p>
                                                <div className='flex flex-wrap justify-evenly max-md:flex-col max-md:gap-3'>
                                                    
                                                    {
                                                        cityWeatherForecast.map((forecast,index) => {
                                                            return (
                                                                <div key={index} className='flex flex-col gap-2 items-center border-2 border-purple-500 rounded-xl p-2'>
                                                                    <p>{getTime(forecast.dt_txt)}</p>
                                                                    <img src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} alt='weather'/>
                                                                    <p>{forecast.main.temp} °C</p>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>

                                                </>)
                                        }
                                    </>)
                            }

                        </div>))
            }
        </div>
    )
}

export default Weather