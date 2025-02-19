 async function fetchSpaceWeatherBasic() {
            try {
                const response = await fetch('https://api.nasa.gov/DONKI/notifications?type=all&api_key=4b8LwtPysGODotCsjfk5OrTca1JothNx2jbJsYGV');
                const data = await response.json();

                // Categorize basic data
                const geomagneticStorms = data.filter(event => event.messageType === 'Geomagnetic Storm');
                const solarFlares = data.filter(event => event.messageType === 'Solar Flare');
                const otherEvents = data.filter(event => event.messageType !== 'Geomagnetic Storm' && event.messageType !== 'Solar Flare');

                // Update the DOM with counts
                document.getElementById('geomagnetic-storm').textContent = geomagneticStorms.length > 0 
                    ? `${geomagneticStorms.length} events reported`
                    : 'No events';

                document.getElementById('solar-flare').textContent = solarFlares.length > 0 
                    ? `${solarFlares.length} events reported`
                    : 'No events';

                document.getElementById('other-events').textContent = otherEvents.length > 0 
                    ? `${otherEvents.length} other space weather events`
                    : 'No other events';
            } catch (error) {
                console.error('Error fetching space weather data:', error);
                document.getElementById('geomagnetic-storm').textContent = 'Error fetching data';
                document.getElementById('solar-flare').textContent = 'Error fetching data';
                document.getElementById('other-events').textContent = 'Error fetching data';
            }
        }

fetchSpaceWeatherBasic()