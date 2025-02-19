
    const map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const issIcon = L.icon({
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/International_Space_Station.svg',
        iconSize: [50, 50],
        iconAnchor: [25, 25]
    });

    const marker = L.marker([0, 0], { icon: issIcon }).addTo(map);

    async function fetchISSLocation() {
        try {
            const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
            const data = await response.json();
            const { latitude, longitude } = data;

            document.getElementById('coordinates').textContent = `Latitude: ${latitude.toFixed(2)}, Longitude: ${longitude.toFixed(2)}`;

            const lat = parseFloat(latitude);
            const lon = parseFloat(longitude);
            marker.setLatLng([lat, lon]);
            map.setView([lat, lon], 4);
        } catch (error) {
            console.error('Error fetching ISS location:', error);
            document.getElementById('coordinates').textContent = 'Error fetching ISS coordinates.';
        }
    }

    fetchISSLocation();
    setInterval(fetchISSLocation, 5000);

