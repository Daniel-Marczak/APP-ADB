///////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////////////

const propertiesContainer = $('.properties-container');

let propertyCounter = 0;
let propertyCalendarArray = [];

const addPropertyBtn = $('.add-property-btn');
addPropertyBtn.on('click', showSaveNewPropertyModal);

const addEventForm = $('#add-event-form');
addEventForm.on('submit', saveEventToDatabaseAndAddEventToCalendar);

const editEventForm = $('#edit-event-form');
editEventForm.on('submit', updateEventDataInDatabase);

const addPropertyForm = $("#save-and-update-property-form");
addPropertyForm.on('submit', saveNewPropertyToDatabase);

let selectionInfoEventStart;
let selectionInfoEventEnd;
let selectionInfoCurrentCalendarId;

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
    const userId = $('input[type=hidden].user-id').val();
    $.get(`http://localhost:8080/api/property/user-properties/${userId}`, function (properties) {

        $(properties).each(function (index, property) {
            const {
                propertyId,
                isAvailable,
                propertyAddress,
                propertyDescription,
                propertyCalendar,
                propertyName,
                propertyPhoto,
                propertyType,
                user
            } = property

            const {contactNumber, email, username} = user;
            let propertyIdentifier = `property-${propertyCounter}`;
            let calendarIdentifier = `calendar-${propertyCounter}`;

            $('.property-name-tab-container').append(createPropertyNameTabEl(propertyCounter, propertyIdentifier, calendarIdentifier, propertyName));
            $('.property-card-container')
                .append(createPropertyCardEl(propertyCounter, propertyIdentifier)
                    .append(createFullCalendarEl(propertyCounter, propertyIdentifier, propertyId, calendarIdentifier, propertyCalendar))
                    .append(createPropertyDetailsEl(propertyIdentifier, isAvailable, propertyType, propertyAddress, propertyDescription))
                    .append(createPropertyPhotoEl(propertyIdentifier, propertyPhoto))
                );

            propertyCounter++
        });
    });
}

getAllPropertiesByUserId();
getAllPropertyTypes();
getAllCountries();

function showSaveNewPropertyModal() {
    $('.save-and-update-property-modal').modal('toggle');
}


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

function createPropertyNameTabEl(propertyCounter, propertyIdentifier, calendarIdentifier, propertyName) {
    const nameTabEl = $(`<div class="property-name-tab" ></div>`);
    const nameTextEl = $('<h3 style="margin-top: 0px"></h3>').text(propertyName);
    nameTabEl.addClass(`${propertyIdentifier}`).addClass(`${calendarIdentifier}`);
    nameTabEl.on('click', displayPropertyCard).on('click', renderPropertyCalendar).on('click', addPropertyNameTabSelectedClass);
    if (propertyCounter === 0) {
        nameTabEl.addClass('property-name-tab-selected');
    }
    nameTabEl.append(nameTextEl);
    return nameTabEl;
}

function createPropertyCardEl(propertyCounter, propertyIdentifier) {
    const cardEl = $('<div class="property-card"></div>');
    if (propertyCounter > 0) {
        cardEl.addClass('hidden');
    }
    cardEl.addClass(propertyIdentifier);
    return cardEl;
}

function createFullCalendarEl(propertyCounter, propertyIdentifier, propertyId, calendarIdentifier, propertyCalendar) {
    const {propertyCalendarId} = propertyCalendar;
    const calendarEl = $(`<div id='${calendarIdentifier}' class='property-calendar'></div>`);
    calendarEl.attr('data-property-calendar-id', propertyCalendarId)
    calendarEl.addClass(calendarIdentifier);

    let calendar = new FullCalendar.Calendar(calendarEl.get(0), {
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
        events: function (info, successCallback, failureCallback) {
            $.get(`http://localhost:8080/api/event/get-calendar-events/${propertyCalendarId}`, function (events) {
                successCallback(
                    events
                );
            }).error(function (error) {
                const {responseJSON} = error
                failureCallback(responseJSON)
            });
        },
        eventTextColor: 'white',
        editable: true,
        dragScroll: true,
        eventOverlap: false,
        eventStartEditable: true,
        eventResizableFromStart: true,
        select: function (selectionInfo) {
            $('.add-event-modal').modal('toggle');
            selectionInfoEventStart = selectionInfo.startStr;
            selectionInfoEventEnd = selectionInfo.endStr;
            selectionInfoCurrentCalendarId = selectionInfo.view.calendar.el.getAttribute('data-property-calendar-id');
        },
        eventClick: function (eventInfo) {
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
    calendar.customContentRenderId = propertyCalendarId;
    if (propertyCounter === 0) {
        calendar.render();
    }
    propertyCalendarArray.push(calendar);
    return calendarEl;
}

function createPropertyDetailsEl(propertyIdentifier, isAvailable, propertyType, propertyAddress, propertyDescription) {
    const {propertyDescriptionId, descriptionText} = propertyDescription;
    const {propertyTypeId, propertyTypeName} = propertyType;
    const {
        propertyAddressId,
        city,
        country: {countryId, countryName},
        postalCode,
        province,
        region,
        street
    } = propertyAddress;
    const detailsEl = $('<div class="property-details-el"></div>');
    detailsEl.addClass(propertyIdentifier);

    const isAvailableToString = (isAvailable) ? 'Yes' : 'No';
    const propertyDetailsTableEl = $(
        `<table class="property-address-table">
            <tbody>
                <tr><th>Available: </th><td> ${isAvailableToString}</td></tr>
                <tr><th>Type: </th><td>${propertyTypeName}</td></tr>
                <tr><th>City: </th><td>${city}</td></tr>
                <tr><th>Street: </th><td>${street}</td></tr>
                <tr><th>Postal code:</th><td>${postalCode}</td></tr>
                <tr><th>Province: </th><td>${province}</td></tr>
                <tr><th>Region: </th><td>${region}</td></tr>
                <tr><th>Country: </th><td>${countryName}</td></tr>
                <tr><th>Description: </th><td>${descriptionText}</td></tr>
            </tbody>
        </table>`
    );
    detailsEl.append(propertyDetailsTableEl);
    return detailsEl;
}

function createPropertyPhotoEl(propertyIdentifier, propertyPhoto) { //TODO
    const {propertyPhotoId, fileData, fileName, fileType} = propertyPhoto;
    const propertyPhotoEl = $('<div class="property-photo-el"></div>');
    const changePropertyPhotoEl = $('<div class="change-property-photo-el"></div>');
    const addPropertyPhotoForm = $(
        `<form 
            class="add-property-photo-form hidden" 
            data-property-photo-id="${propertyPhotoId}" 
            enctype="multipart/form-data">
        </form>`
    );
    addPropertyPhotoForm.on('submit', addPropertyPhoto);
    const fileUploadLabel = $('<label class="file-upload-label">Select a file to upload </label>');
    fileUploadLabel.on('click', triggerFileUploadInput);
    const fileUploadInput = $('<input type="file" name="file" class="file-upload-input hidden"/>');
    fileUploadInput.on('change', changeLabelTextToFileName);
    const submitBtn = $('<input type="submit" value="Submit" style="display: inline-block"/>');
    addPropertyPhotoForm.append(fileUploadLabel).append(fileUploadInput).append(submitBtn);

    const imageDisplayEl = $('<div class="image-display-el"></div>');
    const imageEl = $('<img alt="" src="" class="property-img">');
    const imgSrc = convertPropertyPhotoFileDataToBlob(fileData);
    imageEl.attr('src', URL.createObjectURL(imgSrc)).attr('alt', fileName);
    propertyPhotoEl.append(changePropertyPhotoEl.append(addPropertyPhotoForm)).append(imageDisplayEl);

    $(imageDisplayEl, imageEl).on('click', function () {
        if (propertyPhotoEl.hasClass('property-photo-scale-animation')) {
            propertyPhotoEl.toggleClass('property-photo-scale-animation');
            addPropertyPhotoForm.addClass('hidden');
        } else {
            propertyPhotoEl.toggleClass('property-photo-scale-animation');
            addPropertyPhotoForm.removeClass('hidden');
        }
    });

    $(imageDisplayEl, imageEl).on('mouseenter', function () {
        if (!propertyPhotoEl.hasClass('property-photo-scale-animation')) {
            propertyPhotoEl.toggleClass('property-photo-scale-animation');
            addPropertyPhotoForm.removeClass('hidden');
        }
    });

    if (fileData === null) {
        imageEl.addClass('hidden');
    }
    imageDisplayEl.append(imageEl);

    return propertyPhotoEl;
}

function addPropertyPhoto(e) {
    e.preventDefault();
    const formToSubmit = $(this).get(0);
    const propertyPhotoId = $(this).attr('data-property-photo-id');
    const formData = new FormData(formToSubmit);
    const imgEl = $(this).closest('div.property-photo-el').find('img.property-img');
    $.ajax({
        url: `http://localhost:8080/api/property/upload-property-photo/${propertyPhotoId}`,
        type: 'POST',
        enctype: 'multipart/form-data',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (propertyPhoto) {
            const {propertyPhotoId, fileData, fileName} = propertyPhoto;
            console.log(propertyPhoto);
            if ($(imgEl).hasClass('hidden')) {
                imgEl.removeClass('hidden');
                console.log("hidden");
            }
            const imgSrc = convertPropertyPhotoFileDataToBlob(fileData);
            imgEl.removeAttr('src');
            imgEl.attr('src', URL.createObjectURL(imgSrc)).attr('alt', fileName);
        }
    });
}

function getAllPropertyTypes() {
    const propertyTypeSelectEl = $('.su-property-type');
    $.get('http://localhost:8080/api/property/get-all-property-types', function (propertyTypes) {
        $(propertyTypes).each(function (index, propertyType) {
            const {propertyTypeId, propertyTypeName} = propertyType;
            const selectOptionEl = $(`<option value="${propertyTypeId}" class="su-property-type-option">${propertyTypeName}</option>`);
            propertyTypeSelectEl.append(selectOptionEl);
        });
    });
}

function getAllCountries() {
    const propertyCountrySelectEl = $('.su-property-country');
    $.get('http://localhost:8080/api/property/get-all-countries', function (countries) {
        $(countries).each(function (index, country) {
            const {countryId, countryName} = country;
            const selectOptionEl = $(`<option value="${countryId}" class="su-property-country-option">${countryName}</option>`);
            propertyCountrySelectEl.append(selectOptionEl);
        });
    });
}

function addPropertyNameTabSelectedClass() {
    const selectedTab = $(this).get(0).classList[1];
    $('.property-name-tab').each(function (index, value) {
        if (selectedTab === value.classList[1]) {
            $(this).addClass('property-name-tab-selected');
        } else {
            $(this).removeClass('property-name-tab-selected');
        }
    });
}

function changeLabelTextToFileName(e) {
    $(this).prev('label').text(e.target.files[0].name);
}

function triggerFileUploadInput() {
    $(this).next().trigger('click');
}

function renderPropertyCalendar() {
    $(propertyCalendarArray).each(function (index, calendar) {
        if (calendar.el.getAttribute('id')) {
            calendar.render();
        }
    });
}

function getCalendarByDataPropertyCalendarIdAttribute(propertyCalendarId) {
    let calendarById;
    $(propertyCalendarArray).each(function (index, calendar) {
        if (propertyCalendarId === parseInt(calendar.el.getAttribute('data-property-calendar-id'))) {
            calendarById = calendar;
        }
    });
    return calendarById;
}

function saveEventToDatabaseAndAddEventToCalendar(e) {
    e.preventDefault();
    $('.add-event-modal').modal('toggle');

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
        propertyCalendarId: selectionInfoCurrentCalendarId,
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
            if (event.id !== null) {
                addEventToCalendar(event);
            } else {
                //TODO error modal
                console.log('event not saved');
            }
        },
        dataType: 'json',
        error: function (data) { //TODO
            console.log(data);
        }
    });
}

function addEventToCalendar(event) {
    const {propertyCalendarId} = event.propertyCalendar;
    const calendar = getCalendarByDataPropertyCalendarIdAttribute(propertyCalendarId);
    calendar.addEvent(event);
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
    $('.edit-event-modal').modal('toggle');
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

function getCurrentEventData() {
    const {propertyCalendar: {propertyCalendarId}} = currentEvent.extendedProps;
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
            const {propertyCalendar} = event
            const {propertyCalendarId} = propertyCalendar
            const calendar = getCalendarByDataPropertyCalendarIdAttribute(propertyCalendarId);
            calendar.getEventById(event.id).remove();
            calendar.addEvent(event);
        },
        dataType: 'json',
        error: function (data) { //TODO
            console.log(data);
        }
    });
    $('.edit-event-modal').modal('toggle');
}

function deleteEventFromPropertyCalendar() { //TODO
    const currentEventData = getCurrentEventData();
    const currentEventId = currentEventData.id;
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:8080/api/event/delete-event-from-property-calendar/${currentEventId}`,
        success: function (response) {
            $('.edit-event-modal').modal('toggle');
            currentEvent.remove();
        },
        error: function (data) { //TODO
            console.log(data);
        }
    });
}

function saveNewPropertyToDatabase(e) {
    e.preventDefault();
    $('.save-and-update-property-modal').modal('toggle');
    const userId = $('input[type=hidden].user-id').val();
    const propertyForm = {
        userId: userId,
        propertyName: $('input[name=propertyName]').val(),
        isAvailable: $('input[name=isAvailable]:checked').val(),
        propertyTypeId: $('select[name=propertyType]').val(),
        countryId: $('select[name=propertyCountry]').val(),
        city: $('input[name=propertyCity]').val(),
        Street: $('input[name=propertyStreet]').val(),
        postalCode: $('input[name=propertyPostalCode]').val(),
        province: $('input[name=propertyProvince]').val(),
        region: $('input[name=propertyRegion]').val(),
        propertyDescription: $('textarea[name=propertyDescription]').val(),
    }

    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/api/property/save-new-property-to-database',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        data: JSON.stringify(propertyForm),
        success: function (property) {
            const {
                isAvailable,
                propertyAddress,
                propertyCalendar,
                propertyDescription,
                propertyId,
                propertyName,
                propertyPhoto,
                propertyType
            } = property

            let propertyIdentifier = `property-${propertyCounter}`;
            let calendarIdentifier = `calendar-${propertyCounter}`;

            $('.property-name-tab-container').append(createPropertyNameTabEl(propertyCounter, propertyIdentifier, calendarIdentifier, propertyName));
            $('.property-card-container')
                .append(createPropertyCardEl(propertyCounter, propertyIdentifier)
                    .append(createFullCalendarEl(propertyCounter, propertyIdentifier, propertyId, calendarIdentifier, propertyCalendar))
                    .append(createPropertyDetailsEl(propertyIdentifier, isAvailable, propertyType, propertyAddress, propertyDescription))
                    .append(createPropertyPhotoEl(propertyIdentifier, propertyPhoto)));

            propertyCounter++
        },
        dataType: 'json',
        error: function (data) { //TODO
            console.log(data);
        }
    });
}

///////////////////////// CODE THAT 50% OF THE TIME WORKS EVERY TIME //////////////////////////////////////


// document.addEventListener('click', function () {
//     console.log();
// });

// document.addEventListener('contextmenu', function () {
//     console.log();
// });












