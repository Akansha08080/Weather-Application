

# Weather App [Live](https://akansha08080.github.io/Weather-Application/)

A simple weather application that provides current weather information based on the user's location or a city they search for. The app uses the OpenWeatherMap API to fetch real-time weather data such as temperature, humidity, wind speed, and cloudiness.

## Features

- **Location-based Weather:** Automatically fetches weather data based on the user's geographical location using the browser's geolocation API.
- **Search for Cities:** Allows users to search for weather information by entering a city's name.
- **Detailed Weather Information:** Displays temperature, weather description, wind speed, humidity, and cloud cover.
- **Interactive Tabs:** Switch between 'Your Weather' (location-based) and 'Search Weather' (city-based).
- **Responsive Design:** User-friendly layout that adapts to different screen sizes.

## Files and Structure

- **index.html**: The main HTML file that contains the structure of the app, including a form for searching weather, a container for displaying the weather information, and the layout for interactive features.
- **styles.css**: The CSS file that defines the layout and style of the app, providing a modern and clean interface with responsive design.
- **index.js**: The JavaScript file that handles the app's logic, including switching tabs, fetching weather data from the OpenWeatherMap API, and displaying the results dynamically.

## How It Works

1. **Location Access**: When users open the app, they can allow access to their location to get weather data for their current location.
2. **Search for a City**: Users can switch to the "Search Weather" tab and search for weather information by typing a city name.
3. **Weather Information Display**: The app displays:
   - City name and country flag
   - Weather description (e.g., sunny, cloudy)
   - Temperature in Celsius
   - Wind speed, humidity, and cloud cover
   
4. **API Integration**: The app uses the OpenWeatherMap API to fetch the weather information based on either the user's location (via geolocation) or the searched city.

## Installation and Usage

1. Clone the repository or download the files.
2. Open the project directory and run the `index.html` file in your browser.
3. To fetch weather data, you need an API key from OpenWeatherMap:
   - Sign up at [OpenWeatherMap](https://openweathermap.org/)
   - Replace the `API_KEY` variable in `index.js` with your own API key.

```javascript
const API_KEY = "YOUR_API_KEY_HERE";
```

4. Once the key is set, you can either grant location access for automatic weather updates or search for weather by city.

## Technologies Used

- **HTML5** for structuring the content.
- **CSS3** for styling and responsive design.
- **JavaScript (ES6)** for implementing the logic and API integration.
- **OpenWeatherMap API** for fetching real-time weather data.
- **Geolocation API** for obtaining the user's location.

## License

This project is licensed under the MIT License.


