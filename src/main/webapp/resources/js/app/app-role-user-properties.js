///////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////////////

const propertiesContainer = $('.properties-container');
let propertyCalendarArray = [];//TODO

const addEventModal = $('.add-event-modal');
const addEventForm = $('#add-event-form');
addEventForm.on('submit', saveEventToDatabaseAndAddEventToCalendar);

const editEventModal = $('.edit-event-modal');
const editEventForm = $('#edit-event-form');
editEventForm.on('submit', updateEventDataInDatabase)


let currentCalendar;
let selectionInfoEventStart;
let selectionInfoEventEnd;

let currentEvent;
let cancelBookingBtn = $('.cancel-booking-btn');
cancelBookingBtn.on('click', deleteEventFromPropertyCalendar)


////////////////////////////////////////////////////// CLASSES /////////////////////////////////////////////////////////

class Customer {
    constructor(customerID, customerName, customerSurname, customerPhone) {
        this.customerID = customerID;
        this.customerName = customerName;
        this.customerSurname = customerSurname;
        this.customerPhone = customerPhone;
    }
}

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

            const {contactNumber, email, username} = user;
            let propertyIdentifier = `property-${propertyCounter}`;
            let calendarIdentifier = `calendar-${propertyCounter}`;

            createPropertyNameTabElement(propertyIdentifier, calendarIdentifier, propertyName);
            createPropertyCardElement(propertyIdentifier);
            createFullCalendarElement(propertyIdentifier, propertyId, calendarIdentifier, propertyCalendar);
            createPropertyDetailsElement(propertyIdentifier);
            createPropertyPhotoElement(propertyIdentifier, propertyPhoto);
            createPropertyAddressElement(propertyIdentifier, isAvailable, propertyType, propertyAddress);
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
    nameTabElement.on('click', displayPropertyCard).on('click', setCurrentCalendar).on('click', renderPropertyCalendar);
    nameTabContainer.append(nameTabElement.append(nameTextElement));
}

function renderPropertyCalendar(){
    propertyCalendarArray.forEach(calendar => {
        if (calendar.el.getAttribute('id')){
            calendar.render();
        }
    });
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
}

function createPropertyPhotoElement(propertyIdentifier, propertyPhoto) { //TODO
    const {propertyPhotoId, fileData, fileName, fileType} = propertyPhoto;
    const detailsElement = $(`.property-details-container.${propertyIdentifier}`);
    const photoElement = $('<div class="property-photo"></div>');
    const imageElement = $('<img alt="" src="" class="property-image">');
    const imgSrc = convertPropertyPhotoFileDataToBlob(fileData);
    const photoId = $(this).attr('data-photo-id');
    const changeImageElement = $(
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
}

function createPropertyAddressElement(propertyIdentifier, isAvailable, propertyType, propertyAddress) {
    const {propertyTypeId, propertyTypeName} = propertyType;
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
    const {propertyCalendarId} = propertyCalendar;
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
        selectable: true,
        selectOverlap: false,
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
        displayEventTime: false,
        events: function (info, successCallback, failureCallback){  //TODO
            $.get(`http://localhost:8080/api/event/get-calendar-events/${propertyCalendarId}`,function (events){
                successCallback(
                    events,
                );
            });
        },
        eventTextColor: 'white',
        editable: true,
        dragScroll: true,
        eventOverlap: false,
        eventStartEditable: true,
        eventResizableFromStart: true,
        select: function (selectionInfo) {
            addEventModal.modal('toggle');
            selectionInfoEventStart = selectionInfo.startStr;
            selectionInfoEventEnd = selectionInfo.endStr;
        },
        eventClick: function (eventInfo) { //TODO event modal
            // console.log(eventInfo);
            showEditEventModalWIthEventData(eventInfo);
        },
        eventDrop: function (eventDropInfo) {
            // console.log(eventDropInfo);
            updateEventStartAndEndDates(eventDropInfo);
        },
        eventResize: function (eventResizeInfo) {
            // console.log(eventResizeInfo);
            updateEventStartAndEndDates(eventResizeInfo);
        },
    });
    if (calendar.el.getAttribute('id') === 'calendar-0') {
        currentCalendar = calendar;
        calendar.render();
    }
    propertyCalendarArray.push(calendar);
}

function saveEventToDatabaseAndAddEventToCalendar(e) {
    e.preventDefault();
    addEventModal.modal('toggle');

    const customer = new Customer();
    customer.customerID = null;
    customer.customerName = addEventForm.find('input.add-event-customer-name').val();
    customer.customerSurname = addEventForm.find('input.add-event-customer-surname').val();
    customer.customerPhone = addEventForm.find('input.add-event-customer-phone').val();

    const event = new Event();
    event.id = null;
    event.title = addEventForm.find('input.add-event-title').val();
    event.start = selectionInfoEventStart;
    event.end = selectionInfoEventEnd;
    event.propertyCalendar = {
        propertyCalendarId: getCurrentCalendarId(),
    };
    event.additionalInfo = addEventForm.find('textarea.add-event-additional-info').val();
    event.customer = customer;
    
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/api/event/add-event-to-property-calendar',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        data: JSON.stringify(event),
        success: function (event) {
            addEventToCalendar(event, currentCalendar);
        },
        dataType: 'json',
        error: function (data) { //TODO
            console.log(data);
        }
    });
}

//TODO
function addEventToCalendar(event, calendar) {
    const {eventId, title, start, end, customer, additionalInfo} = event;
    const calendarId = $(calendar).get(0).el.getAttribute('data-property-calendar-id');
    const dbEvent = new Event();
    dbEvent.id = eventId;
    dbEvent.title = title;
    dbEvent.start = start;
    dbEvent.end = end;
    dbEvent.additionalInfo = additionalInfo;
    dbEvent.customer = customer;
    dbEvent.propertyCalendar = {
        propertyCalendarId: calendarId};
    calendar.addEvent(dbEvent);
}

function updateEventStartAndEndDates(eventInfo) {
    const eventId = eventInfo.event.id;
    const start = eventInfo.event.startStr;
    const end = eventInfo.event.endStr;
    $.ajax({
        url: `http://localhost:8080/api/event/update-event-start-and-end-dates/${eventId}/${start}/${end}`,
        type: 'PUT',
        success: function (response) {
            if (response === false || response === null) {
                eventInfo.revert();
            }
        }
    });
}

function showEditEventModalWIthEventData(eventInfo) {
    editEventModal.modal('toggle');
    currentEvent = eventInfo.event;
    const title = eventInfo.event._def.title;
    const {customerName, customerSurname, customerPhone} = eventInfo.event._def.extendedProps.customer;
    const additionalInfo = eventInfo.event._def.extendedProps.additionalInfo;
    editEventForm.find('input.event-title-edit').val(title);
    editEventForm.find('input.event-customer-name-edit').val(customerName);
    editEventForm.find('input.event-customer-surname-edit').val(customerSurname);
    editEventForm.find('input.event-customer-phone-edit').val(customerPhone);
    editEventForm.find('textarea.event-additional-info-edit').val(additionalInfo);
}

function getCurrentCalendarId() {
    return $(currentCalendar).get(0).el.getAttribute('data-property-calendar-id');
}

function getCurrentEventData() {
    const {propertyCalendar:{propertyCalendarId}} = currentEvent.extendedProps;
    return {
        id: currentEvent.id,
        title: currentEvent.title,
        start: currentEvent.startStr,
        end: currentEvent.endStr,
        calendar: {
            propertyCalendarId: propertyCalendarId
        },
        additionalInfo: currentEvent.extendedProps.additionalInfo,
        customer: currentEvent.extendedProps.customer
    };
}

//TODO
function updateEventDataInDatabase(e) {
    e.preventDefault();
    const currentEventData = getCurrentEventData();
    const {customerId} = currentEventData.customer;
    const {propertyCalendarId} = currentEventData.calendar;
    const customer = new Customer();
    customer.customerId = customerId;
    customer.customerName = editEventForm.find('input.event-customer-name-edit').val();
    customer.customerSurname = editEventForm.find('input.event-customer-surname-edit').val();
    customer.customerPhone = editEventForm.find('input.event-customer-phone-edit').val();
    const event = new Event();
    event.id = currentEventData.id;
    event.title = editEventForm.find('input.event-title-edit').val();
    event.start = currentEventData.start;
    event.end = currentEventData.end;
    event.propertyCalendar = {
        propertyCalendarId: propertyCalendarId
    };
    event.additionalInfo = editEventForm.find('textarea.event-additional-info-edit').val();
    event.customer = customer;

    $.ajax({
        type: 'PUT',
        url: 'http://localhost:8080/api/event/update-event-data-in-database',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        data: JSON.stringify(event),
        success: function (event) {
            console.log(event); //TODO update event info in calendar
            // getEventById
        },
        dataType: 'json',
        error: function (data) { //TODO
            console.log(data);
        }
    });
    editEventModal.modal('toggle');
}

function deleteEventFromPropertyCalendar() {
    const currentEventData = getCurrentEventData();
    const currentEventId = currentEventData.id;
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:8080/api/event/delete-event-from-property-calendar/${currentEventId}`,
        success: function (response) {
            editEventModal.modal('toggle');
            currentEvent.remove();
        },
        error: function (data) { //TODO
            console.log(data);
        }
    });
}

//TODO add this to 'add property form' and 'change property photo'
function addPropertyPhoto() {
    const formToSubmit = $('#upload-form').get(0);

    $(formToSubmit).on('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(formToSubmit);

        $.ajax({
            url: 'http://localhost:8080/api/property/upload-property-photo',
            type: 'POST',
            enctype: 'multipart/form-data',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            method: 'POST',
            success: function (response) { //TODO
                console.log(response);
            }
        });
    })
}

///////////////////////// CODE THAT 50% OF THE TIME WORKS EVERY TIME //////////////////////////////////////


// document.addEventListener('click', function () {
//     console.log();
// });

// document.addEventListener('contextmenu', function () {
//     console.log();
// });












