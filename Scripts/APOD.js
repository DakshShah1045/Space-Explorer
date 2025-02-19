
        const apiKey = '4b8LwtPysGODotCsjfk5OrTca1JothNx2jbJsYGV'; // Replace with your NASA API key
        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

        async function fetchAPOD() {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                const mediaContainer = document.getElementById('apod-media');

                if (data.media_type === 'video') {
                    mediaContainer.innerHTML = `<iframe src="${data.url}" allowfullscreen></iframe>`;
                } else if (data.media_type === 'image') {
                    mediaContainer.innerHTML = `<img src="${data.url}" alt="${data.title}" style="width: 100%; max-height: 400px; object-fit: cover;">`;
                }

                document.getElementById('apod-title').textContent = data.title;
                document.getElementById('apod-text').textContent = data.explanation;
            } catch (error) {
                document.getElementById('apod-title').textContent = 'Error fetching data';
                document.getElementById('apod-text').textContent = 'Unable to retrieve the Astronomy Picture of the Day. Please try again later.';
            }
        }

        fetchAPOD();