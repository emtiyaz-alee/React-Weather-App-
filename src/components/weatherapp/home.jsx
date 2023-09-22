import { useState, useRef, useEffect } from "react"
import axios from 'axios'
import WeatherCard from "../widgets/widgets";

const Home = () => {
    const [weatherData, setWeatherData] = useState([])
    const cityNameRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true)
    const [CurrentLocationWeather, setCurrentLocationWeather] = useState(null)
    useEffect(() => {
        setIsLoading(true)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (location) => {
                console.log("location", location)

                try {
                    setIsLoading(false)
                    const response = await
                        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&appid=03a094de2fbed757402784c8ab602833`)
                    console.log(response.data)
                    setCurrentLocationWeather(response.data)


                }
                catch (e) {
                    console.log(e)
                }


            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }


        return () => {

        }

    }, [])

    const WeatherHandler = async (e) => {
        e.preventDefault()
        try {

            const response = await
                axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityNameRef.current.value}&units=metric&appid=03a094de2fbed757402784c8ab602833`)
            console.log(response.data)
            setWeatherData([response.data, ...weatherData])

        }
        catch (e) {
            console.log(e)
        }



    }

    return (
        <div>
            <form onSubmit={WeatherHandler}>
                <label htmlFor="">CityName</label>
                <input type="text" name="" id="cityName"
                    required
                    minLength={2}
                    maxLength={10}
                    ref={cityNameRef}
                /><br />
                <button type="submit">Get Weather</button>
            </form>
            <hr />


            {weatherData.length ? (
                weatherData.map((eachData) => {
                    return <WeatherCard weatherData={eachData} />
                })
            ) :
                (

                    null

                )
            }
            {isLoading ? "loading..." : null}
            {CurrentLocationWeather ? <WeatherCard weatherData={CurrentLocationWeather} /> : null}

        </div>
    )
}
export default Home;
