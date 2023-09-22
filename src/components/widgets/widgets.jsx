import '../widgets/widgets.css'

const WeatherCard = ({weatherData}) => {
    return (
        <div className='card'>
            cityName:{weatherData?.name}<br />
             <span className='temp'>{weatherData?.main?.temp}°C</span> <br/>
            feels Like:{weatherData?.main?.feels_like}<br />
            Pressure:{weatherData?.main?.pressure}<br />
            Country:{weatherData?.sys?.country}<br />
        </div>
    )
}
export default WeatherCard;