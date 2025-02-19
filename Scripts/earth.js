
        const apiKey = '4b8LwtPysGODotCsjfk5OrTca1JothNx2jbJsYGV'; // Replace with your NASA API key

        document.getElementById('fetchPhoto').addEventListener('click', async () => {
            const cityValue = document.getElementById('city').value;
            const [lat, lon] = cityValue.split(',');

            const apiUrl = `https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}&dim=0.1&api_key=${apiKey}`;

            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`API Error: ${response.status}`);
                }

                const photoBlob = await response.blob();
                const photoUrl = URL.createObjectURL(photoBlob);

                const photoContainer = document.getElementById('photo');
                photoContainer.innerHTML = `<img src="${photoUrl}" alt="Satellite view of the selected city">`;
            } catch (error) {
                console.error('Error fetching Earth photo:', error);
                document.getElementById('photo').innerHTML = '<p>Error fetching data. Please try again later.</p>';
            }
        });