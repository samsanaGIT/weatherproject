import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WeatherCard } from './WeatherCard.jsx'; // Make sure the extension matches your file

describe('WeatherCard', () => {
  it('displays weather information correctly', () => {
    const mockData = {
      name: 'London',
      main: {
        temp: 20,
        feels_like: 22,
        humidity: 80,
        pressure: 1013
      },
      weather: [{
        main: 'Clear',
        description: 'clear sky',
        icon: '01d'
      }],
      wind: {
        speed: 5
      }
    };

    render(<WeatherCard data={mockData} />);
    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('20°C')).toBeInTheDocument();
  });
});