document.getElementById("fetchDataBtn").addEventListener("click", fetchAsteroids);

function fetchAsteroids() {
    const url = "https://api.nasa.gov/neo/rest/v1/feed?start_date=2025-02-01&end_date=2025-02-01&api_key=4b8LwtPysGODotCsjfk5OrTca1JothNx2jbJsYGV";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayAsteroids(data.near_earth_objects["2025-02-01"]);
        })
        .catch(error => console.error("Error fetching data: ", error));
}

function displayAsteroids(asteroids) {
    const asteroidList = document.getElementById("asteroidList");
    asteroidList.innerHTML = ""; // Clear previous data

    asteroids.forEach(asteroid => {
        const asteroidItem = document.createElement("div");
        asteroidItem.classList.add("asteroid-item");

        asteroidItem.innerHTML = `
            <h2>${asteroid.name}</h2>
            <p>Diameter: ${asteroid.estimated_diameter.kilometers.estimated_diameter_max} km</p>
            <p>Close Approach Date: ${asteroid.close_approach_data[0].close_approach_date}</p>
            <p>Miss Distance: ${asteroid.close_approach_data[0].miss_distance.kilometers} km</p>
        `;

        asteroidList.appendChild(asteroidItem);
    });
}
