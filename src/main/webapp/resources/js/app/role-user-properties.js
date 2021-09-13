///////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////////////
const addPropertyBtn = $('button.add-property-btn');
addPropertyBtn.on('click', removePropertyModalHeaderAndButtons).on('click', displayPropertyModalInCreateMode);

let propertyCounter = 0;
let propertyCalendarArray = [];
let currentEvent;

////////////////////////////////////////////////////// CLASSES /////////////////////////////////////////////////////////

class Customer {
    constructor(customerID, customerName, customerSurname, customerPhone, customerEmail) {
        this.customerID = customerID;
        this.customerName = customerName;
        this.customerSurname = customerSurname;
        this.customerPhone = customerPhone;
        this.customerEmail = customerEmail;
    }
}

class Event {
    constructor(id, title, start, end, calendarId, customer, additionalInfo, numberOfGuests, discountSurcharge, price) {
        this.id = id;
        this.title = title;
        this.start = start;
        this.end = end;
        this.calendarId = calendarId;
        this.additionalInfo = additionalInfo;
        this.customer = customer;
        this.numberOfGuests = numberOfGuests;
        this.discountSurcharge = discountSurcharge;
        this.price = price;
    }
}

///////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////
getAllPropertiesByUserId();
getAllPropertyTypes();
getAllCountries();
getAllRateTypes();

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
                    .append(createPropertyInfoBox(property, propertyIdentifier)
                        .append(createPropertyPhotoEl(propertyIdentifier, property))
                        .append(createPropertyDetailsEl(propertyIdentifier, property))
                    )
                );
            propertyCounter++
        });
    });
}

function displayPropertyModalInCreateMode() {
    clearPropertyModalFormFields();
    setDefaultInputBorderColor($('#create-or-update-property-form'));
    createPropertyModalAddPropertyHeaderAndButtons();
    $('.create-or-update-property-modal').modal('toggle');
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
    const {propertyId, propertyName} = property;
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
    const {propertyCalendar: {propertyCalendarId}} = property;
    const calendarEl = $(`<div id='${calendarIdentifier}' class='property-calendar'></div>`);
    calendarEl.attr('data-property-calendar-id', propertyCalendarId)
    calendarEl.addClass(calendarIdentifier);

    let calendar = new FullCalendar.Calendar(calendarEl.get(0), {
        initialView: 'dayGridMonth',
        titleRangeSeparator: ' \u2013 ',
        contentHeight: 572,
        selectable: true,
        selectOverlap: false,
        fixedWeekCount: true,
        firstDay: 1,
        weekNumbers: true,
        weekText: '',
        headerToolbar: {
            start: '',
            center: 'title',
            end: 'today prev,next',
        },
        titleFormat: {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        },
        displayEventTime: false,
        eventClassNames: 'event-mouseleave',
        editable: true,
        dragScroll: true,
        eventOverlap: false,
        eventStartEditable: true,
        eventResizableFromStart: true,
        events: function (info, successCallback, failureCallback) {
            $.get(`http://localhost:8080/api/event/get-calendar-events/${propertyCalendarId}`, function (events) {
                successCallback(
                    events
                );
            }).error(function (error) {
                const {responseJSON} = error;
                failureCallback(responseJSON);
            });
        },
        eventMouseEnter: function (mouseEnterInfo){
            const {el, event,jsEvent, view} = mouseEnterInfo;
            $(el).addClass('event-mouseenter');
            $(el).removeClass('event-mouseleave');
        },
        eventMouseLeave: function (mouseEnterInfo){
            const {el, event,jsEvent, view} = mouseEnterInfo;
            $(el).removeClass('event-mouseenter');
            $(el).addClass('event-mouseleave');
        },
        select: function (selectionInfo) {
            removeEventModalHeaderAndButtons();
            clearEventModalFormFields();
            setDefaultInputBorderColor($('#create-or-update-event-form'));
            createSelectionInfoHiddenBox(selectionInfo);
            createEventPriceBoxElements(this, selectionInfo.startStr, selectionInfo.endStr);
            createEventModalAddEventHeaderAndButtons();
            $('.create-or-update-event-modal').modal('toggle');
        },
        eventClick: function (eventInfo) {
            const {start, end} = eventInfo.event;
            removeEventModalHeaderAndButtons();
            createEventModalUpdateEventButtons();
            createEventPriceBoxElements(this, start, end);
            displayEventModalInUpdateMode(eventInfo);
        },
        eventDrop: function (eventDropInfo) {
            // console.log(eventDropInfo);
            updateEventStartAndEndDates(eventDropInfo);
        },
        eventResize: function (eventResizeInfo) {
            const {event:{endStr, startStr}} = eventResizeInfo;
            const selectedDays = calculateNumberOfSelectedDays(startStr, endStr);
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

function createPropertyInfoBox(property, propertyIdentifier){
    const {propertyId} = property;
    return $(`<div class="property-info-box ${propertyIdentifier}" data-property-id="${propertyId}"></div>`);
}

function createPropertyDetailsEl(propertyIdentifier, property) {
    const
        {
            propertyId,
            isAvailable,
            propertyAddress,
            propertyDescription,
            propertyName,
            propertyType,
            rateType,
            price
        } = property;
    const {descriptionText} = propertyDescription;
    const {propertyTypeName} = propertyType;
    const {location, country: {countryName}, postalCode, province, region, street} = propertyAddress;
    const {rateTypeId, rateTypeName} = rateType
    const {priceId, amount, currency} = price
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
                <tr><th>Price: </th><td><input type="text" class="details-price" value="${amount} ${currency}" readonly/></td></tr>
                <tr><th>Rate: </th><td><input type="text" class="details-rate-type-name" value="${rateTypeName}" readonly/></td></tr>
                <tr><th>Country: </th><td><input type="text" class="details-property-country-name" value="${countryName}" readonly/></td></tr>
                <tr><th>Location: </th><td><input type="text" class="details-property-location" value="${location}" readonly/></td></tr>
                <tr><th>Street: </th><td><input type="text" class="details-property-street" value="${street}" readonly/></td></tr>
                <tr><th>Postal code: </th><td><input type="text" class="details-property-postal-code" value="${postalCode}" readonly/></td></tr>
                <tr><th>Province: </th><td><input type="text" class="details-property-province" value="${province}" readonly/></td></tr>
                <tr><th>Region: </th><td><input type="text" class="details-property-region" value="${region}" readonly/></td></tr>
                <tr><th>Description: </th><td><textarea class="details-property-description" readonly>${descriptionText}</textarea></td></tr>
            </tbody>
        </table>`
    );
    detailsEl.append(propertyDetailsTableEl);
    detailsEl.on('click', removePropertyModalHeaderAndButtons).on('click', displayPropertyModalInUpdateMode);
    return detailsEl;
}

function createPropertyPhotoEl(propertyIdentifier, property) { //TODO empty photo format
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
            if ($(imgEl).hasClass('hidden')) {
                imgEl.removeClass('hidden');
            }
            const imgSrc = convertPropertyPhotoFileDataToBlob(fileData);
            imgEl.removeAttr('src');
            imgEl.attr('src', URL.createObjectURL(imgSrc)).attr('alt', fileName);
        }
    });
}

function getAllPropertyTypes() {
    const propertyTypeSelectEl = $('.cup-property-type');
    $.get('http://localhost:8080/api/property/get-all-property-types', function (propertyTypes) {
        $(propertyTypes).each(function (index, propertyType) {
            const {propertyTypeId, propertyTypeName} = propertyType;
            const selectOptionEl = $(`<option value="${propertyTypeId}" class="cup-property-type-option">${propertyTypeName}</option>`);
            propertyTypeSelectEl.append(selectOptionEl);
        });
    });
}

function getAllCountries() {
    const propertyCountrySelectEl = $('.cup-property-country');
    propertyCountrySelectEl.on('change', setCountryCurrencyCode);
    $.get('http://localhost:8080/api/property/get-all-countries', function (countries) {
        $(countries).each(function (index, country) {
            const {countryId, countryName, currencyCode} = country;
            const selectOptionEl = $(`<option value="${countryId}" class="cup-property-country-option">${countryName}</option>`);
            selectOptionEl.data('data-currency-code', currencyCode);
            propertyCountrySelectEl.append(selectOptionEl);
        });
    });
}

function getAllRateTypes(){
    const rateTypesSelectElement = $('.cup-rate-type');
    $.get('http://localhost:8080/api/property/get-all-rate-types', function (rateTypes) {
        $(rateTypes).each(function (index, rateType) {
            const {rateTypeId, rateTypeName} = rateType;
            const selectOptionEl = $(`<option value="${rateTypeId}" class="cup-rate-type-option">${rateTypeName}</option>`);
            rateTypesSelectElement.append(selectOptionEl);
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

function saveEventToDatabase(e) {
    e.preventDefault();
    if (validateEventAndPropertyFormsInputs($('#create-or-update-event-form'))) {
        $('.create-or-update-event-modal').modal('toggle');

        const customer = new Customer();
        customer.customerID = null;
        customer.customerName = $('input.cue-event-customer-name').val();
        customer.customerSurname = $('input.cue-event-customer-surname').val();
        customer.customerPhone = $('input.cue-event-customer-phone').val();
        customer.customerEmail = $('input.cue-event-customer-email').val();

        const event = new Event();
        event.id = null;
        event.title = $('input.cue-event-title').val();
        event.start = $('.selection-info-event-start').val();
        event.end = $('.selection-info-event-end').val();
        event.propertyCalendar = {
            propertyCalendarId: $('.selection-info-current-calendar').val(),
        };
        event.additionalInfo = $('textarea.cue-event-additional-info').val();
        event.customer = customer;
        event.numberOfGuests = $('.cue-number-of-guests-input').val();
        event.discountSurcharge = $('.cue-discount-surcharge-input').val();
        event.price = {
            priceId : null,
            amount: $('.cue-amount-due-amount').val(),
            currency: $('.cue-amount-due-currency').val(),
        }

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
                    const {propertyCalendarId} = event.propertyCalendar;
                    const calendar = getCalendarByDataPropertyCalendarIdAttribute(propertyCalendarId);
                    calendar.refetchEvents();
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

function displayEventModalInUpdateMode(eventInfo) {
    setDefaultInputBorderColor($('#create-or-update-event-form'));
    currentEvent = eventInfo.event;
    const title = eventInfo.event.title;
    const {
        additionalInfo,
        customer : {customerName, customerSurname, customerPhone, customerEmail},
        discountSurcharge,
        numberOfGuests,
        price : {priceId, amount, currency}
    } = eventInfo.event.extendedProps;

    $('input.cue-event-title').val(title);
    $('input.cue-event-customer-name').val(customerName);
    $('input.cue-event-customer-surname').val(customerSurname);
    $('input.cue-event-customer-phone').val(customerPhone);
    $('input.cue-event-customer-email').val(customerEmail);
    $('textarea.cue-event-additional-info').val(additionalInfo);

    $('.cue-number-of-guests-input').val(numberOfGuests);
    $('.cue-discount-surcharge-input').val(discountSurcharge);
    $('.cue-amount-due-amount').val(amount);
    $('.cue-amount-due-currency').val(currency);

    $('.create-or-update-event-modal').modal('toggle');
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
        customer: currentEvent.extendedProps.customer,
        discountSurcharge: currentEvent.extendedProps.discountSurcharge,
        numberOfGuests: currentEvent.extendedProps.numberOfGuests,
        price: currentEvent.extendedProps.price
    };
}

function updateEventDataInDatabase(e) {
    e.preventDefault();
    if (validateEventAndPropertyFormsInputs($('#create-or-update-event-form'))) {
        const currentEventData = getCurrentEventData();
        const {customerId} = currentEventData.customer;
        const {propertyCalendarId} = currentEventData.calendar;
        const {priceId} = currentEventData.price;

        const customer = new Customer();
        customer.customerId = customerId;
        customer.customerName = $('input.cue-event-customer-name').val();
        customer.customerSurname = $('input.cue-event-customer-surname').val();
        customer.customerPhone = $('input.cue-event-customer-phone').val();
        customer.customerEmail = $('input.cue-event-customer-email').val();

        const event = new Event();
        event.id = currentEventData.id;
        event.title = $('input.cue-event-title').val();
        event.start = currentEventData.start;
        event.end = currentEventData.end;
        event.propertyCalendar = {
            propertyCalendarId: propertyCalendarId
        };
        event.additionalInfo = $('textarea.cue-event-additional-info').val();
        event.customer = customer;
        event.numberOfGuests = $('.cue-number-of-guests-input').val();
        event.discountSurcharge = $('.cue-discount-surcharge-input').val();
        event.price = {
            priceId: priceId,
            amount: $('.cue-amount-due-amount').val(),
            currency: $('.cue-amount-due-currency').val(),
        };

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
                calendar.refetchEvents();
            },
            dataType: 'json',
            error: function (data) { //TODO
                console.log(data);
            }
        });
        $('.create-or-update-event-modal').modal('toggle');
    }
}

function deleteEventFromPropertyCalendar() { //TODO
    const currentEventData = getCurrentEventData();
    const currentEventId = currentEventData.id;
    $('.create-or-update-event-modal').modal('toggle');
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:8080/api/event/delete-event-from-property-calendar/${currentEventId}`,
        success: function (response) {
            currentEvent.remove();
        },
        error: function (data) { //TODO
            console.log(data);
        }
    });
}

function displayPropertyModalInUpdateMode() {
    setDefaultInputBorderColor('#create-or-update-property-form');
    createPropertyModalUpdatePropertyButtons();

    const currentPropertyTypeName = $(this).children('table').find('input.details-property-type-name').val();
    const currentCountryName = $(this).children('table').find('input.details-property-country-name').val();
    const currentRateTypeName = $(this).children('table').find('input.details-rate-type-name').val();
    const currentPrice = $(this).children('table').find('input.details-price').val();
    const amount = currentPrice.split(' ')[0];
    const currencyCode = currentPrice.split(' ')[1];

    $('input.cup-property-id').val($(this).children('table').find('input.details-property-id').val());
    $('input.cup-property-user-id').val($(this).children('table').find('input.details-user-id').val());
    $('input.cup-property-name').val($(this).children('table').find('input.details-property-name').val());
    $('input.cup-property-location').val($(this).children('table').find('input.details-property-location').val());
    $('input.cup-property-street').val($(this).children('table').find('input.details-property-street').val());
    $('input.cup-property-postal-code').val($(this).children('table').find('input.details-property-postal-code').val());
    $('input.cup-property-province').val($(this).children('table').find('input.details-property-province').val());
    $('input.cup-property-region').val($(this).children('table').find('input.details-property-region').val());
    $('textarea.cup-property-description').val($(this).children('table').find('textarea.details-property-description').val());
    $('input.cup-price-amount').val(amount);
    $('input.cup-price-currency').val(currencyCode);
    
    if ($(this).children('table').find('input.details-property-isAvailable').val() === 'Yes') {
        $('input.cup-is-available.true').prop('checked', true);
    } else {
        $('input.cup-is-available.false').prop('checked', true);
    }
    $('option.cup-property-type-option').each(function (index, option) {
        if (currentPropertyTypeName === $(option).text()) {
            $(option).attr('selected', 'selected');
        }
    });
    $('option.cup-rate-type-option').each(function (index, option) {
        if (currentRateTypeName === $(option).text()) {
            $(option).attr('selected', 'selected');
        }
    });
    $('option.cup-property-country-option').each(function (index, option) {
        if (currentCountryName === $(option).text()) {
            $(option).attr('selected', 'selected');
        }
    });

    $('.create-or-update-property-modal').modal('toggle');
}

function createOrUpdatePropertyInDatabase(e) {
    e.preventDefault();

    if (validateEventAndPropertyFormsInputs($('#create-or-update-property-form'))){
        $('.create-or-update-property-modal').modal('toggle');
        const propertyForm = {
            propertyId: $('input.cup-property-id').val(),
            userId: $('input[type=hidden].user-id').val(),
            propertyName: $('input.cup-property-name').val(),
            isAvailable: $('input.cup-is-available:checked').val(),
            propertyTypeId: $('select.cup-property-type').val(),
            rateTypeId: $('select.cup-rate-type').val(),
            countryId: $('select.cup-property-country').val(),
            location: $('input.cup-property-location').val(),
            street: $('input.cup-property-street').val(),
            postalCode: $('input.cup-property-postal-code').val(),
            province: $('input.cup-property-province').val(),
            region: $('input.cup-property-region').val(),
            propertyDescription: $('textarea.cup-property-description').val(),
            amount: $('input.cup-price-amount').val(),
            currency: $('input.cup-price-currency').val(),
        }

        let type;
        let url;

        if (propertyForm.propertyId.length < 1) {
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
                if (propertyForm.propertyId.length < 1) {
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
                        propertyAddress: {location, country: {countryName}, postalCode, province, region, street},
                        propertyDescription: {descriptionText},
                        propertyId,
                        propertyName,
                        propertyType: {propertyTypeName},
                        rateType: {rateTypeName},
                        price : {priceId, amount, currency}
                    } = property;

                    $('.property-name-tab').each(function (index, nameTab) {
                        if (parseInt($(nameTab).attr('data-property-id')) === propertyId) {
                            $(nameTab).find('h3').text(propertyName);
                        }
                    });
                    $('.property-details-el').each(function (index, detailsElement) {
                        if (parseInt($(detailsElement).attr('data-property-id')) === propertyId) {
                            $(detailsElement).find('input.details-property-isAvailable').val((isAvailable) ? 'Yes' : 'No');
                            $(detailsElement).find('input.details-property-type-name').val(propertyTypeName);
                            $(detailsElement).find('input.details-rate-type-name').val(rateTypeName);
                            $(detailsElement).find('input.details-price').val(amount + ' ' + currency);
                            $(detailsElement).find('input.details-property-country-name').val(countryName);
                            $(detailsElement).find('input.details-property-location').val(location);
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
}

function setPropertyIsEnabledToFalse() {
    const propertyId = $('input[type=hidden].cup-property-id').val();

    $.post(`http://localhost:8080/api/property/set-property-is-enabled-to-false`,{
        propertyId: propertyId
    },
    function (response) {
        if (response) {
            const propertyNameTabs = $('.property-name-tab');
            const propertyCards = $('.property-card');
            propertyNameTabs.each(function (index, nameTab) {
                if ($(nameTab).attr('data-property-id') === propertyId) {
                    $(nameTab).remove();
                }
            });
            propertyCards.each(function (index, propertyCard) {
                if ($(propertyCard).attr('data-property-id') === propertyId) {
                    $(propertyCard).remove();
                }
            });
            propertyNameTabs.first().addClass('property-name-tab-selected');
            propertyCards.first().removeClass('hidden');
            renderPropertyCalendar();
            $('.create-or-update-property-modal').modal('toggle');
        } else {
            console.log(response);
        }
    });
}

function clearEventModalFormFields() {
    $('#create-or-update-event-form').find('input[type=text], textarea').each(function (index, input) {
        $(input).val("");
    });
}

function clearPropertyModalFormFields() {
    $('#create-or-update-property-form')
        .find('input[type=hidden].cup-property-id, input[type=text], textarea')
        .each(function (index, input) {
            $(input).val("");
        })
        .end()
        .find('input.cup-is-available.true')
        .prop('checked', true)
        .end()
        .find('select')
        .each(function (index, select) {
            $(select).val(0);
        });
}

function validateEventAndPropertyFormsInputs(form) { //todo check if validation works properly
    const INPUT_REGEX = /^.{1,25}$/;
    const TEXTAREA_REGEX = /^.{1,250}$/;
    let isInputValid = true;

    $(form)
        .find('input:not([type=hidden]), textarea, select')
        .each(function (index, input) {
            if ($(input).prop('tagName') === 'INPUT' && !INPUT_REGEX.test($(input).val())) {
                $(input).addClass('input-field-error');
                $(input).removeClass('input-field-correct');
                isInputValid = false;
            }
            if ($(input).prop('tagName') === 'INPUT' && INPUT_REGEX.test($(input).val())) {
                $(input).removeClass('input-field-error');
                $(input).addClass('input-field-correct');
            }
            if ($(input).prop('tagName') === 'TEXTAREA' && !TEXTAREA_REGEX.test($(input).val())) {
                $(input).addClass('input-field-error');
                $(input).removeClass('input-field-correct');
                isInputValid = false;
            }
            if ($(input).prop('tagName') === 'TEXTAREA' && TEXTAREA_REGEX.test($(input).val())) {
                $(input).removeClass('input-field-error');
                $(input).addClass('input-field-correct');
            }
            if ($(input).prop('tagName') === 'SELECT' && parseInt($(input).val(), 10) === 0){
                $(input).addClass('input-field-error');
                $(input).removeClass('input-field-correct');
                isInputValid = false;
            }
            if ($(input).prop('tagName') === 'SELECT' && parseInt($(input).val(), 10) > 0){
                $(input).removeClass('input-field-error');
                $(input).addClass('input-field-correct');
            }
        });
    return isInputValid;
}

function setDefaultInputBorderColor(form) {
    $(form)
        .find('input:not([type=hidden]), textarea, select')
        .each(function (index, input) {
            $(input).removeClass('input-field-error');
            $(input).removeClass('input-field-correct');
        });
}

function displayDeleteConfirmationButtons(){
    $(this).addClass('hidden');
    $(this).siblings('button.yes-btn').removeClass('hidden');
    $(this).siblings('button.no-btn').removeClass('hidden').on("click", hideDeleteConfirmationButtons);
}

function hideDeleteConfirmationButtons(){
    $(this).siblings('button.delete-btn').removeClass('hidden');
    $(this).siblings('button.yes-btn').addClass('hidden');
    $(this).siblings('button.no-btn').addClass('hidden');
    $(this).addClass('hidden');
}

function setCountryCurrencyCode(){
    $('.cup-price-currency').val($('.cup-property-country option:selected').data('dataCurrencyCode'));
}

function calculateNumberOfSelectedDays(startDate, endDate){
    const startDateTime = new Date(startDate).getTime();
    const endDateTime =  new Date(endDate).getTime();
    const timeDifference = endDateTime - startDateTime;
    return timeDifference / (1000 * 60 * 60 * 24);
}

function createEventPriceBoxElements(thisCalendar, startStr, endStr){
    const selectedDays = calculateNumberOfSelectedDays(startStr, endStr);
    const priceAmount = $(thisCalendar.el).closest('.property-card').find('.details-price').val().split(' ')[0];
    const priceCurrency = $(thisCalendar.el).closest('.property-card').find('.details-price').val().split(' ')[1];
    const rateType = $(thisCalendar.el).closest('.property-card').find('.details-rate-type-name').val();
    const eventPriceBoxEl = $(`
        <div class="event-price-box">
            <input type="hidden" value="${priceAmount * selectedDays}" class="cue-price-amount-base-hidden"/>
            <input type="hidden" value="${rateType}" class="cue-rate-type-hidden"/>
            <label class="cue-number-of-guests-label">Number of guests:
                <input type="number" step="1" min="1" name="numberOfGuests" class="cue-number-of-guests-input"/>
            </label>
            <label class="cue-discount-surcharge-label">Discount/Surcharge (%):
                <input type="number" step="0.5"  name="discountSurcharge" class="cue-discount-surcharge-input"/>
            </label>
            <label>Amount due:
                <input type="number" name="amountDueAmount" class="cue-amount-due-amount" readonly/>
                <input type="text" name="amountDueCurrency" class="cue-amount-due-currency" readonly/>
            </label>
        </div>
    `);
    eventPriceBoxEl.find('.cue-number-of-guests-input')
        .val(1)
        .on('change', calculateAndUpdateAmountDue);
    eventPriceBoxEl.find('.cue-discount-surcharge-input')
        .val(0)
        .on('change', calculateAndUpdateAmountDue);
    eventPriceBoxEl.find('.cue-amount-due-amount').val(priceAmount * selectedDays);
    eventPriceBoxEl.find('.cue-amount-due-currency').val(priceCurrency);
    $('.event-price-box').remove();
    $('.event-details-box').append(eventPriceBoxEl);
}

function calculateAndUpdateAmountDue(){
    const discountSurchargeEl = $('.cue-discount-surcharge-input');
    const priceAmountBase = $('.cue-price-amount-base-hidden').val();
    const rateType = $('.cue-rate-type-hidden').val();
    const numberOfGuests = $('.cue-number-of-guests-input').val();
    const discountSurchargeAmount = (priceAmountBase/100) * discountSurchargeEl.val();

    if(parseFloat(discountSurchargeEl.val()) > 0) {
        discountSurchargeEl.removeClass('text-success');
        discountSurchargeEl.addClass('text-danger');
    } else if (parseFloat(discountSurchargeEl.val()) < 0){
        discountSurchargeEl.removeClass('text-danger');
        discountSurchargeEl.addClass('text-success');
    } else {
        discountSurchargeEl.removeClass('text-success');
        discountSurchargeEl.removeClass('text-danger');
    }

    if (rateType.toString() === 'Per night'){
        $('.cue-amount-due-amount').val(parseInt(priceAmountBase) + discountSurchargeAmount);
    }
    else if (rateType.toString() === 'Per person per night'){
        $('.cue-amount-due-amount').val(parseInt(priceAmountBase) * parseInt(numberOfGuests) + discountSurchargeAmount);
    }
}

function createSelectionInfoHiddenBox(selectionInfo){
    $('.selection-info-hidden-box').remove();
    const currentCalendarId = selectionInfo.view.calendar.el.getAttribute('data-property-calendar-id');
    const selectionInfoHiddenBox = $(`
        <div class="selection-info-hidden-box hidden">
            <input type="hidden" value="${selectionInfo.startStr}" class="selection-info-event-start"/>
            <input type="hidden" value="${selectionInfo.endStr}" class="selection-info-event-end"/>
            <input type="hidden" value="${currentCalendarId}" class="selection-info-current-calendar"/>
        </div>
    `);
    $('.event-details-box').prepend(selectionInfoHiddenBox);
}

function createEventModalUpdateEventButtons(){
    const cueEventModalHeader = $('.cue-modal-header');
    const cueEventModalFooter = $('.cue-modal-footer');
    const deleteEventBtnGroup = $(`
        <div class="delete-event-btn-group">
            <button type="submit" class="btn btn-danger btn-block delete-event-btn delete-btn">Cancel event</button>
            <button type="button" class="btn btn-danger event yes-btn hidden">Yes</button>
            <button type="button" class="btn btn-success no-btn hidden">No</button>
        </div>  
    `);
    const saveEventChangesBtn = $(`
        <button type="submit" class="btn btn-primary btn-block cue-save-event-changes-btn">Save changes</button>
    `);
    deleteEventBtnGroup
        .find('.delete-event-btn').on('click', displayDeleteConfirmationButtons)
        .end()
        .find('.yes-btn').on('click', deleteEventFromPropertyCalendar)
        .end()
        .find('.no-btn').on('click', displayDeleteConfirmationButtons)
    ;
    saveEventChangesBtn.on('click', updateEventDataInDatabase);
    cueEventModalHeader.append(deleteEventBtnGroup);
    cueEventModalFooter.append(saveEventChangesBtn);
}

function removeEventModalHeaderAndButtons(){
    $('.delete-event-btn-group').remove();
    $('.cue-save-event-changes-btn').remove();
    $('.cue-add-event-btn').remove();
    $('.add-event-header-text').remove();
}

function createEventModalAddEventHeaderAndButtons(){
    const cueEventModalHeader = $('.cue-modal-header');
    const cueEventModalFooter = $('.cue-modal-footer');
    const addEventH4El= $(
        `<h4 class="add-event-header-text">Please specify event details</h4>`
    );
    const addEventBtn = $(`
        <button type="submit" class="btn btn-primary btn-block cue-add-event-btn">Add event</button>
    `);
    cueEventModalHeader.append(addEventH4El);
    addEventBtn.on('click', saveEventToDatabase);
    cueEventModalFooter.append(addEventBtn);
}

function createPropertyModalAddPropertyHeaderAndButtons(){
    const cupPropertyModalHeader = $('.cup-modal-header');
    const cupPropertyModalFooter = $('.cup-modal-footer');
    const addEventH4El= $(`
        <h4 class="create-property-header-txt">Please specify property details</h4>
    `);
    const createPropertyBtn = $(`
        <button type="submit" class="btn btn-primary btn-block cup-create-property-btn">Create property</button>
    `);
    cupPropertyModalHeader.append(addEventH4El);
    createPropertyBtn.on('click', createOrUpdatePropertyInDatabase);
    cupPropertyModalFooter.append(createPropertyBtn);
}

function createPropertyModalUpdatePropertyButtons(){
    const cuePropertyModalHeader = $('.cup-modal-header');
    const cuePropertyModalFooter = $('.cup-modal-footer');
    const deletePropertyBtnGroup = $(`
        <div class="delete-property-btn-group">
            <button type="submit" class="btn btn-danger btn-block delete-property-btn delete-btn">Delete property</button>
            <button type="button" class="btn btn-danger property yes-btn hidden">Yes</button>
            <button type="button" class="btn btn-success no-btn hidden">No</button>
        </div>  
    `);
    const updatePropertyBtn = $(`
        <button type="submit" class="btn btn-primary btn-block cup-save-changes-btn">Save changes</button>
    `);
    deletePropertyBtnGroup
        .find('.delete-property-btn').on('click', displayDeleteConfirmationButtons)
        .end()
        .find('.yes-btn').on('click', setPropertyIsEnabledToFalse)
        .end()
        .find('.no-btn').on('click', displayDeleteConfirmationButtons)
    ;
    updatePropertyBtn.on('click', createOrUpdatePropertyInDatabase);
    cuePropertyModalHeader.append(deletePropertyBtnGroup);
    cuePropertyModalFooter.append(updatePropertyBtn);
}

function removePropertyModalHeaderAndButtons(){
    $('.delete-property-btn-group').remove();
    $('.cup-save-changes-btn').remove();
    $('.cup-create-property-btn').remove();
    $('.create-property-header-txt').remove();
}

///////////////////////// CODE THAT 50% OF THE TIME WORKS EVERY TIME //////////////////////////////////////




// document.addEventListener('click', function () {
//     console.log();
// });

// document.addEventListener('contextmenu', function () {
//     console.log();
// });












