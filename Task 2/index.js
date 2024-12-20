const getLocationBtn = document.getElementById("getLocationBtn");
const infoDiv = document.getElementById("info");

// Function to fetch location details
async function fetchLocationDetails(lat, lon) {
  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching location details:", error);
    return null;
  }
}

// Function to display location data
function displayInfo(message) {
  infoDiv.innerHTML = `<p>${message}</p>`;
}

// Event listener for button click
getLocationBtn.addEventListener("click", () => {
  // Check if Geolocation is supported
  if (!navigator.geolocation) {
    displayInfo("Geolocation is not supported by your browser.");
    return;
  }

  // Fetch user's location
  displayInfo("Fetching your location...");
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude, altitude } = position.coords;
      const locationData = await fetchLocationDetails(latitude, longitude);

      if (locationData) {
        const city = locationData.city || "Unknown City";
        const country = locationData.countryName || "Unknown Country";
        const localTime = new Date().toLocaleTimeString();
        const altitudeText = altitude
          ? `${altitude.toFixed(2)} meters`
          : "Altitude data not available";

        displayInfo(`
          <strong>City:</strong> ${city}<br>
          <strong>Country:</strong> ${country}<br>
          <strong>Time:</strong> ${localTime}<br>
          <strong>Altitude:</strong> ${altitudeText}
        `);
      } else {
        displayInfo("Unable to fetch location details.");
      }
    },
    (error) => {
      displayInfo(`Error fetching location: ${error.message}`);
    }
  );
});
