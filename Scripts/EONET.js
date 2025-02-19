document.getElementById("fetchEventsBtn").addEventListener("click", fetchEvents);

function fetchEvents() {
    const url = "https://eonet.sci.gsfc.nasa.gov/api/v3/events";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayEvents(data.events);
        })
        .catch(error => console.error("Error fetching events: ", error));
}

function displayEvents(events) {
    const eventList = document.getElementById("eventList");
    eventList.innerHTML = ""; // Clear previous data

    if (events.length === 0) {
        eventList.innerHTML = "<p>No events found. Try again later!</p>";
        return;
    }

    events.forEach(event => {
        const eventItem = document.createElement("div");
        eventItem.classList.add("event-item");

        const eventDate = new Date(event.geometry[0].date);
        const formattedDate = eventDate.toLocaleDateString();

        eventItem.innerHTML = `
            <h2>${event.title}</h2>
            <p><strong>Type:</strong> ${event.categories.map(cat => cat.title).join(", ")}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Description:</strong> ${event.description || "No description available."}</p>
        `;

        eventList.appendChild(eventItem);
    });
}
