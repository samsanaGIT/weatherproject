const API_KEY = import.meta.env.VITE_API_KEY?.trim();
const BASE_URL = import.meta.env.VITE_API_URL?.trim() || 'https://api.openweathermap.org';

const handleResponse = async (response) => {
  if (response.ok) {
    return response.json();
  }

  const text = await response.text();
  let message = `Failed to fetch weather data (${response.status})`;

  try {
    const data = JSON.parse(text);
    message = data.message || message;
  } catch {
    message = text || message;
  }

  if (response.status === 401) {
    message = 'Invalid API key. Check VITE_API_KEY in .env and restart the dev server.';
  }

  throw new Error(message);
};

const geocodeCity = async (city) => {
  const response = await fetch(
    `${BASE_URL}/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
  );

  const data = await handleResponse(response);

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('City not found. Try a different name or include a country code.');
  }

  return data[0];
};

export const getWeather = async (city) => {
  if (!API_KEY) {
    throw new Error('Missing VITE_API_KEY environment variable.');
  }

  const location = await geocodeCity(city);
  const weatherResponse = await fetch(
    `${BASE_URL}/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=minutely,hourly,alerts&appid=${API_KEY}&units=metric`
  );

  const weatherData = await handleResponse(weatherResponse);

  return {
    location: {
      name: location.name,
      country: location.country,
    },
    current: weatherData.current,
    daily: Array.isArray(weatherData.daily) ? weatherData.daily.slice(1, 8) : [],
  };
};