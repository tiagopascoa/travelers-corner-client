import React from "react";
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import '../App.css';

function Weather ({lat, long, location}) {

  //Make sure to include your Open Wheater API key
  const wheaterKey = process.env.REACT_APP_WHEATER_API_KEY

    const { data, isLoading, errorMessage } = useOpenWeather({
        key: wheaterKey,
        lat: lat,
        lon: long,
        lang: 'en',
        unit: 'metric', // values are (metric, standard, imperial)
      });
      console.log(lat, long, location, 'props on weather received')

      return (
        <>  
        <div className="ReactWeather mb-2">
        <ReactWeather 
          className="weather" 
          isLoading={isLoading}
          errorMessage={errorMessage}
          data={data}
          lang="en"
          locationLabel={location}
          unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
          showForecast
        />
        </div>
        </>
)
}
export default Weather;