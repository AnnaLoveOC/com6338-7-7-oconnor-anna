// Your code here

// API Key
var API_KEY = "34d457bc3da2e7bd0e2519d9c78ebc4c"

// Select DOM Elements
var weatherURL = "https://api.openweathermap.org/data/2.5/weather"
var weatherSection = document.getElementById("weather")
var form = document.querySelector("form")


// FORM SUBMIT FUNCTION
form.onsubmit = function(event) {
    event.preventDefault()

    // Get what the user typed into the search box
    var location = this.search.value.trim()

    // Stop if the search box is empty
    if (!location) return

    // Build the extra information needed for the API URL
    var queryString = "?units=imperial&appid=" + API_KEY + "&q=" + location

    // Clear the search box after submitting
    form.search.value = ""

    // SEARCH API
    fetch(weatherURL + queryString)
        .then(function(res) {

            console.log(res.status)
            // If the location was not found, show an error
            if (res.status !== 200) {
                throw new Error("Location Not Found")
            }

            // Turn the response into a JavaScript object
            return res.json()
        })
        .then(function(weather) {

            // Clear the previous weather information
            weatherSection.innerHTML = ""

            // LOCATION
            var locationH2 = document.createElement("h2")
            locationH2.textContent = weather.name + ", " + weather.sys.country
            weatherSection.appendChild(locationH2)

            // MAP LINK
            var mapLink = document.createElement("a")
            mapLink.textContent = "Click to view map"
            mapLink.href = "https://www.google.com/maps/search/?api=1&query=" +
                weather.coord.lat + "," + weather.coord.lon
            weatherSection.appendChild(mapLink)

            // WEATHER ICON
            var weatherIcon = document.createElement("img")
            weatherIcon.src = "https://openweathermap.org/img/wn/" +
                weather.weather[0].icon + "@2x.png"
            weatherSection.appendChild(weatherIcon)

            // DESCRIPTION
            var descriptionP = document.createElement("p")
            descriptionP.textContent = weather.weather[0].description
            weatherSection.appendChild(descriptionP)

            // CURRENT TEMPERATURE
            var currentTempP = document.createElement("p")
            currentTempP.textContent = "Current: " + weather.main.temp + "° F"
            weatherSection.appendChild(currentTempP)

            // FEELS LIKE TEMPERATURE
            var feelsLikeP = document.createElement("p")
            feelsLikeP.textContent = "Feels like: " + weather.main.feels_like + "° F"
            weatherSection.appendChild(feelsLikeP)

            // DATE + TIME
            // API gives us seconds, but Date needs milliseconds
            var date = new Date(weather.dt * 1000)

            var timeString = date.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit"
            })

            var lastUpdatedP = document.createElement("p")
            lastUpdatedP.textContent = "Last updated: " + timeString
            weatherSection.appendChild(lastUpdatedP)

        })
        .catch(function(err) {

            // Display the error message if fetch fails
            weatherSection.innerHTML = err.message
        })
}