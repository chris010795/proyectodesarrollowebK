let monthTitle = document.getElementById("month-title");
let daysContainer = document.getElementById("calendar-days");

let searchDay = document.getElementById("search-day");
let searchMonth = document.getElementById("search-month");
let searchYear = document.getElementById("search-year");

let eventInput = document.getElementById("event-input");
let eventTime = document.getElementById("event-time");
let eventPlace = document.getElementById("event-place");
let eventDesc = document.getElementById("event-desc");

let eventMessage = document.getElementById("event-message");
let selectedDateLabel = document.getElementById("selected-date");

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

let selectedDay = null;

let events = {};

const months = [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio",
    "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
];

function renderCalendar() {

    monthTitle.textContent = months[currentMonth] + " " + currentYear;

    daysContainer.innerHTML = "";

    let firstDay = new Date(currentYear, currentMonth, 1).getDay();
    let lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        let empty = document.createElement("div");
        empty.classList.add("empty");
        daysContainer.appendChild(empty);
    }

    for (let i = 1; i <= lastDay; i++) {

        let day = document.createElement("div");
        day.classList.add("day-cell");
        day.textContent = i;

        let key = currentYear + "-" + currentMonth + "-" + i;

        if (events[key]) {
            day.classList.add("has-event");
        }

        let today = new Date();
        if (
            i === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear()
        ) {
            day.classList.add("today");
        }

        day.onclick = function () {
            selectDay(i);
        };

        daysContainer.appendChild(day);
    }
}

function selectDay(day) {

    selectedDay = day;

    document.querySelectorAll(".day-cell")
        .forEach(d => d.classList.remove("selected"));

    let cells = document.querySelectorAll(".day-cell");

    let index = day - 1;

    if (cells[index]) {
        cells[index].classList.add("selected");
    }

    let key = currentYear + "-" + currentMonth + "-" + day;

    if (events[key]) {
        eventInput.value = events[key].title;
        eventTime.value = events[key].time;
        eventPlace.value = events[key].place;
        eventDesc.value = events[key].desc;
    } else {
        eventInput.value = "";
        eventTime.value = "";
        eventPlace.value = "";
        eventDesc.value = "";
    }

    selectedDateLabel.textContent =
        day + " de " + months[currentMonth] + " " + currentYear;
}

function saveEvent() {

    if (selectedDay === null) {
        eventMessage.textContent = "Selecciona un día primero";
        return;
    }

    if (eventInput.value.trim() === "") {
        eventMessage.textContent = "El título es obligatorio";
        return;
    }

    let key = currentYear + "-" + currentMonth + "-" + selectedDay;

    events[key] = {
        title: eventInput.value,
        time: eventTime.value,
        place: eventPlace.value,
        desc: eventDesc.value
    };

    eventMessage.textContent = "Evento guardado";
    renderCalendar();
}

function deleteEvent() {

    if (selectedDay === null) {
        eventMessage.textContent = "Selecciona un día primero";
        return;
    }

    let key = currentYear + "-" + currentMonth + "-" + selectedDay;

    delete events[key];

    eventInput.value = "";
    eventTime.value = "";
    eventPlace.value = "";
    eventDesc.value = "";

    eventMessage.textContent = "Evento eliminado";

    renderCalendar();
}

function changeMonth(value) {
    currentMonth += value;

    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }

    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }

    renderCalendar();
}

function goToday() {
    let today = new Date();

    currentMonth = today.getMonth();
    currentYear = today.getFullYear();

    renderCalendar();
}

function searchDate() {

    currentMonth = parseInt(searchMonth.value);
    currentYear = parseInt(searchYear.value);

    renderCalendar();

    if (searchDay.value) {
        selectDay(parseInt(searchDay.value));
    }
}

document.getElementById("btn-save-event").onclick = saveEvent;
document.getElementById("btn-delete-event").onclick = deleteEvent;
document.getElementById("btn-search").onclick = searchDate;
document.getElementById("btn-today").onclick = goToday;
document.getElementById("prev-month").onclick = function () {
    changeMonth(-1);
};
document.getElementById("next-month").onclick = function () {
    changeMonth(1);
};

renderCalendar();