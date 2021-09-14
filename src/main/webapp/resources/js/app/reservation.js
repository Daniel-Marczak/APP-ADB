$(document).ready(function () {

    $.get('http://localhost:8080/api/reservation/available-locations-names', function (locationsNames){
        locationsNames.forEach( locationName => {
            appendLocationItemSpan(locationName);
        });
        $('.location-input').on('change keyup', toggleLocationItemSpanDisplay);
    });

    function appendLocationItemSpan(locationName){
        const locationItemSpanBox = $('.location-item-span-box');
        const itemSpan = $(`
            <span class="location-item-span">
                <input type="hidden" value="${locationName}" class="location-name">
                <span class="match-span"></span>
                <span class="suggestion-span"></span>
            </span>
        `);
        itemSpan.click(autofillLocationInput);
        locationItemSpanBox.append(itemSpan);
    }

    function toggleLocationItemSpanDisplay(){
        const locationInputValue = $(this).val().toLowerCase();
        const locationInputLength = $(this).val().length;
        const locationSpanItems = $('.location-item-span');
        
        locationSpanItems.each(function (index, item){
            const itemMatchSubstr = $(item).find('input.location-name').val().substring(0,locationInputLength);
            const itemSuggestionSubstr = $(item).find('input.location-name').val().substring(locationInputLength).toLowerCase();
            if (locationInputValue.toLowerCase() === itemMatchSubstr.toLowerCase() && locationInputValue.length > 0){
                $(item).find('span.match-span').text(itemMatchSubstr);
                $(item).find('span.suggestion-span').text(itemSuggestionSubstr);
                $(item).removeClass('hidden');
            } else {
                $(item).addClass('hidden');
            }
        });
    }

    function autofillLocationInput(){
        $('.location-input').val($(this).find('input.location-name').val());
        $('.location-item-span').each(function (index, itemSpan){
            $(itemSpan).addClass('hidden');
        });
    }



});
