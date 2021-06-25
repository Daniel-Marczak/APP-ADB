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
            // console.log(property);

            const {
                id,
                isAvailable,
                propertyAddress,
                propertyDescription,
                propertyName,
                propertyPhoto,
                propertyRooms,
                propertyType,
                user
            } = property

            const {city, country, postalCode, province, region, street} = propertyAddress;
            const {description} = propertyDescription;
            const {fileData, fileName, fileType} = propertyPhoto;
            const {propertyTypeName} = propertyType;
            const {contactNumber, email, username} = user;

            let propertyIdentifier = `property-${propertyCounter}`;

            createPropertyNameTabElement(propertyCounter, propertyIdentifier, propertyName);
            createPropertyCardElement(propertyCounter, propertyIdentifier);
            createPropertyDetailsElement(propertyCounter, propertyIdentifier);
            createPropertyPhotoElement(propertyCounter, propertyIdentifier, fileData, fileName);


            // console.log(propertyCardElementArray);
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
    return new Blob([byteArray], {type: "image/jpg"})
}

function displayPropertyCard() {
    propertyCardElementArray.forEach(card => {
        $(card).hasClass(`${$(this.classList)[1]}`) ? $(card).removeClass('hidden').toggle().fadeIn(300) : $(card).addClass('hidden').toggle().fadeOut(300);
    });
}

function createPropertyNameTabElement(propertyCounter, propertyIdentifier, propertyName) {
    const propertyNameTabContainer = $('.property-name-tab-container');
    const propertyNameTabElement = $('<div class="property-name-tab"></div>');
    const propertyNameTextElement = $('<h3 style="margin-top: 0px"></h3>').text(propertyName);
    propertyNameTabElement.addClass(propertyIdentifier);
    propertyNameTabElement.on('click', displayPropertyCard);
    propertyNameTabContainer.append(propertyNameTabElement.append(propertyNameTextElement));
    propertyNameElementArray.push(propertyNameTabElement[0].context);
}

function createPropertyCardElement(propertyCounter, propertyIdentifier) {
    const propertyCardContainer = $('.property-card-container');
    const propertyCardElement = $('<div class="property-card"></div>');
    propertyCardElement.addClass(propertyIdentifier);
    if (propertyCounter !== 0) {
        propertyCardElement.addClass('hidden');
    }
    propertyCardContainer.prepend(propertyCardElement);
    propertyCardElementArray.push($(propertyCardElement[0]).context);
}

function createPropertyDetailsElement(propertyCounter, propertyIdentifier){
    const propertyCardElement = $(propertyCardElementArray[propertyCounter])
    const propertyDetailsElement = $('<div class="property-details"></div>');
    propertyDetailsElement.addClass(propertyIdentifier);
    propertyCardElement.append(propertyDetailsElement);
    propertyDetailsElementArray.push($(propertyDetailsElement[0]).context);
}

function createPropertyPhotoElement(propertyCounter, propertyIdentifier, fileData, fileName) {
    const propertyDetailsElement = $(propertyDetailsElementArray[propertyCounter]);
    const propertyPhotoElement = $('<img alt="" src="" class="property-photo">');
    const imgSrc = convertPropertyPhotoFileDataToBlob(fileData);
    propertyPhotoElement.attr('src', URL.createObjectURL(imgSrc)).attr('alt', fileName);
    propertyPhotoElement.addClass(propertyIdentifier);
    propertyDetailsElement.append(propertyPhotoElement);
    propertyPhotoElementArray.push($(propertyPhotoElement[0]));
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




function createPropertyAddressElement(propertyCounter,propertyIdentifier, propertyAddressId, city, country, postalCode, province, region, street) {
    const propertyDetailsElement = $(propertyDetailsElementArray[propertyCounter]);
}




function createPropertyDescriptionElement(propertyDescriptionId, propertyDescription) {

}

function createPropertyRoomsElement() {

}






