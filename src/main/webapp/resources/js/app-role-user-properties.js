function getAllPropertiesByUserId() {
    const userId = $('input[type=hidden]').val();
    return $.get(`http://localhost:8080/api/property/user-properties/${userId}`, function (data) {
        console.log("data ===>", data);
        creatPropertyElement(data)
    });
}

getAllPropertiesByUserId();

function creatPropertyElement(data) {
    const propertiesContainer = $('.properties-container');

    $.each(data, function (index, property){
        let propertyDiv = $('<div class="property-div"></div>');
        let propertyNameDiv = $('<div class="property-name-div"></div>').text(property.propertyName);
        let propertyDetailsInput = $('<input type="text" class="property-name-div">').val(property.propertyName);
        propertiesContainer.append(propertyDiv.append(propertyNameDiv).append(propertyDetailsInput));
    });
}

