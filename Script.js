function getWeather() {
    const apiKey = '849b3d4c97c63852e9091bbde3cc6a67'; 
    const city = $('#cityInput').val().trim();

    if (!city) {
        alert('Please enter a city name');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;


    $.get(currentWeatherUrl, function(data) {
        const description = data.weather[0].description;
        const temperature = data.main.temp;
        const location = data.name;

        $('#weatherDescription').text(description);
        $('#temperature').text(`Temperature: ${temperature}°C`);
        $('#location').text(`Location: ${location}`);
    }).fail(function() {
        $('#currentWeather').html('<p>Unable to fetch weather data</p>');
    });


    $.get(forecastUrl, function(data) {
        let forecastHtml = '';
        for (let i = 0; i < data.list.length; i += 8) {
            const item = data.list[i];
            const date = new Date(item.dt * 1000);
            const temp = item.main.temp;
            const description = item.weather[0].description;
            
            forecastHtml += `
                <div class="forecast-item">
                    <p>${date.toLocaleDateString()}</p>
                    <p>${temp}°C</p>
                    <p>${description}</p>
                </div>
            `;
        }
        $('#forecast').html(forecastHtml);
    }).fail(function() {
        $('#forecast').html('<p>Unable to fetch forecast data</p>');
    });
}
