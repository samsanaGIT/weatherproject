export function ForecastList({ daily }) {
  const formatDay = (dt) => new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(new Date(dt * 1000));

  return (
    <div className="forecast-section">
      <h3 className="forecast-title">7-Day Forecast</h3>
      <div className="forecast-grid">
        {daily.map((day) => (
          <div key={day.dt} className="forecast-card">
            <div className="forecast-day">{formatDay(day.dt)}</div>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
              className="forecast-icon"
            />
            <div className="forecast-values">
              <span>{Math.round(day.temp.day)}°C</span>
              <span>{day.weather[0].main}</span>
            </div>
            <div className="forecast-details">
              <span>Min: {Math.round(day.temp.min)}°C</span>
              <span>Max: {Math.round(day.temp.max)}°C</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
