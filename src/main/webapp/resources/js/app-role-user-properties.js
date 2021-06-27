const propertiesContainer = $('.properties-container');
let propertyNameElementArray = [];
let propertyCardElementArray = [];
let propertyDetailsElementArray = [];
let propertyPhotoElementArray = [];

document.addEventListener("contextmenu", function () {
    console.log('propertyDivsArray => ')
    console.log()
    console.log('---------------------------------------------------------')
    console.log('propertyDivsArray =>')
    console.log()
});


function getAllPropertiesByUserId() {
    const userId = $('input[type=hidden]').val();
    let propertyCounter = 0;
    $.get(`http://localhost:8080/api/property/user-properties/${userId}`, function (properties) {

        properties.forEach((property => {
            const {
                id,
                isAvailable,
                propertyAddress,
                propertyDescription,    //todo
                propertyName,
                propertyPhoto,
                propertyRooms,          //todo
                propertyType,
                user
            } = property
            console.log(propertyDescription);
            const {city, country, postalCode, province, region, street} = propertyAddress;
            const {descriptionText} = propertyDescription;
            const {fileData, fileName, fileType} = propertyPhoto;
            const {propertyTypeName} = propertyType;
            const {contactNumber, email, username} = user;
            let propertyIdentifier = `property-${propertyCounter}`;

            createPropertyNameTabElement(propertyCounter, propertyIdentifier, propertyName);
            createPropertyCardElement(propertyCounter, propertyIdentifier);
            createPropertyDetailsElement(propertyCounter, propertyIdentifier);
            createPropertyPhotoElement(propertyCounter, propertyIdentifier, propertyPhoto.id, fileData, fileName);
            createPropertyDetailsTableElement(propertyCounter, propertyIdentifier, isAvailable, propertyTypeName, propertyAddress.id, city, country, postalCode, province, region, street );
            createPropertyDescriptionElement(propertyCounter, propertyIdentifier, propertyDescription.id, descriptionText);

            propertyCounter++
        }))
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
    propertyCardElementArray.forEach(card => {
        $(card).hasClass(`${$(this.classList)[1]}`) ? $(card).removeClass('hidden').toggle().fadeIn(300) : $(card).addClass('hidden').toggle().fadeOut(300);
    });
}

function createPropertyNameTabElement(propertyCounter, propertyIdentifier, propertyName) {
    const nameTabContainer = $('.property-name-tab-container');
    const nameTabElement = $('<div class="property-name-tab"></div>');
    const nameTextElement = $('<h3 style="margin-top: 0px"></h3>').text(propertyName);
    nameTabElement.addClass(propertyIdentifier);
    nameTabElement.on('click', displayPropertyCard);
    nameTabContainer.append(nameTabElement.append(nameTextElement));
    propertyNameElementArray.push(nameTabElement[0].context);
}

function createPropertyCardElement(propertyCounter, propertyIdentifier) {
    const cardContainer = $('.property-card-container');
    const cardElement = $('<div class="property-card"></div>');
    cardElement.addClass(propertyIdentifier);
    if (propertyCounter !== 0) {
        cardElement.addClass('hidden');
    }
    cardContainer.prepend(cardElement);
    propertyCardElementArray.push($(cardElement[0]).context);
}

function createPropertyDetailsElement(propertyCounter, propertyIdentifier){
    const cardElement = $(propertyCardElementArray[propertyCounter]);
    const detailsElement = $('<div class="property-details"></div>');
    detailsElement.addClass(propertyIdentifier);
    cardElement.append(detailsElement);
    propertyDetailsElementArray.push($(detailsElement[0]).context);
}

function createPropertyPhotoElement(propertyCounter, propertyIdentifier, propertyPhotoId, fileData, fileName) {
    const detailsElement = $(propertyDetailsElementArray[propertyCounter]);
    const photoElement =  $('<div class="property-photo"></div>');
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
    imageElement.attr('data-photo-id',propertyPhotoId);
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////











