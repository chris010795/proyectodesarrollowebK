document.addEventListener("DOMContentLoaded", () => {
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
let selectedDate = null;
let events = {};
const months = [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio",
    "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
];

function key(y,m,d){
    return `${y}-${m}-${d}`;
}

function renderCalendar(){
    let y = currentDate.getFullYear();
    let m = currentDate.getMonth();
    monthTitle.textContent = `${months[m]} ${y}`;
    daysContainer.innerHTML = "";
    let first = new Date(y,m,1).getDay();
    let last = new Date(y,m+1,0).getDate();
    for(let i=0;i<first;i++){
        let empty = document.createElement("div");
        empty.classList.add("empty");
        daysContainer.appendChild(empty);
    }

    for(let d=1;d<=last;d++){
        let cell = document.createElement("div");
        cell.classList.add("day-cell");
        cell.textContent = d;
        let k = key(y,m,d);
        if(events[k]){
            cell.classList.add("has-event");
        }
        let today = new Date();
        if(d === today.getDate() && m === today.getMonth() && y === today.getFullYear()){
            cell.classList.add("today");
        }
        cell.onclick = () => {
            selectedDate = {y,m,d};
            selectDay(y,m,d);
        };
        daysContainer.appendChild(cell);
    }
}

function selectDay(y,m,d){
    document.querySelectorAll(".day-cell")
    .forEach(c => c.classList.remove("selected"));
    let cells = [...document.querySelectorAll(".day-cell")];
    let found = cells.find(c => parseInt(c.textContent) === d);
    if(found){
        found.classList.add("selected");
    }
    let k = key(y,m,d);
    if(events[k]){
        eventInput.value = events[k].title;
        eventTime.value = events[k].time;
        eventPlace.value = events[k].place;
        eventDesc.value = events[k].desc;
    }else{
        eventInput.value = "";
        eventTime.value = "";
        eventPlace.value = "";
        eventDesc.value = "";
    }
    selectedDateLabel.textContent = `${d} de ${months[m]} ${y}`;
}

document.getElementById("btn-save-event").onclick = () => {
    if(!selectedDate) return;
    let k = key(selectedDate.y, selectedDate.m, selectedDate.d);
    events[k] = {
        title: eventInput.value,
        time: eventTime.value,
        place: eventPlace.value,
        desc: eventDesc.value
    };
    renderCalendar();
};

document.getElementById("btn-delete-event").onclick = () => {
    if(!selectedDate) return;
    let k = key(selectedDate.y, selectedDate.m, selectedDate.d);
    delete events[k];
    renderCalendar();
};

document.getElementById("btn-today").onclick = () => {
    currentDate = new Date();
    renderCalendar();
};

document.getElementById("btn-search").onclick = () => {
    currentDate = new Date(
        searchYear.value,
        searchMonth.value,
        searchDay.value || 1
    );
    renderCalendar();
};

document.getElementById("prev-month").onclick = () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
};

document.getElementById("next-month").onclick = () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
};

renderCalendar();

});