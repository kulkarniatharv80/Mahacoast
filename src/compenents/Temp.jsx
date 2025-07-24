import React, { useEffect, useState } from 'react';

const Temp = ({ coordinates }) => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            const { lat, lng } = coordinates;
            const apiKey = "3aab73ff1a3e4b17a64175447241910";

            const weatherApiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lng}&days=1`;

            try {
                const response = await fetch(weatherApiUrl);

                
/** i need you to understand. mike be careful. we have to options three man operation mot two lay down  lets go . re  
  you are the cure not cause. i have been covering his ass for two days now each day of covering will cost 10 bugs now. do i need to coff you. * 
*/

                const data = await response.json();

                if (data.current) {
                    const sunrise = data.forecast.forecastday[0].astro.sunrise || 'N/A'; 
                    const sunset = data.forecast.forecastday[0].astro.sunset || 'N/A';
                    const date = data.location.localtime.split(" ")[0];
                    const [year, month, day] = date.split("-");
                    const formattedDate = `${day} ${month} ${year}`;

                    setWeatherData({
                        temperature: `${data.current.temp_c}°C`,
                        humidity: `${data.current.humidity}%`,
                        windSpeed: `${data.current.wind_kph} km/h`,
                        precipitation: `${data.current.precip_mm} mm`,
                        uvIndex: data.current.uv,
                        visibility: `${data.current.vis_km} km`,
                        sunrise,
                        sunset,
                        date: formattedDate,
                    });
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        if (coordinates?.lat && coordinates?.lng) {
            fetchWeatherData();
        }
    }, [coordinates]);

    if (!weatherData) {
        return (
            <div className="bg-white rounded-xl p-4 shadow-md w-full">
                <p className="text-gray-500 text-center">Loading weather...</p>
            </div>
        );
    }

    return (
        <div className="bg-[#014d4d] p-4 w-full overflow-x-auto h-40">
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
                <WeatherBox label="Temp" value={weatherData.temperature} />
                <WeatherBox label="Humidity" value={weatherData.humidity} />
                <WeatherBox label="Wind" value={weatherData.windSpeed} />
                <WeatherBox label="Rain" value={weatherData.precipitation} />
                <WeatherBox label="UV" value={weatherData.uvIndex} />
                <WeatherBox label="Visibility" value={weatherData.visibility} />
                <WeatherBox label="Sunrise" value={weatherData.sunrise} />
                <WeatherBox label="Sunset" value={weatherData.sunset} />
                <WeatherBox label="Date" value={weatherData.date} />
            </div>
        </div>
    );
};


const WeatherBox = ({ label, value }) => {
    return (
        <div className="flex flex-col items-center justify-center min-w-[80px] h-32 bg-blue-50 p-2 rounded-lg">
            <span className="text-xs text-gray-500">{label}</span>
            <span className="text-sm font-semibold">{value}</span>
        </div>
    );
};

export default Temp;
