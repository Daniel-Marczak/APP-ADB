///////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////////////

const propertiesContainer = $('.properties-container');
let propertyDetailsElementArray = [];
let propertyPhotoElementArray = [];
let propertyCalendarArray = [];

const eventModal = $('.add-booking-modal');
const addBookingBtn = $('.add-booking-btn');
addBookingBtn.on('click', function (e){
    eventModal.modal('toggle');
});

let currentCalendar;
let selectionInfoEventStart;
let selectionInfoEventEnd;

const addEventForm = $('#add-event-form');
addEventForm.on('submit', saveEventToDatabaseAndAddCalendarEvent);

////////////////////////////////////////////////////// CLASSES /////////////////////////////////////////////////////////

class Event {
    constructor(id, title, start, end, calendarId, customer, additionalInfo) {
        this.id = id;
        this.title = title;
        this.start = start;
        this.end = end;
        this.calendarId = calendarId;
        this.additionalInfo = additionalInfo;
        this.customer = customer;
    }
}

///////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////

function getAllPropertiesByUserId() {
    const userId = $('input[type=hidden]').val();
    let propertyCounter = 0;
    $.get(`http://localhost:8080/api/property/user-properties/${userId}`, function (properties) {

        properties.forEach((property => {
            const {
                propertyId,
                isAvailable,
                propertyAddress,
                propertyDescription,
                propertyCalendar,
                propertyName,
                propertyPhoto,
                propertyRooms,          //TODO
                propertyType,
                user
            } = property
            console.log(property);

            const {propertyTypeId, propertyTypeName} = propertyType;
            const {contactNumber, email, username} = user;

            let propertyIdentifier = `property-${propertyCounter}`;
            let calendarIdentifier = `calendar-${propertyCounter}`;

            createPropertyNameTabElement(propertyIdentifier, calendarIdentifier, propertyName);
            createPropertyCardElement(propertyIdentifier);
            createFullCalendarElement(propertyIdentifier, propertyId, calendarIdentifier, propertyCalendar);
            createPropertyDetailsElement(propertyIdentifier);
            createPropertyPhotoElement(propertyIdentifier, propertyPhoto);
            createPropertyAddressElement(propertyIdentifier, isAvailable, propertyTypeName, propertyAddress);
            createPropertyDescriptionElement(propertyIdentifier, propertyDescription);

            propertyCounter++
        }));
        const propertyCards = $(`.property-card:not('.property-0')`);
        for (let i = 0; i < propertyCards.length; i++) {
            $(propertyCards[i]).addClass('hidden');
        }
    });
}

getAllPropertiesByUserId();

function convertPropertyPhotoFileDataToBlob(fileData) {
    const byteCharacters = atob(fileData);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], {type: "image/jpg"});
}

function displayPropertyCard() {
    const propertyCards = $(`.property-card`);
    for (let i = 0; i < propertyCards.length; i++) {
        if ($(propertyCards[i]).hasClass(`${$(this.classList)[1]}`)) {
            $(propertyCards[i]).removeClass('hidden').toggle().fadeIn(300);
        } else {
            $(propertyCards[i]).addClass('hidden').toggle().fadeOut(300);
        }
    }
}

function createPropertyNameTabElement(propertyIdentifier, calendarIdentifier, propertyName) {
    const nameTabContainer = $('.property-name-tab-container');
    const nameTabElement = $(`<div class="property-name-tab" ></div>`);
    const nameTextElement = $('<h3 style="margin-top: 0px"></h3>').text(propertyName);
    nameTabElement.addClass(`${propertyIdentifier}`).addClass(`${calendarIdentifier}`);
    nameTabElement.on('click', displayPropertyCard).on('click', setCurrentCalendar);
    nameTabContainer.append(nameTabElement.append(nameTextElement));
}

function createPropertyCardElement(propertyIdentifier) {
    const cardContainer = $('.property-card-container');
    const cardElement = $('<div class="property-card"></div>');
    cardElement.addClass(propertyIdentifier);
    cardContainer.prepend(cardElement);
}

function createPropertyDetailsElement(propertyIdentifier) {
    const cardElement = $(`.property-card.${propertyIdentifier}`);
    const detailsElement = $('<div class="property-details-container"></div>');
    detailsElement.addClass(propertyIdentifier);
    cardElement.append(detailsElement);
    propertyDetailsElementArray.push($(detailsElement[0]).context);
}

function createPropertyPhotoElement(propertyIdentifier, propertyPhoto) {
    const {propertyPhotoId, fileData, fileName, fileType} = propertyPhoto;
    const detailsElement = $(`.property-details-container.${propertyIdentifier}`);
    const photoElement = $('<div class="property-photo"></div>');
    const imageElement = $('<img alt="" src="" class="property-image">');
    const imgSrc = convertPropertyPhotoFileDataToBlob(fileData);
    const photoId = $(this).attr('data-photo-id');
    const changeImageElement = $( //TODO
        `<form method="POST" class="upload-photo" action="<c:url value='/api/property/test'/>" enctype="multipart/form-data">
            <input type="hidden" name="propertyPhotoId" value="${photoId}"/> 
            <label>Select a file to upload
                <input type="file" name="file" class="hidden"/>
            </label>
            <input type="submit" value="Submit" class="hidden"/>
        </form>`
    );
    imageElement.attr('src', URL.createObjectURL(imgSrc)).attr('alt', fileName);
    imageElement.attr('data-photo-id', propertyPhotoId);
    imageElement.addClass(propertyIdentifier);
    detailsElement.append(photoElement.append(changeImageElement).append(imageElement));
    propertyPhotoElementArray.push($(photoElement[0]));
}

function createPropertyAddressElement(propertyIdentifier, isAvailable, propertyTypeName, propertyAddress) {
    const {propertyAddressId, city, country, postalCode, province, region, street} = propertyAddress;
    const detailsElement = $(`.property-details-container.${propertyIdentifier}`);
    const addressElement = $('<div class="property-address">');
    let isAvailableToString = (isAvailable) ? 'Yes' : 'No';
    const addressDetailsTableElement = $(
        `<table class="property-address-table">
            <tbody>
                <tr><th>Available: </th><td><input value="${isAvailableToString}"></td></tr>
                <tr><th>Type: </th><td><input value="${propertyTypeName}"></td></tr>
                <tr><th>City: </th><td><input value="${city}"></td></tr>
                <tr><th>Street: </th><td><input value="${street}"></td></tr>
                <tr><th>Postal code:</th><td><input value="${postalCode}"></td></tr>
                <tr><th>Province: </th><td><input value="${province}"></td></tr>
                <tr><th>Region: </th><td><input value="${region}"></td></tr>
                <tr><th>Country: </th><td><input value="${country}"></td></tr>
            </tbody>
        </table>`);
    detailsElement.append(addressElement.append(addressDetailsTableElement));
}

function createPropertyDescriptionElement(propertyIdentifier, propertyDescription) {
    const {propertyDescriptionId, descriptionText} = propertyDescription;
    const detailsElement = $(`.property-details-container.${propertyIdentifier}`);
    const descriptionElement = $('<div class="property-description">');
    const descriptionTextElement = $(
        `<table class="property-description-table">
            <tbody>
                <tr><th>Description</th></tr>
                <tr><td><textarea class="description-text">${descriptionText}</textarea></td></tr>
            </tbody>
        </table>`
    );
    detailsElement.append(descriptionElement.append(descriptionTextElement));
}

function setCurrentCalendar() {
    let nameTabCalendarIdentifierClassName = this.classList[2];
    propertyCalendarArray.forEach(calendar => {
        const calendarDataPropertyId = calendar.el.classList[1];
        if (nameTabCalendarIdentifierClassName === calendarDataPropertyId) {
            currentCalendar = calendar;
        }
    });
}

function createFullCalendarElement(propertyIdentifier, propertyId, calendarIdentifier, propertyCalendar) {
    const {propertyCalendarId, events} = propertyCalendar;
    const propertyCard = $(`.property-card.${propertyIdentifier}`);
    const calendarElement = $(`<div id='${calendarIdentifier}' class='property-calendar'></div>`);
    calendarElement.attr('data-property-calendar-id', propertyCalendarId)
    calendarElement.addClass(calendarIdentifier);
    propertyCard.get(0).append(calendarElement.get(0));

    let calendar = new FullCalendar.Calendar(calendarElement.get(0), {
        initialView: 'dayGridMonth',
        titleRangeSeparator: ' \u2013 ',
        height: "auto",
        contentHeight: "auto",
        editable: true,
        selectable: true,
        fixedWeekCount: true,
        firstDay: 1,
        weekNumbers: true,
        weekText: '',
        headerToolbar: {
            start: '',
            center: 'title',
            end: 'today prev,next'
        },
        titleFormat: {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        },
        // display: 'block',
        displayEventTime: false,
        eventTextColor: 'white',
        events: [
            {
                id: '',
                title: '',
                start: '',
                end: '',
                extendedProps: {
                    propertyId: '',
                    calendarId: '',
                    additionalInfo: '',
                    customer: {
                        name: '',
                        surname: '',
                        phone: '',
                    }
                },
            }
        ],
        select: function (selectionInfo) {
            eventModal.modal('toggle');
            selectionInfoEventStart = selectionInfo.startStr;
            selectionInfoEventEnd = selectionInfo.endStr;
        },
        eventClick: function (info) { //TODO event modal
            console.log(info.event);
        }
    });
    if (calendar.el.getAttribute('id') === 'calendar-0') {
        currentCalendar = calendar;
    }

    events.forEach(event => {
        const {eventId, tittle, start, end, customer, additionalInfo} = event;
        const dbEvent = new Event();
        dbEvent.id = eventId;
        dbEvent.title = tittle;
        dbEvent.start = start;
        dbEvent.end = end;
        dbEvent.calendarId = propertyCalendarId;
        dbEvent.additionalInfo = additionalInfo
        dbEvent.customer = customer;

        calendar.addEvent(dbEvent)
    });

    propertyCalendarArray.push(calendar);
    calendar.render();
}

///////////////////////// THINGS THAT 50% OF THE TIME WORK EVERY TIME A.K.A TESTS //////////////////////////////////////




async function saveEventToDatabaseAndAddCalendarEvent(e) {
    e.preventDefault();

    const currentCalendarId = $(currentCalendar).get(0).el.getAttribute('data-property-calendar-id');
    const addEventFormData = new FormData(addEventForm.get(0));
    addEventFormData.append('start', selectionInfoEventStart);
    addEventFormData.append('end', selectionInfoEventEnd);
    addEventFormData.append('calendarId', currentCalendarId);
    let eventForm = {};
    for (let [key, value] of addEventFormData.entries()) {
        eventForm[key] = value;
    }

     $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/api/calendar/save-event-to-database',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        data: JSON.stringify(eventForm),
        success: function (response){
            console.log(response);
        }
    });


}

// function addCalendarEvent(propertyCalendarId, event){
//     const {eventId, tittle, start, end, customer, additionalInfo} = event;
//     const dbEvent = new Event();
//     dbEvent.id = eventId;
//     dbEvent.title = tittle;
//     dbEvent.start = start;
//     dbEvent.end = end;
//     dbEvent.propertyId = "propertyId"  // TODO
//     dbEvent.calendarId = propertyCalendarId;
//     dbEvent.additionalInfo = additionalInfo
//     dbEvent.customer = customer;
//
//     calendar.addEvent(dbEvent)
// }


// document.addEventListener('click', function () {
//     console.log(currentCalendar);
//     // console.log(propertyCalendarArray);
// });












