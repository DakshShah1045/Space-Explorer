document.getElementById("searchBtn").addEventListener("click", searchMedia);

function searchMedia() {
    const query = document.getElementById("searchInput").value.trim();
    if (!query) return;

    const url = `https://images-api.nasa.gov/search?q=${query}&media_type=image,video`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayMedia(data.collection.items);
        })
        .catch(error => console.error("Error fetching data: ", error));
}

function displayMedia(mediaItems) {
    const mediaList = document.getElementById("mediaList");
    mediaList.innerHTML = ""; // Clear previous data

    if (mediaItems.length === 0) {
        mediaList.innerHTML = "<p>No results found. Try another search!</p>";
        return;
    }

    mediaItems.forEach(item => {
        const mediaItem = document.createElement("div");
        mediaItem.classList.add("media-item");

        // Extract media data (image or video)
        const mediaData = item.links ? item.links[0] : {};
        const imageUrl = item.data[0].thumbnail || mediaData.href || "";  // Handle image URL
        
        // Display video or image based on the media type
        let mediaContent;
        if (imageUrl) {
            // If it's an image
            mediaContent = `<img src="${imageUrl}" alt="${item.data[0].title}" style="width: 100%; border-radius: 5px;">`;
        } else if (item.data[0].media_type === "video") {
            // If it's a video, embed a YouTube link
            mediaContent = `<iframe width="100%" height="200" src="${item.data[0].url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        }

        mediaItem.innerHTML = `
            <h2>${item.data[0].title}</h2>
            <p>${item.data[0].description}</p>
            ${mediaContent}
        `;

        mediaList.appendChild(mediaItem);
    });
}
