// Simple booking storage using localStorage
(function () {
  const form = document.getElementById('booking-form');
  const confirmation = document.getElementById('confirmation');
  const bookBtns = document.querySelectorAll('.book-btn');

  // Pre-fill room when clicking Book on a room card
  bookBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const room = e.currentTarget.closest('.room').dataset.room;
      document.getElementById('room').value = room;
      location.hash = '#book';
      document.getElementById('name').focus();
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const room = document.getElementById('room').value;
    const start_date = document.getElementById('start_date').value;
    const end_date = document.getElementById('end_date').value;

    if (!name || !email || !start_date || !end_date) {
      confirmation.textContent = 'Please fill all fields.';
      confirmation.style.color = 'red';
      return;
    }

    if (new Date(start_date) > new Date(end_date)) {
      confirmation.textContent = 'Check-out must be after check-in.';
      confirmation.style.color = 'red';
      return;
    }

    const booking = {
      id: Date.now(),
      name, email, room, start_date, end_date,
      created_at: new Date().toISOString()
    };

    const key = 'riverdam_bookings';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.push(booking);
    localStorage.setItem(key, JSON.stringify(existing));

    confirmation.textContent = `Thanks ${name}! Your booking for ${room} from ${start_date} to ${end_date} is saved.`;
    confirmation.style.color = 'green';
    form.reset();
  });
})();