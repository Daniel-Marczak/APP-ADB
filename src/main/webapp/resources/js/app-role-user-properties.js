function getAllPropertiesByUserId() {
    const userId = $('input[type=hidden]').val();
    return $.get(`http://localhost:8080/api/property/user-properties/${userId}`, function (properties, status) {

        console.log(status);

        properties.forEach((property => {

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

            const propertiesContainer = $('.properties-container');
            const propertyDiv = $('<div class="property-div"></div>');
            const propertyNameDiv = $('<div class="property-name-div"></div>');
            const propertyNameSpan = $('<div class="property-name-span"></div>').text(propertyName);
            const propertyNoPhotoDiv = $('<div class="property-no-photo-div">');
            const propertyPhotoImg =  $('<img alt="" src="" class="property-photo-img">');

            const byteCharacters = atob(fileData);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], {type: "image/jpg"});
            propertyPhotoImg.attr('src', URL.createObjectURL(blob)).attr('alt', fileName);

            propertiesContainer.append(propertyDiv.append(propertyNameDiv.append(propertyNameSpan)).append(propertyPhotoImg));

        }))
    });
}

getAllPropertiesByUserId();





