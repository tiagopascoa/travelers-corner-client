import React from "react";
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import '../App.css';

function Weather ({lat, long, location}) {
    const { data, isLoading, errorMessage } = useOpenWeather({
        key: '4284d5d912c0944a159548f46b5be92d',
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