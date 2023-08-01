window.addEventListener('load', () => {
    const locationElement = document.getElementById('location');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');
    const weatherIconElement = document.getElementById('weather-icon-image');
    const locationDropdown = document.getElementById('location-dropdown');
    const getWeatherButton = document.getElementById('get-weather-button');
  
    // Populate the dropdown with city options
    const populateLocationDropdown = () => {
      const cities = [
        { name: 'Mumbai', latitude: '19.0760', longitude: '72.8777' },
        { name: 'Delhi', latitude: '28.7041', longitude: '77.1025' },
        { name: 'Kolkata', latitude: '22.5726', longitude: '88.3639' },
        { name: 'Chennai', latitude: '13.0827', longitude: '80.2707' },
        { name: 'Bengaluru', latitude: '12.9716', longitude: '77.5946' },
        { name: 'Hyderabad', latitude: '17.3850', longitude: '78.4867' },
        { name: 'Ahmedabad', latitude: '23.0225', longitude: '72.5714' },
        { name: 'Pune', latitude: '18.5204', longitude: '73.8567' },
        { name: 'Jaipur', latitude: '26.9124', longitude: '75.7873' },
        { name: 'Lucknow', latitude: '26.8467', longitude: '80.9462' },
        { name: 'Chandigarh', latitude: '30.7333', longitude: '76.7794' },
        { name: 'Shimla', latitude: '31.1048', longitude: '77.1734' },
        // Add more cities as needed
      ];
  
      cities.forEach((city) => {
        const option = document.createElement('option');
        option.value = `${city.latitude},${city.longitude}`;
        option.textContent = city.name;
        locationDropdown.appendChild(option);
      });
    };
  
    // Function to update weather information
    const updateWeatherInfo = async (latitude, longitude) => {
      try {
        const weatherData = await fetchWeatherData(latitude, longitude);
  
        locationElement.textContent = weatherData.location;
        temperatureElement.textContent = weatherData.temperature + '°C';
        descriptionElement.textContent = weatherData.description;
  
        // Update weather icon
        weatherIconElement.setAttribute('src', weatherData.icon);
        weatherIconElement.setAttribute('alt', weatherData.description);
      } catch (error) {
        console.error(error);
        locationElement.textContent = 'Failed to fetch weather data';
      }
    };
  
    // Event listener for get weather button
    getWeatherButton.addEventListener('click', () => {
      const selectedLocation = locationDropdown.value;
  
      if (selectedLocation.trim() === '') {
        alert('Please select a location');
        return;
      }
  
      const [latitude, longitude] = selectedLocation.split(',');
  
      updateWeatherInfo(latitude, longitude);
    });
  
    // Function to fetch weather data
    const fetchWeatherData = async (latitude, longitude) => {
      const apiKey = '76c571a9337785723c83e10c29e164bb'; // Replace with your actual API key
  
      const apiUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${latitude},${longitude}`;
  
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
  
        if (data.error) {
          throw new Error(data.error.info);
        }
  
        const weatherData = {
          location: data.location.name,
          temperature: data.current.temperature,
          description: data.current.weather_descriptions[0],
          icon: data.current.weather_icons[0]
        };
  
        return weatherData;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch weather data');
      }
    };
  
    // Populate the location dropdown
    populateLocationDropdown();
  });
  