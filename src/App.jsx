import { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { ForecastList } from './components/ForecastList';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { getWeather } from '../service/weatherAPI';

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const addToHistory = (cityLabel) => {
    setHistory((current) => {
      const next = [cityLabel, ...current.filter((item) => item !== cityLabel)];
      return next.slice(0, 6);
    });
  };

  const handleSearch = async (city) => {
    try {
      setIsLoading(true);
      setError('');
      const data = await getWeather(city);
      setWeather(data);

      const cityLabel = `${data.location.name}${data.location.country ? `, ${data.location.country}` : ''}`;
      addToHistory(cityLabel);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistoryClick = (cityLabel) => {
    const cityOnly = cityLabel.split(',')[0];
    handleSearch(cityOnly);
  };

  return (
    <div className="app-shell">
      <div className="app-card">
        <h1 className="app-title">Weather Dashboard</h1>

        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {history.length > 0 && (
          <div className="search-history">
            <div className="search-history-label">Recent searches</div>
            <div className="search-history-list">
              {history.map((item) => (
                <button
                  type="button"
                  key={item}
                  className="search-history-item"
                  onClick={() => handleHistoryClick(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {isLoading && <LoadingSkeleton />}

        {error && <div className="app-error">{error}</div>}

        {weather && (
          <>
            <WeatherCard data={weather} />
            <ForecastList daily={weather.daily} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
