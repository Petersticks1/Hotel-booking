document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get('id');

    if (!roomId) return;

    // Elements to update
    const titleElement = document.querySelector('.rooms-page .section-title');
    const subtitleElement = document.querySelector('.rooms-page .section-subtitle');
    const priceElements = document.querySelectorAll('.rooms-page h6 a'); // Usually inside price box if exists, but in this template it's in similar rooms or text

    fetch('https://demo.altairattic.net/hotel-two/api/rooms')
        .then(response => response.json())
        .then(data => {
            const rooms = Array.isArray(data) ? data : (data.data && Array.isArray(data.data) ? data.data : []);
            const room = rooms.find(r => String(r.id) === String(roomId));

            if (room) {
                const displayName = room.room_type || room.name || `Room ${room.room_number}`;

                // Update Title
                if (titleElement) titleElement.textContent = displayName;

                // Update Book Now link
                const bookNowBtn = document.querySelector('.rooms-page .butn-dark a');
                if (bookNowBtn) {
                    bookNowBtn.href = `booking.html?room_id=${room.id}`;
                }

                // Update Browser Title
                document.title = `${displayName} - The Max Luxury Hotel`;

                // Update Price if we find where it's displayed (in this template it seems to be in a specific structure)
                // Let's look for a price element in room-details.html. 
                // Currently I don't see a dedicated price tag in the main content of room-details.html, 
                // only in "Similar Rooms". Let's assume there might be one or we can add it.
            }
        })
        .catch(error => console.error('Error loading room details:', error));
});
