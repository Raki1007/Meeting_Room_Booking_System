document.addEventListener('DOMContentLoaded', function () {
    const rooms = [
        { id: 1, name: 'Room A' },
        { id: 2, name: 'Room B' },
        { id: 3, name: 'Room C' },
        { id: 4, name: 'Room D' },
        { id: 5, name: 'Room E' },
        { id: 6, name: 'Room F' }
    ];

    const timeSlots = [
        '9:00-9:30', '9:30-10:00', '10:00-10:30', '10:30-11:00', '11:00-11:30', '11:30-12:00'
    ];

    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];

    const roomSelect = document.getElementById('room-select');
    rooms.forEach(room => {
        const option = document.createElement('option');
        option.value = room.id;
        option.text = room.name;
        roomSelect.appendChild(option);
    });

    const timeSlotSelect = document.getElementById('time-slot-select');
    timeSlots.forEach(timeSlot => {
        const option = document.createElement('option');
        option.value = timeSlot;
        option.text = timeSlot;
        timeSlotSelect.appendChild(option);
    });

    const roomList = document.getElementById('room-list');
    rooms.forEach(room => {
        const li = document.createElement('li');
        li.textContent = `${room.name}: ${isRoomAvailable(room.id) ? 'Available' : 'Occupied'}`;
        roomList.appendChild(li);
    });

    const bookButton = document.getElementById('book-button');
    bookButton.addEventListener('click', function () {
        const roomId = parseInt(roomSelect.value);
        const timeSlot = timeSlotSelect.value;
        if (!isRoomAvailable(roomId)) {
            alert('This room is already booked for the selected time slot.');
            return;
        }
        const booking = { roomId, timeSlot };
        bookings.push(booking);
        localStorage.setItem('bookings', JSON.stringify(bookings));
        updateBookingList();
        updateRoomList();
    });

    const bookingList = document.getElementById('booking-list');
    function updateBookingList() {
        bookingList.innerHTML = '';
        bookings.forEach(booking => {
            const roomName = rooms.find(room => room.id === booking.roomId).name;
            const li = document.createElement('li');
            li.textContent = `${roomName}: ${booking.timeSlot}`;
            bookingList.appendChild(li);
        });
    }
    updateBookingList();

    function isRoomAvailable(roomId) {
        return !bookings.some(booking => booking.roomId === roomId);
    }

    function updateRoomList() {
        roomList.innerHTML = '';
        rooms.forEach(room => {
            const li = document.createElement('li');
            li.textContent = `${room.name}: ${isRoomAvailable(room.id) ? 'Available' : 'Occupied'}`;
            roomList.appendChild(li);
        });
    }
});