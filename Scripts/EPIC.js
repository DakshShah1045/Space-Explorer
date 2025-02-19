
        const apiUrl = 'https://epic.gsfc.nasa.gov/api/';

        document.getElementById('fetchImages').addEventListener('click', async () => {
            const date = document.getElementById('datePicker').value;
            const imageType = document.getElementById('imageType').value;

            if (!date) {
                alert('Please select a date.');
                return;
            }

            try {
                const response = await fetch(`${apiUrl}${imageType}/date/${date}`);
                const data = await response.json();

                if (!data || data.length === 0) {
                    alert('No images found for the selected date.');
                    return;
                }

                const gallery = document.getElementById('gallery');
                gallery.innerHTML = '';

                data.forEach(item => {
                    const imageUrl = `https://epic.gsfc.nasa.gov/archive/${imageType}/${date.replace(/-/g, '/')}/png/${item.image}.png`;

                    const imageCard = document.createElement('div');
                    imageCard.classList.add('image-card');

                    imageCard.innerHTML = `
                        <img src="${imageUrl}" alt="Earth Image" />
                        <p>Timestamp: ${item.date}</p>
                    `;

                    gallery.appendChild(imageCard);
                });
            } catch (error) {
                console.error('Error fetching images:', error);
                alert('Error fetching images. Please try again later.');
            }
        });