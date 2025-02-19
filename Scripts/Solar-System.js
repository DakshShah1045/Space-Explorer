
        const apiUrl = 'https://api.le-systeme-solaire.net/rest/bodies/';

        document.getElementById('fetchData').addEventListener('click', async () => {
            const celestialBody = document.getElementById('celestialBody').value;

            if (!celestialBody) {
                document.getElementById('info').innerHTML = '<p>Please select a celestial body.</p>';
                return;
            }

            try {
                const response = await fetch(`${apiUrl}${celestialBody}`);
                const data = await response.json();

                const moonsList = data.moons ? data.moons.map(moon => `<li>${moon.moon}</li>`).join('') : '<li>No moons</li>';

                document.getElementById('info').innerHTML = `
                    <h2>${data.englishName}</h2>
                    <p><strong>Mass:</strong> ${data.mass ? data.mass.massValue + ' x 10^' + data.mass.massExponent + ' kg' : 'N/A'}</p>
                    <p><strong>Radius:</strong> ${data.meanRadius ? data.meanRadius + ' km' : 'N/A'}</p>
                    <p><strong>Gravity:</strong> ${data.gravity ? data.gravity + ' m/s²' : 'N/A'}</p>
                    <p><strong>Orbital Period:</strong> ${data.sideralOrbit ? data.sideralOrbit + ' days' : 'N/A'}</p>
                    <p><strong>Discovery:</strong> ${data.discoveryDate || 'N/A'}</p>
                    <h3>Moons:</h3>
                    <ul>${moonsList}</ul>
                `;
            } catch (error) {
                console.error('Error fetching data:', error);
                document.getElementById('info').innerHTML = '<p>Error fetching data. Please try again later.</p>';
            }
        });
    