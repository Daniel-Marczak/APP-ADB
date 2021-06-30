const propertiesContainer = $('.properties-container');
let propertyNameElementArray = [];
let propertyCardElementArray = [];
let propertyDetailsElementArray = [];
let propertyPhotoElementArray = [];
let propertyCalendarArray = [];

//ADD CALENDAR EVENT VARIABLES
const eventModal = $('.add-booking-modal');
const addBookingBtn = $('.add-booking-btn');
addBookingBtn.on('click', addBooking);

let currentCalendar;
let selectionInfoEventStart;
let selectionInfoEventEnd;


//FUNCTIONS

function getAllPropertiesByUserId() {
    const userId = $('input[type=hidden]').val();
    let propertyCounter = 0;
    $.get(`http://localhost:8080/api/property/user-properties/${userId}`, function (properties) {

        properties.forEach((property => {
            const {
                id,
                isAvailable,
                propertyAddress,
                propertyDescription,
                propertyName,
                propertyPhoto,
                propertyRooms,          //todo
                propertyType,
                user
            } = property

            const {city, country, postalCode, province, region, street} = propertyAddress;
            const {descriptionText} = propertyDescription;
            const {fileData, fileName, fileType} = propertyPhoto;
            const {propertyTypeName} = propertyType;
            const {contactNumber, email, username} = user;
            let propertyIdentifier = `property-${propertyCounter}`;
            let calendarIdentifier = `calendar-${propertyCounter}`;

            createPropertyNameTabElement(propertyCounter, propertyIdentifier, propertyName);
            createPropertyCardElement(propertyCounter, propertyIdentifier);
            createFullCalendarElement(propertyCounter, propertyIdentifier, calendarIdentifier);
            createPropertyDetailsElement(propertyCounter, propertyIdentifier);
            createPropertyPhotoElement(propertyCounter, propertyIdentifier, propertyPhoto.id, fileData, fileName);
            createPropertyDetailsTableElement(propertyCounter, propertyIdentifier, isAvailable, propertyTypeName, propertyAddress.id, city, country, postalCode, province, region, street);
            createPropertyDescriptionElement(propertyCounter, propertyIdentifier, propertyDescription.id, descriptionText);

            propertyCounter++
        }));
        for (let i = 1; i < propertyCardElementArray.length; i++) {     //The calendar element has to be rendered inside a property card
            $(propertyCardElementArray[i]).addClass('hidden')           //before adding the 'hidden' class to the property card.
        }                                                               //Adding the 'hidden' class to a property card before rendering
    });                                                                 //of the calendar element causes rendering problems.

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
    propertyCardElementArray.forEach(card => {
        $(card).hasClass(`${$(this.classList)[1]}`) ? $(card).removeClass('hidden').toggle().fadeIn(300) : $(card).addClass('hidden').toggle().fadeOut(300);
    });
}

function createPropertyNameTabElement(propertyCounter, propertyIdentifier, propertyName) {
    const nameTabContainer = $('.property-name-tab-container');
    const nameTabElement = $(`<div class="property-name-tab" data-property-id=${propertyIdentifier}></div>`);
    const nameTextElement = $('<h3 style="margin-top: 0px"></h3>').text(propertyName);
    nameTabElement.addClass(propertyIdentifier);
    nameTabElement.on('click', displayPropertyCard).on('click', setCurrentCalendar);
    nameTabContainer.append(nameTabElement.append(nameTextElement));
    propertyNameElementArray.push(nameTabElement[0].context);
}

function createPropertyCardElement(propertyCounter, propertyIdentifier) {
    const cardContainer = $('.property-card-container');
    const cardElement = $('<div class="property-card"></div>');
    cardElement.addClass(propertyIdentifier);
    cardContainer.prepend(cardElement);
    propertyCardElementArray.push($(cardElement[0]).context);
}

function createPropertyDetailsElement(propertyCounter, propertyIdentifier) {
    const cardElement = $(propertyCardElementArray[propertyCounter]);
    const detailsElement = $('<div class="property-details"></div>');
    detailsElement.addClass(propertyIdentifier);
    cardElement.append(detailsElement);
    propertyDetailsElementArray.push($(detailsElement[0]).context);
}

function createPropertyPhotoElement(propertyCounter, propertyIdentifier, propertyPhotoId, fileData, fileName) {
    const detailsElement = $(propertyDetailsElementArray[propertyCounter]);
    const photoElement = $('<div class="property-photo"></div>');
    const imageElement = $('<img alt="" src="" class="property-image">');
    const imgSrc = convertPropertyPhotoFileDataToBlob(fileData);
    const currentPhotoId = $(this).attr('data-photo-id');
    const changeImageElement = $(
        `<form method="POST" class="upload-photo" action="<c:url value='/api/property/test'/>" enctype="multipart/form-data">
            <input type="hidden" name="propertyPhotoId" value="${currentPhotoId}"/> 
            <label>Select a file to upload
                <input type="file" name="file" class="hidden"/>
            </label>
<!--            <input type="submit" value="Submit" />-->
        </form>`
    );
    imageElement.attr('src', URL.createObjectURL(imgSrc)).attr('alt', fileName);
    imageElement.attr('data-photo-id', propertyPhotoId);
    imageElement.addClass(propertyIdentifier);
    detailsElement.append(photoElement.append(changeImageElement).append(imageElement));
    propertyPhotoElementArray.push($(photoElement[0]));
}

function createPropertyDetailsTableElement(propertyCounter, propertyIdentifier, isAvailable, propertyTypeName, propertyAddressId, city, country, postalCode, province, region, street) {
    const detailsElement = $(propertyDetailsElementArray[propertyCounter]);
    const addressElement = $('<div class="property-details">');
    let isAvailableToString = (isAvailable) ? 'Yes' : 'No';
    const addressDetailsTableElement = $(
        `<table class="address-details">
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

function createPropertyDescriptionElement(propertyCounter, propertyIdentifier, propertyDescriptionId, descriptionText) {
    const detailsElement = $(propertyDetailsElementArray[propertyCounter]);
    const descriptionElement = $('<div class="property-description">');
    const descriptionTextElement = $(
        `<table class="description-table">
            <tbody>
                <tr><th>Description</th></tr>
                <tr><td><textarea class="description-text">${descriptionText}</textarea></td></tr>
            </tbody>
        </table>`
    );
    detailsElement.append(descriptionElement.append(descriptionTextElement));
}

function createFullCalendarElement(propertyCounter, propertyIdentifier, calendarIdentifier) {
    const propertyCard = $(propertyCardElementArray[propertyCounter]);
    const calendarElement = $(`<div id='${calendarIdentifier}' data-property-id='${propertyIdentifier}' class='${calendarIdentifier}'></div>`);
    propertyCard.append(calendarElement);

    let calendar = new FullCalendar.Calendar(document.querySelector(`.${calendarIdentifier}`), {
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
        displayEventTime : false,
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
                    booking: {
                        id: '',
                        customer: {
                            name: '',
                            surname: '',
                            phone: '',
                        },
                        additionalInfo: '',
                    }
                },
            }
        ],
        select: function (selectionInfo) {
            // ADD EVENT MODAL DISPLAY TOGGLE
            eventModal.modal('toggle');
            //SET EVENT START & END VALUES
            selectionInfoEventStart = selectionInfo.start;
            selectionInfoEventEnd = selectionInfo.end;
        },
        eventClick: function (info) {
          console.log(info.event);
        }
    });
    if (propertyCounter === 0){
        currentCalendar = calendar;
    }
    propertyCalendarArray.push(calendar);
    calendar.render();
}


///////////////////////// THINGS THAT 50% OF THE TIME WORK EVERY TIME A.K.A TESTS //////////////////////////////////////

function addBooking() {
    const calendar = currentCalendar;

    class Event {
        constructor(id, title, start, end, bookingId, customerName, customerSurname, customerPhone, additionalInfo) {
            this.id = id;
            this.title = title;
            this.start = start;
            this.end = end;
            this.booking = {
                id: bookingId,
                customer: {
                    name: customerName,
                    surname: customerSurname,
                    phone: customerPhone,
                },
                additionalInfo: additionalInfo
            }
        }
    }

    const eventId = '1' //save to db and retrieve the id
    const eventTitle = $('.add-event-booking-tittle').val();
    const eventBookingId = 'event booking id' //save to db and retrieve the id
    const eventBookingCustomerName = $('.add-event-customer-name').val();
    const eventBookingCustomerSurname = $('.add-event-customer-surname').val();
    const eventBookingCustomerPhone = $('.add-event-customer-phone').val();
    const eventBookingAdditionalInfo = $('.add-event-additional-info').val();

    let event = new Event(
        eventId,
        eventTitle,
        selectionInfoEventStart,
        selectionInfoEventEnd,
        eventBookingId,
        eventBookingCustomerName,
        eventBookingCustomerSurname,
        eventBookingCustomerPhone,
        eventBookingAdditionalInfo
    );
    eventModal.modal('toggle');
    calendar.addEvent(event);
}

function setCurrentCalendar(){
    let nameTabPropertyDataId = this.getAttribute('data-property-id');
    propertyCalendarArray.forEach(calendar => {
        const calendarDataPropertyId = calendar.el.getAttribute('data-property-id');
        if (nameTabPropertyDataId === calendarDataPropertyId){
            currentCalendar = calendar;
        }
    });
}


document.addEventListener('click', function (){
    console.log(propertyCalendarArray[0]);
})















