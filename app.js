let currentDate = new Date();
let events = JSON.parse(localStorage.getItem('calendarEvents')) || [];

// DOM Elements
const monthYearDisplay = document.getElementById('month-year-display');
const calendarGrid = document.getElementById('calendar-grid');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const filterSelect = document.getElementById('category-filter');

const eventModal = document.getElementById('event-modal');
const openModalBtn = document.getElementById('open-modal-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const eventForm = document.getElementById('event-form');

// Initialize
renderCalendar();

// Event Listeners
prevBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

filterSelect.addEventListener('change', renderCalendar);

openModalBtn.addEventListener('click', () => eventModal.classList.remove('hidden'));
closeModalBtn.addEventListener('click', () => eventModal.classList.add('hidden'));

eventForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('event-title').value;
  const date = document.getElementById('event-date').value;
  const category = document.getElementById('event-category').value;

  const newEvent = { id: Date.now(), title, date, category };
  events.push(newEvent);
  
  // Save to LocalStorage
  localStorage.setItem('calendarEvents', JSON.stringify(events));

  eventForm.reset();
  eventModal.classList.add('hidden');
  renderCalendar();
});

// Render Main Calendar Grid
function renderCalendar() {
  calendarGrid.innerHTML = '';
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Header display string
  monthYearDisplay.textContent = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
  const activeFilter = filterSelect.value;

  // Render Padding Days (Prev Month)
  for (let i = 0; i < firstDayOfMonth; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.classList.add('day-cell', 'inactive');
    calendarGrid.appendChild(emptyCell);
  }

  // Render Current Month Days
  for (let day = 1; day <= lastDateOfMonth; day++) {
    const dayCell = document.createElement('div');
    dayCell.classList.add('day-cell');

    const dayNumber = document.createElement('div');
    dayNumber.classList.add('day-number');
    dayNumber.textContent = day;
    dayCell.appendChild(dayNumber);

    // Date String format: YYYY-MM-DD
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    // Filter events matching this date
    const dayEvents = events.filter(evt => {
      const matchDate = evt.date === dateString;
      const matchCategory = activeFilter === 'all' || evt.category === activeFilter;
      return matchDate && matchCategory;
    });

    dayEvents.forEach(evt => {
      const chip = document.createElement('div');
      chip.classList.add('event-chip', evt.category);
      chip.textContent = evt.title;
      
      // Delete event on click
      chip.addEventListener('click', (e) => {
        e.stopPropagation();
        events = events.filter(e => e.id !== evt.id);
        localStorage.setItem('calendarEvents', JSON.stringify(events));
        renderCalendar();
      });

      dayCell.appendChild(chip);
    });

    calendarGrid.appendChild(dayCell);
  }
}
