const daysGrid = document.getElementById('daysGrid');
const monthYearDisplay = document.getElementById('monthYearDisplay');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Modal Elements
const courseModal = document.getElementById('courseModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalCategory = document.getElementById('modalCategory');
const modalTitle = document.getElementById('modalTitle');
const modalDateVal = document.getElementById('modalDateVal');
const modalAssignmentVal = document.getElementById('modalAssignmentVal');
const modalDueVal = document.getElementById('modalDueVal');
const modalSlideLink = document.getElementById('modalSlideLink');

let currentDate = new Date();

// Structured Course Content Map
const courseSchedule = {
    "2026-07-29": {
        type: "lecture",
        title: "Introduction to Machine Learning",
        slides: "https://example.com/slides1",
        assignment: "Lab 0: Sandbox Setup",
        due: "Aug 2 at 11:59 PM"
    },
    "2026-07-31": {
        type: "lab",
        title: "Lab 1: Data Preprocessing",
        slides: "https://example.com/lab1-slides",
        assignment: "HW 1: Feature Engineering",
        due: "Aug 8 at 11:59 PM"
    },
    "2026-08-05": {
        type: "exam",
        title: "Midterm Exam 1",
        slides: null,
        assignment: "Prepare 1-page cheat sheet",
        due: "In Class"
    }
};

function renderCalendar() {
    daysGrid.innerHTML = '';
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    monthYearDisplay.innerText = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDayIndex; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('empty-day');
        daysGrid.appendChild(emptyCell);
    }

    for (let day = 1; day <= lastDay; day++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('calendar-day');
        
        const dayNumber = document.createElement('span');
        dayNumber.classList.add('day-number');
        dayNumber.innerText = day;
        dayCell.appendChild(dayNumber);

        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        if (courseSchedule[dateKey]) {
            const eventData = courseSchedule[dateKey];
            
            const badge = document.createElement('div');
            badge.classList.add('event-badge', `badge-${eventData.type}`);
            badge.innerText = `${eventData.type.toUpperCase()}: ${eventData.title}`;
            dayCell.appendChild(badge);

            // Open Modal on click with correct details filled
            dayCell.addEventListener('click', () => {
                openModal(dateKey, eventData);
            });
        }

        daysGrid.appendChild(dayCell);
    }
}

// Open modal helper
function openModal(dateString, data) {
    const formattedDate = new Date(dateString).toLocaleDateString('default', { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });

    // Populate values
    modalCategory.innerText = data.type;
    modalCategory.className = `modal-category-badge badge-${data.type}`;
    modalTitle.innerText = data.title;
    modalDateVal.innerText = formattedDate;
    modalAssignmentVal.innerText = data.assignment || "None";
    modalDueVal.innerText = data.due || "N/A";

    // Manage file slides download link
    if (data.slides) {
        modalSlideLink.href = data.slides;
        modalSlideLink.style.display = "inline-flex";
    } else {
        modalSlideLink.style.display = "none";
    }

    courseModal.classList.remove('hidden');
}

// Close modal triggers
closeModalBtn.addEventListener('click', () => {
    courseModal.classList.add('hidden');
});

courseModal.addEventListener('click', (e) => {
    if (e.target === courseModal) {
        courseModal.classList.add('hidden');
    }
});

prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

renderCalendar();
