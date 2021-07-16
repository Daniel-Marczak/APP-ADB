///////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////////////

const propertiesContainer = $('.properties-container');

let propertyCounter = 0;
let propertyCalendarArray = [];

const addPropertyBtn = $('button.add-property-btn');
addPropertyBtn.on('click', showSaveOrUpdatePropertyModal);

const deletePropertyBtn =$('button.delete-property-btn');
deletePropertyBtn.on('click', deletePropertyFromDatabase);

const addEventForm = $('#add-event-form');
addEventForm.on('submit', saveEventToDatabaseAndAddEventToCalendar);

const editEventForm = $('#edit-event-form');
editEventForm.on('submit', updateEventDataInDatabase);

const saveOrUpdatePropertyForm = $("#save-or-update-property-form");
saveOrUpdatePropertyForm.on('submit', savOrUpdateProperty);

let selectionInfoEventStart;
let selectionInfoEventEnd;
let selectionInfoCurrentCalendarId;

let currentEvent;
let cancelBookingBtn = $('.cancel-booking-btn');
cancelBookingBtn.on('click', deleteEventFromPropertyCalendar);


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
getAllPropertiesByUserId();
getAllPropertyTypes();
getAllCountries();

function getAllPropertiesByUserId() {
    const userId = $('input[type=hidden].user-id').val();
    $.get(`http://localhost:8080/api/property/user-properties/${userId}`, function (properties) {
        $(properties).each(function (index, property) {
            let propertyIdentifier = `property-${propertyCounter}`;
            let calendarIdentifier = `calendar-${propertyCounter}`;
            $('.property-name-tab-container')
                .append(createPropertyNameTabEl(propertyCounter, propertyIdentifier, calendarIdentifier, property));
            $('.property-card-container')
                .append(createPropertyCardEl(propertyCounter, propertyIdentifier, property)
                    .append(createFullCalendarEl(propertyCounter, propertyIdentifier, calendarIdentifier, property))
                    .append(createPropertyDetailsEl(propertyIdentifier, property))
                    .append(createPropertyPhotoEl(propertyIdentifier, property))
                );
            propertyCounter++
        });
    });
}

function showSaveOrUpdatePropertyModal() {
    $('.save-or-update-property-modal').modal('toggle');
    $('input.su-property-id').val("");
    deletePropertyBtn.addClass('hidden');
    $('h4.add-new-property-header-txt').removeClass('hidden');
    $('.su-save-property-btn').removeClass('hidden');
    $('.su-save-changes-btn').addClass('hidden');

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

function createPropertyNameTabEl(propertyCounter, propertyIdentifier, calendarIdentifier, property) {
    const { propertyId, propertyName} = property;
    const nameTabEl = $(`<div class="property-name-tab" data-property-id="${propertyId}"></div>`);
    const nameTextEl = $('<h3 style="margin-top: 0px"></h3>').text(propertyName);
    nameTabEl.addClass(`${propertyIdentifier}`).addClass(`${calendarIdentifier}`);
    nameTabEl.on('click', displayPropertyCard).on('click', renderPropertyCalendar).on('click', addPropertyNameTabSelectedClass);
    if (propertyCounter === 0) {
        nameTabEl.addClass('property-name-tab-selected');
    }
    nameTabEl.append(nameTextEl);
    return nameTabEl;
}

function createPropertyCardEl(propertyCounter, propertyIdentifier, property) {
    const {propertyId} = property;
    const cardEl = $(`<div class="property-card" data-property-id="${propertyId}"></div>`);
    if (propertyCounter > 0) {
        cardEl.addClass('hidden');
    }
    cardEl.addClass(propertyIdentifier);
    return cardEl;
}

function createFullCalendarEl(propertyCounter, propertyIdentifier, calendarIdentifier, property) {
    const {propertyCalendar:{propertyCalendarId}} = property;
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

function createPropertyDetailsEl(propertyIdentifier,property) {
    const {propertyId, isAvailable, propertyAddress, propertyDescription, propertyName, propertyType} = property;
    const {descriptionText} = propertyDescription;
    const {propertyTypeName} = propertyType;
    const {city, country: {countryName}, postalCode, province, region, street} = propertyAddress;
    const detailsEl = $(`<div class="property-details-el" data-property-id="${propertyId}"></div>`);
    detailsEl.addClass(propertyIdentifier);
    
    const propertyDetailsTableEl = $(
        `<table class="property-address-table">
            <tbody>
                <tr>
                    <input type="hidden" class="details-property-id" value="${propertyId}"/>
                    <input type="hidden" class="details-property-name" value="${propertyName}"/>  
                </tr>
                <tr><th>Available: </th><td><input type="text" class="details-property-isAvailable" value="${(isAvailable) ? 'Yes' : 'No'}" readonly/></td></tr>
                <tr><th>Type: </th><td><input type="text" class="details-property-type-name" value="${propertyTypeName}" readonly/></td></tr>
                <tr><th>Country: </th><td><input type="text" class="details-property-country-name" value="${countryName}" readonly/></td></tr>
                <tr><th>City: </th><td><input type="text" class="details-property-city" value="${city}" readonly/></td></tr>
                <tr><th>Street: </th><td><input type="text" class="details-property-street" value="${street}" readonly/></td></tr>
                <tr><th>Postal code: </th><td><input type="text" class="details-property-postal-code" value="${postalCode}" readonly/></td></tr>
                <tr><th>Province: </th><td><input type="text" class="details-property-province" value="${province}" readonly/></td></tr>
                <tr><th>Region: </th><td><input type="text" class="details-property-region" value="${region}" readonly/></td></tr>
                <tr><th>Description: </th><td><textarea class="details-property-description" readonly>${descriptionText}</textarea></td></tr>
            </tbody>
        </table>`
    );
    detailsEl.append(propertyDetailsTableEl);
    detailsEl.on('click', editPropertyDetails)
    return detailsEl;
}

function createPropertyPhotoEl(propertyIdentifier, property) { //TODO
    const {propertyPhoto: {propertyPhotoId, fileData, fileName}} = property;
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

function editPropertyDetails(){
    deletePropertyBtn.removeClass('hidden');
    $('h4.add-new-property-header-txt').addClass('hidden');
    $('.su-save-property-btn').addClass('hidden');
    $('.su-save-changes-btn').removeClass('hidden');

    const currentPropertyTypeName = $(this).children('table').find('input.details-property-type-name').val();
    const currentCountryName = $(this).children('table').find('input.details-property-country-name').val();

    $('input.su-property-id').val($(this).children('table').find('input.details-property-id').val());
    $('input.su-property-user-id').val($(this).children('table').find('input.details-user-id').val());
    $('input.su-property-name').val($(this).children('table').find('input.details-property-name').val());
    $('input.su-property-city').val($(this).children('table').find('input.details-property-city').val());
    $('input.su-property-street').val($(this).children('table').find('input.details-property-street').val());
    $('input.su-property-postal-code').val($(this).children('table').find('input.details-property-postal-code').val());
    $('input.su-property-province').val($(this).children('table').find('input.details-property-province').val());
    $('input.su-property-region').val($(this).children('table').find('input.details-property-region').val());
    $('textarea.su-property-description').val($(this).children('table').find('textarea.details-property-description').val());

    if ($(this).children('table').find('input.details-property-isAvailable').val() === 'Yes'){
        $('input.su-is-available.true').prop('checked', true);
    } else {
        $('input.su-is-available.false').prop('checked', true);
    }
    $('option.su-property-type-option').each(function (index, option){
        if (currentPropertyTypeName === $(option).text()){
            $(option).attr('selected', 'selected');
        }
    });
    $('option.su-property-country-option').each(function (index, option){
        if (currentCountryName === $(option).text()){
            $(option).attr('selected', 'selected');
        }
    });

    $('.save-or-update-property-modal').modal('toggle');
}

function savOrUpdateProperty(e) {
    e.preventDefault();
    $('.save-or-update-property-modal').modal('toggle');

    const propertyForm = {
        propertyId: $('input.su-property-id').val(),
        userId: $('input[type=hidden].user-id').val(),
        propertyName: $('input.su-property-name').val(),
        isAvailable: $('input.su-is-available:checked').val(),
        propertyTypeId: $('select.su-property-type').val(),
        countryId: $('select.su-property-country').val(),
        city: $('input.su-property-city').val(),
        street: $('input.su-property-street').val(),
        postalCode: $('input.su-property-postal-code').val(),
        province: $('input.su-property-province').val(),
        region: $('input.su-property-region').val(),
        propertyDescription: $('textarea.su-property-description').val(),
    }

    let type;
    let url;
    
    if (propertyForm.propertyId.length < 1){
        type = 'POST'
       url = 'http://localhost:8080/api/property/save-property-to-database'
    } else {
        type = 'PUT'
        url = 'http://localhost:8080/api/property/update-property-data-in-database'
    }

    $.ajax({
        type: type,
        url: url,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        data: JSON.stringify(propertyForm),
        success: function (property) {
            if(propertyForm.propertyId.length < 1){
                let propertyIdentifier = `property-${propertyCounter}`;
                let calendarIdentifier = `calendar-${propertyCounter}`;
                $('.property-name-tab-container')
                    .append(createPropertyNameTabEl(propertyCounter, propertyIdentifier, calendarIdentifier, property));
                $('.property-card-container')
                    .append(createPropertyCardEl(propertyCounter, propertyIdentifier, property)
                        .append(createFullCalendarEl(propertyCounter, propertyIdentifier, calendarIdentifier, property))
                        .append(createPropertyDetailsEl(propertyIdentifier, property))
                        .append(createPropertyPhotoEl(propertyIdentifier, property))
                    );
                propertyCounter++
            } else {
                const {
                    isAvailable,
                    propertyAddress: {city, country: { countryName}, postalCode, province, region, street},
                    propertyDescription: {descriptionText},
                    propertyId,
                    propertyName,
                    propertyType: {propertyTypeName}
                } = property;
                $('.property-name-tab').each(function (index, nameTab){
                    if (parseInt($(nameTab).attr('data-property-id')) === propertyId){
                        $(nameTab).find('h3').text(propertyName);
                    }
                });
                $('.property-details-el').each(function (index, detailsElement){
                    if (parseInt($(detailsElement).attr('data-property-id')) === propertyId){
                        $(detailsElement).find('input.details-property-isAvailable').val((isAvailable) ? 'Yes' : 'No');
                        $(detailsElement).find('input.details-property-type-name').val(propertyTypeName);
                        $(detailsElement).find('input.details-property-country-name').val(countryName);
                        $(detailsElement).find('input.details-property-city').val(city);
                        $(detailsElement).find('input.details-property-street').val(street);
                        $(detailsElement).find('input.details-property-postal-code').val(postalCode);
                        $(detailsElement).find('input.details-property-province').val(province);
                        $(detailsElement).find('input.details-property-region').val(region);
                        $(detailsElement).find('textarea.details-property-description').text(descriptionText);
                    }
                });
            }
        },
        dataType: 'json',
        error: function (data) { //TODO
            console.log(data);
        }
    });
}

function deletePropertyFromDatabase(){
    const propertyId = $('input[type=hidden].su-property-id').val();
    console.log(propertyId);
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:8080/api/property/delete-property-from-database/${propertyId}`,
        success: function (response) {
            const propertyNameTabs = $('.property-name-tab');
            const propertyCards = $('.property-card');
            propertyNameTabs.each(function (index, nameTab){
                if ($(nameTab).attr('data-property-id') === propertyId){
                    $(nameTab).remove();
                }
            });
            propertyCards.each(function (index, propertyCard){
                if ($(propertyCard).attr('data-property-id') === propertyId){
                    $(propertyCard).remove();
                }
            });
            propertyNameTabs.first().addClass('property-name-tab-selected');
            propertyCards.first().removeClass('hidden');
            renderPropertyCalendar();
            $('.save-or-update-property-modal').modal('toggle');
        },
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












