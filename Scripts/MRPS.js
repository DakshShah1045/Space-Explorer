
        const apiKey = '4b8LwtPysGODotCsjfk5OrTca1JothNx2jbJsYGV'; // Replace with your NASA API key

        document.getElementById('fetchPhotos').addEventListener('click', async () => {
            const rover = document.getElementById('rover').value;
            const camera = document.getElementById('camera').value;
            const sol = document.getElementById('sol').value || 1000;

            const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&api_key=${apiKey}`;

            try {
                const response = await fetch(apiUrl , {
                    mode: 'cors'
                });
                const data = await response.json();
                console.log(data)
                const photosContainer = document.getElementById('photos');
                photosContainer.innerHTML = '';

                if (data.photos.length === 0) {
                    photosContainer.innerHTML = '<p>No photos found for the selected options. Try a different sol or camera.</p>';
                    return;
                }

                data.photos.forEach(photo => {
                    const photoCard = document.createElement('div');
                    photoCard.classList.add('photo-card');

                    photoCard.innerHTML = `
                        <img src="${photo.img_src}" alt="Mars Rover Photo">
                        <p><strong>Rover:</strong> ${photo.rover.name} | <strong>Camera:</strong> ${photo.camera.full_name} | <strong>Date:</strong> ${photo.earth_date}</p>
                    `;

                    photosContainer.appendChild(photoCard);
                });
            } catch (error) {
                console.error('Error fetching Mars Rover photos:', error);
                document.getElementById('photos').innerHTML = '<p>Error fetching data. Please try again later.</p>';
            }
        });