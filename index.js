// Get references to various HTML elements using their data attributes or classes
const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

// Initially set up variables we need
let oldTab = userTab; // Keep track of the previous tab
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c"; // Your OpenWeatherMap API key
oldTab.classList.add("current-tab"); // Mark the "user weather" tab as active
getfromSessionStorage(); // Check if location info is saved in the session storage

// Function to switch between the user weather tab and search tab
function switchTab(newTab) {
    if (newTab != oldTab) { // Only switch if the new tab is different from the old one
        oldTab.classList.remove("current-tab"); // Remove active status from old tab
        oldTab = newTab; // Set the new tab as the active one
        oldTab.classList.add("current-tab"); // Highlight the new tab

        // If we are switching to the search tab (which is not visible initially)
        if (!searchForm.classList.contains("active")) {
            // Hide user weather info and location request
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            // Show the search form
            searchForm.classList.add("active");
        } else {
            // If we're switching back to the user weather tab
            searchForm.classList.remove("active"); // Hide the search form
            userInfoContainer.classList.remove("active");
            // Check if coordinates are saved in session storage to display the weather
            getfromSessionStorage();
        }
    }
}

// When the user clicks on the "User Weather" tab, switch to it
userTab.addEventListener("click", () => {
    switchTab(userTab);
});

// When the user clicks on the "Search Weather" tab, switch to it
searchTab.addEventListener("click", () => {
    switchTab(searchTab);
});

// Check if the user's location is already saved in session storage
function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if (!localCoordinates) {
        // If no coordinates are saved, show the option to grant location access
        grantAccessContainer.classList.add("active");
    } else {
        // If coordinates are found, fetch the weather for the saved location
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

// Fetch weather data based on user's coordinates (latitude and longitude)
async function fetchUserWeatherInfo(coordinates) {
    const { lat, lon } = coordinates;
    grantAccessContainer.classList.remove("active"); // Hide the location request screen
    loadingScreen.classList.add("active"); // Show the loading screen

    // Make a request to the weather API using the coordinates
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json(); // Convert the response to JSON

        loadingScreen.classList.remove("active"); // Hide the loading screen
        userInfoContainer.classList.add("active"); // Show the weather info
        renderWeatherInfo(data); // Display the weather data on the UI
    } catch (err) {
        loadingScreen.classList.remove("active");
    }
}

// Function to display the weather data on the UI
function renderWeatherInfo(weatherInfo) {
    // Get the elements that will display the weather info
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    // Display the weather information in the respective UI elements
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;
}

// Function to get the user's current location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition); // Get location
    } else {
        // Handle case where geolocation is not supported (homework task)
    }
}

// Once the location is found, save the coordinates and fetch weather data
function showPosition(position) {
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    };
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates)); // Save coordinates
    fetchUserWeatherInfo(userCoordinates); // Fetch the weather using the coordinates
}

// Event listener for the button that requests location access
const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);

// Event listener for the search form submission
const searchInput = document.querySelector("[data-searchInput]");
searchForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    let cityName = searchInput.value; // Get the city name from the input field

    if (cityName === "") return; // If input is empty, do nothing
    else fetchSearchWeatherInfo(cityName); // Fetch weather for the entered city
});

// Fetch weather data for a searched city
async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active"); // Show the loading screen
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        loadingScreen.classList.remove("active"); // Hide the loading screen
        userInfoContainer.classList.add("active"); // Show the weather info
        renderWeatherInfo(data); // Display the weather data on the UI
    } catch (err) {
        
    }
}
