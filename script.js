document.addEventListener('DOMContentLoaded', function() {
    loadEvents();
    document.getElementById('event-form').addEventListener('submit', function(event) {
        event.preventDefault();
        addEvent();
    });
});

function addEvent() {
    const eventText = document.getElementById('event').value;

    if (eventText.trim() !== '') {
        const eventElement = document.createElement('div');
        eventElement.className = 'card';
        eventElement.innerHTML = `
            <span>${eventText}</span>
            <button onclick="deleteEvent(this)">Apagar</button>
        `;

        document.getElementById('events-container').appendChild(eventElement);
        document.getElementById('event').value = '';
        saveEvents();
    }
}

function deleteEvent(button) {
    const card = button.parentNode;
    card.remove();
    saveEvents();
}

function saveEvents() {
    const events = document.querySelectorAll('.card span');
    const eventsArray = [];

    events.forEach(function(event) {
        eventsArray.push(event.textContent);
    });

    localStorage.setItem('events', JSON.stringify(eventsArray));
}

function loadEvents() {
    const eventsArray = JSON.parse(localStorage.getItem('events')) || [];
    const eventsContainer = document.getElementById('events-container');

    eventsArray.forEach(function(eventText) {
        const eventElement = document.createElement('div');
        eventElement.className = 'card';
        eventElement.innerHTML = `
            <span>${eventText}</span>
            <button onclick="deleteEvent(this)">Feito</button>
        `;
        eventsContainer.appendChild(eventElement);
    });
}
