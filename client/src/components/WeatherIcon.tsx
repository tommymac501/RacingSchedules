type WeatherIconProps = {
  weather: string | null;
};

const WeatherIcon = ({ weather }: WeatherIconProps) => {
  // Determine which icon to show based on the weather description
  let icon;
  
  // Handle null weather data
  if (!weather) {
    // Default icon for unknown weather
    icon = (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
      </svg>
    );
    return icon;
  }
  
  const weatherLower = weather.toLowerCase();
  
  if (weatherLower.includes('clear') || weatherLower.includes('sunny')) {
    icon = (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2"/>
        <path d="M12 20v2"/>
        <path d="m4.93 4.93 1.41 1.41"/>
        <path d="m17.66 17.66 1.41 1.41"/>
        <path d="M2 12h2"/>
        <path d="M20 12h2"/>
        <path d="m6.34 17.66-1.41 1.41"/>
        <path d="m19.07 4.93-1.41 1.41"/>
      </svg>
    );
  } else if (weatherLower.includes('partly cloudy') || weatherLower.includes('scattered cloud')) {
    icon = (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
        <path d="M7 13.81a6 6 0 1 1 9.74 0"/>
        <path d="M5 15.25a3 3 0 1 0 0 6h9.4a3 3 0 1 0 2.97-3.64"/>
        <path d="M16 9.75a1.05 1.05 0 0 0 1-1.11 1.1 1.1 0 0 0-2.19-.2c0 .63.5 1.31 1.19 1.31z"/>
      </svg>
    );
  } else if (weatherLower.includes('cloudy') || weatherLower.includes('overcast')) {
    icon = (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
      </svg>
    );
  } else if (weatherLower.includes('rain') || weatherLower.includes('shower')) {
    icon = (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
        <path d="M16 14v6"/>
        <path d="M8 14v6"/>
        <path d="M12 16v6"/>
      </svg>
    );
  } else if (weatherLower.includes('snow')) {
    icon = (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-200">
        <path d="M8 15h.01"/>
        <path d="M12 15h.01"/>
        <path d="M16 15h.01"/>
        <path d="M8 19h.01"/>
        <path d="M12 19h.01"/>
        <path d="M16 19h.01"/>
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
      </svg>
    );
  } else if (weatherLower.includes('thunder')) {
    icon = (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
        <path d="M17 5.2V4h-3V2h-4v2H7v1.2M10 20h4"/>
        <path d="m5 20 1.5-9h11L19 20H5Z"/>
        <path d="m12 7-2 6h4l-2 6"/>
      </svg>
    );
  } else {
    // Default icon
    icon = (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
      </svg>
    );
  }

  return icon;
};

export default WeatherIcon;
