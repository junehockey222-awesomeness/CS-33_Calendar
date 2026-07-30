const daysGrid = document.getElementById('daysGrid');
const monthYearDisplay = document.getElementById('monthYearDisplay');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentDate = new Date();

function renderCalendar() {
    daysGrid.innerHTML = '';
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    monthYearDisplay.innerText = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDayIndex; i++) {
        const emptyCell = document.createElement('div');
        daysGrid.appendChild(emptyCell);
    }

    for (let day = 1; day <= lastDay; day++) {
        const dayCell = document.createElement('div');
        dayCell.innerText = day;
        daysGrid.appendChild(dayCell);
    }
}

prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

renderCalendar();
