document.addEventListener('DOMContentLoaded', function () {
    const roomsContainer = document.getElementById('rooms-container');

    if (roomsContainer) {
        fetch('https://demo.altairattic.net/hotel-two/api/rooms')
            .then(response => response.json())
            .then(data => {
                // Handle different response structures gracefully
                const rooms = Array.isArray(data) ? data : (data.data && Array.isArray(data.data) ? data.data : []);

                if (rooms.length > 0) {
                    roomsContainer.innerHTML = ''; // Clear static content

                    rooms.forEach((room, index) => {
                        // Amenities - simplified for now
                        const amenitiesHtml = `
                            <li><i class="flaticon-bed"></i></li>
                            <li><i class="flaticon-bath"></i></li>
                            <li><i class="flaticon-breakfast"></i></li>
                            <li><i class="flaticon-towel"></i></li>
                        `;

                        // URLs
                        const bookingUrl = `booking.html?room_id=${room.id}`;
                        const detailsUrl = `room-details.html?id=${room.id}`;

                        // Price formatting: API returns "price_per_night"
                        const displayPrice = room.price_per_night
                            ? `₦${Number(room.price_per_night).toLocaleString()} / Night`
                            : 'Check Price';

                        // Display Name: API returns "room_type"
                        // Fallback to name or room number if type is missing
                        const displayName = room.room_type || room.name || `Room ${room.room_number}`;

                        // Image fallback: Use room-specific image if available, 
                        // otherwise cycle through local images 1.jpg to 10.jpg
                        const fallbackImageNumber = (index % 10) + 1;
                        const image = room.image || room.thumbnail || `img/rooms/${fallbackImageNumber}.jpg`;

                        const html = `
                            <div class="col-md-4">
                                <div class="item">
                                    <div class="position-re o-hidden"> 
                                        <img src="${image}" alt="${displayName}" style="height: 300px; object-fit: cover;"> 
                                    </div> 
                                    <span class="category"><a href="${bookingUrl}">Book</a></span>
                                    <div class="con">
                                        <h6><a href="${detailsUrl}">${displayPrice}</a></h6>
                                        <h5><a href="${detailsUrl}">${displayName}</a> </h5>
                                        <div class="line"></div>
                                        <div class="row facilities">
                                            <div class="col col-md-7">
                                                <ul>${amenitiesHtml}</ul>
                                            </div>
                                            <div class="col col-md-5 text-end">
                                                <div class="permalink"><a href="${detailsUrl}">Details <i class="ti-arrow-right"></i></a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                        roomsContainer.insertAdjacentHTML('beforeend', html);
                    });
                }
            })
            .catch(error => console.error('Error loading rooms:', error));
    }
});
