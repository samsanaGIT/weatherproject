export function WeatherCard({ data }) {
  const current = data.current;
  const weatherCondition = current.weather[0];

  return (
    <div className="weather-card">
      <div className="weather-card-header">
        <div>
          <h2>{data.location.name}</h2>
          <p>{weatherCondition.main}</p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${weatherCondition.icon}@2x.png`}
          alt={weatherCondition.description}
          className="weather-icon"
        />
      </div>
      <div className="weather-card-grid">
        <div className="weather-temp">
          <p className="weather-temp-value">{Math.round(current.temp)}°C</p>
          <p className="weather-description">{weatherCondition.description}</p>
        </div>
        <div className="weather-details">
          <p>Feels like: {Math.round(current.feels_like)}°C</p>
          <p>Humidity: {current.humidity}%</p>
          <p>Wind: {current.wind_speed} m/s</p>
        </div>
      </div>
    </div>
  );
}
